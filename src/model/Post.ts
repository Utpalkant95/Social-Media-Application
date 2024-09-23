import mongoose, { Schema, Document } from "mongoose";

export interface Post extends Document {
  file: string;
  description: string;
  location: string;
  altText: string;
  hideLikeViewCount: boolean;
  hideComment: boolean;
  likeCount: number;
  commentCount: number;  // Corrected typo
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
  commentCount: Number,
  shareCount: Number,
});

const PostModel =
  mongoose.models.Post || mongoose.model<Post>("Post", postSchema);

export default PostModel;
