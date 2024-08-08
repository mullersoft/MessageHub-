import { Schema, model, Document } from "mongoose";
// Define the interface for the Message document
interface IMessage extends Document {
  text: string;
  category: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  // MER N stack
  likes: number;
  createdAt?: Date;
  updatedAt?: Date;
}
// Create the schema for the Message model
const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Message text is required"],
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);
// Create the Message model
const Message = model<IMessage>("Message", messageSchema);
export default Message;
