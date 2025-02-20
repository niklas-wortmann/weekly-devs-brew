import {type AstroIntegrationLogger, type MarkdownHeading} from "astro";

import rehypeParse from "rehype-parse";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { unified, type Plugin } from "unified";
import type {Post} from "./types.js";
import {postObjectSchema} from "./schemas/post.js";
import {z} from "astro/zod";
import type {ParseDataOptions} from "astro/loaders";

const baseProcessor = unified()
    .use(rehypeParse, {})
    .use(rehypeSlug)
    .use(rehypeStringify); // Turn AST to HTML string

export type RehypePlugin = Plugin<any[], any>;

export function buildProcessor(
    rehypePlugins: Promise<ReadonlyArray<readonly [RehypePlugin, any]>>,
) {
    let headings: MarkdownHeading[] = [];


    const processorPromise = rehypePlugins.then((plugins) => {
        let processor = baseProcessor;
        for (const [plugin, options] of plugins) {
            processor = processor.use(plugin, options);
        }
        return processor;
    });

    return async function process(blocks: string) {
        const processor = await processorPromise;
        const vFile = await processor.process({ data: blocks } as Record<
            string,
            unknown
        >);
        return { vFile, headings };
    };
}

export class BeehivePostRenderer {
    constructor(private post: Post, private logger: AstroIntegrationLogger){}

    public getPageData(): ParseDataOptions<z.infer<typeof postObjectSchema>> {
        const {post} = this
        return {id: this.post.id, data: {...post}}
    }

    /**
     * Return rendered HTML for the page.
     * @param process Processor function to transform Notion blocks into HTML.
     * This is created once for all pages then shared.
     */
    async render(
        process: ReturnType<typeof buildProcessor>,
    ): Promise<{ html: string, metadata: {headings: MarkdownHeading[]} } | undefined> {
        this.logger.debug("Rendering");
        try {
            if(!this.post.content?.free.web){
                return undefined;
            }

            const { vFile, headings } = await process(this.post.content.free.web);
            this.logger.debug("Rendered");
            return {
                html: vFile.toString(),
                metadata: {
                    headings,
                },
            };
        } catch (error) {
            this.logger.error(`Failed to render: ${getErrorMessage(error)}`);
            return undefined;
        }
    }
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    } else if (typeof error === "string") {
        return error;
    } else {
        return "Unknown error";
    }
}