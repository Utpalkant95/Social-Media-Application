import {z} from "zod";

export const postSchema = z.object({
    file : z.string(),
    description : z.string().optional(),
    location : z.string().optional(),
    altText : z.string().optional(),
    hideLikeViewCount : z.boolean(),
    hideComment : z.boolean()
})