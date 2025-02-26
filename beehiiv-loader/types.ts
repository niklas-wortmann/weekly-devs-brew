import {postObjectSchema} from "./schemas/post.js";
import z from "zod";

export type Post = z.infer<typeof postObjectSchema>;

export type PostResponse = {
    data: Array<Post>;
    limit: number;
    page: number;
    totalResults: number;
    totalPages: number;
}