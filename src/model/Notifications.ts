import mongoose, { Schema, Document } from "mongoose";

interface INotification extends Document {
  userId: mongoose.Types.ObjectId; 
  senderId: mongoose.Types.ObjectId;
  message: string;
  type: string; 
  isRead: boolean;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ["follow_request", "follow", "like", "comment"],
    required: true,
  },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const NotificationModel = mongoose.model<INotification>('Notification', NotificationSchema);

export default NotificationModel;