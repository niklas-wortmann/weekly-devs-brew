import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';


export async function GET(context) {
    const posts = await getCollection('archive');

    return rss({
        // `<title>` field in output xml
        title: "The Weekly Dev's Brew",
        // `<description>` field in output xml
        description: 'Your morning companion for web dev insights',
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#site
        site: context.site,
        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: new Date(post.data.publishDate ?? post.data.created),
            description: post.data.previewText,
            // Compute RSS link from post `id`
            // This example assumes all posts are rendered as `/blog/[id]` routes
            link: `/archive/${post.data.slug}/`,
        })),        // (optional) inject custom xml
        customData: `<language>en-us</language>`,
    });
}