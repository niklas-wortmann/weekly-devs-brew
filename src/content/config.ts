import { defineCollection, z } from 'astro:content';
import {beehiveLoader} from "beehiiv-content-loader";
import {rssLoader} from "../../rss-loader";
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

const podcastCollection = defineCollection({
    loader: rssLoader({
        feedUrl: "https://feeds.buzzsprout.com/2470901.rss",
        localFeedPath: "example.rss" // For development/testing
    })
});

export const collections = {
    'archive': archiveCollection,
    'podcast': podcastCollection,
};