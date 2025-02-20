import { defineCollection, z } from 'astro:content';
import {file} from "astro/loaders";

const testimonialCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.number(),
    content: z.string(),
    author: z.string(),
    role: z.string(),
    platform: z.string()
  })
});

const archiveCollection = defineCollection({
  loader: file("src/content/archive/episodes.json"),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    date: z.string(),
    description: z.string(),
    readTime: z.string()
  })
});

export const collections = {
  'testimonials': testimonialCollection,
  'archive': archiveCollection
};
