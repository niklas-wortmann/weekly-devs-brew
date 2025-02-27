import type {RehypePlugins} from "astro";
import type {Loader} from "astro/loaders";
import {postObjectSchema} from "./schemas/post.js";
import {
    BeehivePostRenderer,
    buildProcessor,
    type RehypePlugin,
} from "./render.js";
import type {Post} from "./types.js";
import {BeehiivClient} from "@beehiiv/sdk";

type ExpandQueryOptions = "stats" | "free_web_content" | "free_email_content" | "free_rss_content" | "premium_web_content" | "premium_email_content"

type AudienceQueryOptions = "free" | "premium" | "all"

type PlatformQueryOptions = "web" | "email" | "both" | "all"

type StatusQueryOptions = "draft" | "confirmed" | "archived" | "all"

export interface BeehiveLoaderOptions {
    publicationId: string;
    expand?: ExpandQueryOptions[]
    audience?: AudienceQueryOptions
    platform?: PlatformQueryOptions
    status?: StatusQueryOptions
    content_tags?: string[]
    /**
     * Pass rehype plugins to customize how the Notion output HTML is processed.
     * You can import and apply the plugin function (recommended), or pass the plugin name as a string.
     */
    rehypePlugins?: RehypePlugins
    apiKey: string;
}

export function beehiveLoader({
                                 rehypePlugins = [],
                                ...apiArguments
                             }: BeehiveLoaderOptions): Loader {

    const resolvedRehypePlugins = Promise.all(
        rehypePlugins.map(async (config) => {
            let plugin: RehypePlugin | string;
            let options: any;
            if (Array.isArray(config)) {
                [plugin, options] = config;
            } else {
                plugin = config;
            }

            if (typeof plugin === "string") {
                plugin = (await import(/* @vite-ignore */ plugin))
                    .default as RehypePlugin;
            }
            return [plugin, options] as const;
        }),
    );
    const processor = buildProcessor(resolvedRehypePlugins);

    return {
        name: "beehive-loader",
        schema: postObjectSchema,
        async load({store, logger, parseData}) {
            const existingPageIds = new Set<string>(store.keys());

            logger.info("Loading beehive posts");
            const renderPromises: Promise<void>[] = [];
            const posts = await fetchAllPosts(apiArguments) as any[];
            for await (const post of posts) {
                existingPageIds.delete(post.id);
                const existingPage = store.get(post.id);
                if (existingPage?.digest !== (post.publishDate ?? post.created)) {
                    const renderer = new BeehivePostRenderer(post, logger);
                    const data = await parseData(await renderer.getPageData());
                    const renderPromise = renderer.render(processor).then((rendered) => {
                        store.set({
                            id: post.id,
                            digest: post.publishDate ?? post.created,
                            data,
                            rendered,
                        });
                    });
                    renderPromises.push(renderPromise);
                }
            }
            for (const deletedPageId of existingPageIds) {
                store.delete(deletedPageId);
            }
            
            await Promise.all(renderPromises);
        }
    }
}



const fetchPostPerPAge = async function(options: Exclude<BeehiveLoaderOptions, "rehypePlugins">, page = 1 ) {

    const client = new BeehiivClient({ token: options.apiKey });
    return await client.posts.index(options.publicationId, {page: page, ...options});

}

const fetchAllPosts = async function(options: Exclude<BeehiveLoaderOptions, "rehypePlugins">, page = 1): Promise<Array<Post>> {
    let posts: Array<Post> = []
    const results = await fetchPostPerPAge(options, page);
    posts = posts.concat(...results.data)
    if (page < results.totalPages) {
        return posts.concat(await fetchAllPosts(options, page + 1));
    } else {
        return posts;
    }
};
