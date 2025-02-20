import { defineCollection, z } from 'astro:content';
import {file} from "astro/loaders";
import {beehiveLoader} from "../beehive-loader/loader.ts";

const archiveCollection = defineCollection({
  loader: beehiveLoader({
    apiKey: "kTbgqjHtmloevi5P2iix6xco5IffQhPHFnRAPTkXZtjb9LxMDLFe4cjpCFHwB8LD",
    publicationId: "pub_d67d0afd-7787-4a45-a9ba-133093c863b3",
    status:"draft"
  })
});

export const collections = {
  'archive': archiveCollection
};