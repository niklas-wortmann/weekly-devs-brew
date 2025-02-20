import { defineCollection, z } from 'astro:content';

const testimonialCollection = defineCollection({
  type: 'data',
  schema: z.object({
    content: z.string(),
    author: z.string(),
    role: z.string(),
    platform: z.string()
  })
});

const archiveCollection = defineCollection({
  type: 'data',
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