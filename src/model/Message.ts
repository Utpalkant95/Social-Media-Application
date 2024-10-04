import mongoose, { Schema, Document } from "mongoose";

interface IMessage extends Document {
  sender: string;
  chat : string;
  content : string;
}

const messageSchema: Schema = new Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  chat : { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
  content : {type : String},
  attachments : [{type : String}]
}, {
  timestamps : true
});

const MessageModel =
  mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export default MessageModel;
