import { defineCollection, z } from 'astro:content';
import {file} from "astro/loaders";

const archiveCollection = defineCollection({
  schema: z.object({
    id: z.number(),
    title: z.string(),
    date: z.string(),
    description: z.string(),
    readTime: z.string()
  })
});

export const collections = {
  'archive': archiveCollection
};