import type { Loader } from "astro/loaders";
import { podcastEpisodeSchema } from "./schemas/podcast.js";
import type { PodcastEpisode, RSSLoaderOptions } from "./types.js";
import { XMLParser } from "fast-xml-parser";
import fs from "fs/promises";
import path from "path";

export function rssLoader(options: RSSLoaderOptions): Loader {
  return {
    name: "rss-loader",
    schema: podcastEpisodeSchema,
    async load({ store, logger }) {
      logger.info("Loading podcast episodes from RSS feed");
      
      try {
        const episodes = await fetchEpisodes(options, logger);
        const existingEpisodeIds = new Set<string>(store.keys());
        
        for (const episode of episodes) {
          existingEpisodeIds.delete(episode.id);
          
          // Store the episode in the content collection
          store.set({
            id: episode.id,
            digest: episode.pubDate, // Use pubDate as digest for change detection
            data: episode,
            rendered: episode.content || episode.description,
          });
        }
        
        // Remove episodes that no longer exist in the feed
        for (const deletedEpisodeId of existingEpisodeIds) {
          store.delete(deletedEpisodeId);
        }
        
        logger.info(`Loaded ${episodes.length} podcast episodes`);
      } catch (error) {
        logger.error("Error loading podcast episodes:", error);
      }
    }
  };
}

async function fetchEpisodes(options: RSSLoaderOptions, logger: any): Promise<PodcastEpisode[]> {
  let xmlData: string;
  
  if (options.localFeedPath) {
    // Load from local file
    try {
      xmlData = await fs.readFile(path.resolve(options.localFeedPath), "utf-8");
    } catch (error) {
      logger.error(`Error reading local RSS file: ${options.localFeedPath}`, error);
      throw error;
    }
  } else if (options.feedUrl) {
    // Fetch from URL
    try {
      const response = await fetch(options.feedUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
      }
      xmlData = await response.text();
    } catch (error) {
      logger.error(`Error fetching RSS feed: ${options.feedUrl}`, error);
      throw error;
    }
  } else {
    throw new Error("Either feedUrl or localFeedPath must be provided");
  }
  
  // Parse XML
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "_",
    isArray: (name) => ["item", "psc:chapter"].includes(name),
  });
  
  try {
    const result = parser.parse(xmlData);
    const channel = result.rss.channel;
    const items = channel.item || [];
    
    // Process items
    return items.map((item: any) => {
      // Extract chapters if available
      const chapters = item["psc:chapters"]?.["psc:chapter"]?.map((chapter: any) => ({
        start: chapter._start,
        title: chapter._title,
      })) || [];
      
      // Extract keywords
      const keywords = item["itunes:keywords"] 
        ? item["itunes:keywords"].split(",").map((k: string) => k.trim()).filter(Boolean)
        : [];
      
      // Create episode object
      const episode: PodcastEpisode = {
        id: item.guid?.["#text"] || item.guid || `episode-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        title: item.title || item["itunes:title"] || "",
        description: item.description || "",
        pubDate: item.pubDate || "",
        enclosureUrl: item.enclosure?._url || "",
        enclosureLength: item.enclosure?._length ? parseInt(item.enclosure._length, 10) : undefined,
        enclosureType: item.enclosure?._type || "",
        duration: item["itunes:duration"] ? parseInt(item["itunes:duration"], 10) : undefined,
        image: item["itunes:image"]?._href || "",
        explicit: item["itunes:explicit"] === "true" || item["itunes:explicit"] === "yes",
        episodeType: item["itunes:episodeType"] || "",
        episodeNumber: item["itunes:episode"] ? parseInt(item["itunes:episode"], 10) : undefined,
        season: item["itunes:season"] ? parseInt(item["itunes:season"], 10) : undefined,
        keywords,
        author: item["itunes:author"] || "",
        chapters: chapters.length > 0 ? chapters : undefined,
        content: item["content:encoded"] || "",
        link: item.link || "",
        guid: item.guid?.["#text"] || item.guid || "",
      };
      
      return episode;
    });
  } catch (error) {
    logger.error("Error parsing RSS feed:", error);
    throw error;
  }
}