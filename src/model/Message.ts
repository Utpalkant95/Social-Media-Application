import mongoose, { Schema, Document } from "mongoose";

interface IMessage extends Document {
  message: string;
}

const messageSchema: Schema = new Schema({
  message: { type: String, required: true },
});

const MessageModel =
  mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export default MessageModel;