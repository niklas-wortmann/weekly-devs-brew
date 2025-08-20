import { podcastEpisodeSchema } from "./schemas/podcast.js";
import type { z } from "zod";

export type PodcastEpisode = z.infer<typeof podcastEpisodeSchema>;

export interface RSSLoaderOptions {
  /**
   * URL of the RSS feed to fetch
   */
  feedUrl: string;
  
  /**
   * Path to a local RSS file (used for testing or if the feed is already downloaded)
   */
  localFeedPath?: string;
  
  /**
   * Number of episodes to fetch (0 for all)
   */
  limit?: number;
}