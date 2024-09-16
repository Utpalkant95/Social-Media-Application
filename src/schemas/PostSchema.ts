import {z} from "zod";

export const postSchema = z.object({
    file : z.any().refine((file) => file instanceof File, "File is required"),
    description : z.string().optional(),
    location : z.string().optional(),
    altText : z.string().optional(),
    hideLikeViewCount : z.boolean(),
    hideComment : z.boolean(),
    likeCount : z.number(),
    commentCount : z.number(),
    shareCount : z.number(),
})