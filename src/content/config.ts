import { defineCollection, z } from 'astro:content';
import {beehiveLoader} from "beehiiv-content-loader";


const archiveCollection = defineCollection({
    loader: beehiveLoader({
        apiKey: import.meta.env.BEEHIIV_API_KEY,
        publicationId: import.meta.env.BEEHIIV_PUBLICATION_ID,
        expand: ["free_web_content"],
        status: import.meta.env.PROD ? "confirmed" : "all",

    })
});

export const collections = {
    'archive': archiveCollection
};