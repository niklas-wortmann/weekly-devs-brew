import { z } from "astro/zod";


const contentObjectSchema = z.object({
    web: z.string().optional(),
    email: z.string().optional(),
});

export const postObjectSchema = z.object({
    id: z.string(),
    subtitle: z.string(),
    title: z.string(),
    authors: z.array(z.string()),
    created: z.number(),
    status: z.enum(["draft", "confirmed", "archived"]),
    splitTested: z.boolean(),
    subjectLine: z.string(),
    previewText: z.string(),
    slug: z.string(),
    thumbnailUrl: z.string(),
    webUrl: z.string(),
    audience: z.enum(["free", "premium", "both"]),
    platform: z.enum(["web", "email", "both"]),
    contentTags: z.array(z.string()),
    hiddenFromFeed: z.boolean(),
    publishDate: z.number().optional(),
    displayedDate: z.number().optional(),
    metaDefaultDescription: z.string().optional(),
    metaDefaultTitle: z.string().optional(),
    content: z.object({
        free:  contentObjectSchema.extend({rss: z.string().optional()}),
        premium: contentObjectSchema.optional()
    }).optional(),
    stats: z.object({
        email: z.object({
            recipients: z.number().optional(),
            delivered: z.number().optional(),
            opens: z.number().optional(),
            uniqueOpens: z.number().optional(),
            clicks: z.number().optional(),
            uniqueClicks: z.number().optional(),
            unsubscribes: z.number().optional(),
            spamReports: z.number().optional(),
        }).optional(),
        web: z.object({
            views: z.number().optional(),
            clicks: z.number().optional(),
        }).optional(),
        clicks: z.array(z.object({
            totalClicks: z.number().optional(),
            totalUniqueClicks: z.number().optional(),
            totalClickThroughRate: z.number().optional(),
        })).optional()

    }).optional(),
});