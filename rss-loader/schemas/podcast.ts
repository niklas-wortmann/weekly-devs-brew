import { z } from "astro/zod";

export const podcastEpisodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  pubDate: z.string(),
  enclosureUrl: z.string(),
  enclosureLength: z.number().optional(),
  enclosureType: z.string().optional(),
  duration: z.number().optional(),
  image: z.string().optional(),
  explicit: z.boolean().optional(),
  episodeType: z.string().optional(),
  episodeNumber: z.number().optional(),
  season: z.number().optional(),
  keywords: z.array(z.string()).optional(),
  author: z.string().optional(),
  chapters: z.array(
    z.object({
      start: z.string(),
      title: z.string(),
    })
  ).optional(),
  content: z.string().optional(),
  link: z.string().optional(),
  guid: z.string().optional(),
});

export type PodcastEpisode = z.infer<typeof podcastEpisodeSchema>;