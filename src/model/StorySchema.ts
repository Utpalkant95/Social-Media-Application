import mongoose, { Schema, Document } from "mongoose";

export interface Story extends Document {
  user_Id: mongoose.Schema.Types.ObjectId;  // Correct the ObjectId type
  file: string;
  created_at: Date;
  expired_at: Date;
}

const storySchema: Schema<Story> = new Schema({
  file: {
    type: String,
    required: [true, "File is required"],
  },
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User Id is required"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  expired_at: {
    type: Date,
    default: () => new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  },
});

const StoryModel =
  mongoose.models.Story || mongoose.model<Story>("Story", storySchema);

export default StoryModel;
