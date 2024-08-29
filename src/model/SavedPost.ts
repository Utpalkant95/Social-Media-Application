import mongoose, { Schema, Document } from "mongoose";

export interface SavedPost extends Document {
  postId: string;
  file: string;
  likeCount: number;
}

const postSchema: Schema<SavedPost> = new Schema({
  postId: String,
  file: String,
  likeCount: Number,
});

const SavedPostModel =
  mongoose.models.SavedPost || mongoose.model<SavedPost>("SavedPost", postSchema);

export default SavedPostModel;
