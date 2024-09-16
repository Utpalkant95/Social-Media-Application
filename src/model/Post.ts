import mongoose, { Schema, Document } from "mongoose";
import { string } from "zod";

export interface Post extends Document {
  file: string;
  description: string;
  location: string;
  altText: string;
  hideLikeViewCount: boolean;
  hideComment: boolean;
  likeCount: number;
  commnetCount: number;
  shareCount: number;
}

const postSchema: Schema<Post> = new Schema({
  file: String,
  description: String,
  location: String,
  altText: String,
  hideLikeViewCount: Boolean,
  hideComment: Boolean,
  likeCount: Number,
  commnetCount: Number,
  shareCount: Number,
});

const PostModel =
  mongoose.models.Post || mongoose.model<Post>("Post", postSchema);

export default PostModel;
