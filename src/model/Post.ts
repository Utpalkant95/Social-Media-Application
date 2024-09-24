import mongoose, { Schema, Document } from "mongoose";

export interface Post extends Document {
  ownerId: mongoose.Types.ObjectId;
  createdAt: Date;
  file: string;
  likeCount: mongoose.Types.ObjectId[];
  description: string;
  location: string;
  altText: string;
  hideLikeViewCount: boolean;
  hideComment: boolean;
  commentCount: number;
  shareCount: number;
}

const postSchema: Schema<Post> = new Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  file: { type: String, required: true },
  description: { type: String, default: '' },
  location: { type: String, default: '' },
  altText: { type: String, default: '' },
  hideLikeViewCount: { type: Boolean, default: false },
  hideComment: { type: Boolean, default: false },
  likeCount: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of ObjectIds
  commentCount: { type: Number, default: 0 },
  shareCount: { type: Number, default: 0 },
});

const PostModel = mongoose.models.Post || mongoose.model<Post>("Post", postSchema);

export default PostModel;