import { defineCollection, z } from 'astro:content';
import {beehiveLoader} from "beehiiv-content-loader";
import rehypeRemoveStyleAttribute from "../rehype-remove-inline-style.ts";


const archiveCollection = defineCollection({
    loader: beehiveLoader({
        apiKey: import.meta.env.BEEHIIV_API_KEY,
        publicationId: import.meta.env.BEEHIIV_PUBLICATION_ID,
        expand: ["free_web_content"],
        status: import.meta.env.PROD ? "confirmed" : "all",
        rehypePlugins: [rehypeRemoveStyleAttribute]

    })
});

export const collections = {
    'archive': archiveCollection
};