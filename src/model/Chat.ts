import mongoose, { Schema, Document } from "mongoose";

interface IChat extends Document {
  fullName: string;
  members: string[];
}

const chatSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const ChatModel =
  mongoose.models.Chat || mongoose.model<IChat>("Chat", chatSchema);

export default ChatModel;
