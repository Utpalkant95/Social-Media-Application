import mongoose, { Schema, Document, mongo } from "mongoose";

export interface Comment extends Document {
  senderId: mongoose.Types.ObjectId;
  senderUsername: string;
  senderProfileImage: string;
  comment : string;
}

const commentSchema: Schema<Comment> = new Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderUsername: { type: String, required: true },
  senderProfileImage: { type: String, required: true },
  comment: { type: String, required: true }
}, {
  timestamps : true
});

const CommentModel = mongoose.models.Comment || mongoose.model<Comment>("Comment", commentSchema);

export default CommentModel;