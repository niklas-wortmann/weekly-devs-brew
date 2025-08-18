import { defineCollection, z } from 'astro:content';
import {beehiveLoader} from "beehiiv-content-loader";
import rehypeRemoveStyleAttribute from "../rehype-remove-inline-style.ts";

const archiveCollection = defineCollection({
    loader: beehiveLoader({
        apiKey: import.meta.env.BEEHIIV_API_KEY,
        publicationId: import.meta.env.BEEHIIV_PUBLICATION_ID,
        expand: ["free_web_content"],
        status: import.meta.env.BEEHIIV_PUBLICATION_STATUS ?? "confirmed",
        rehypePlugins: [rehypeRemoveStyleAttribute]

    })
});

const testimonialsCollection = defineCollection({
    type: 'data',
    schema: z.object({
        id: z.number(),
        content: z.string(),
        author: z.string(),
        role: z.string(),
        platform: z.string()
    })
});

export const collections = {
    'archive': archiveCollection,
    'testimonials': testimonialsCollection
};