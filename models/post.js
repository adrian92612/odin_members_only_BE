import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true, minLength: 1 },
  content: { type: String, required: true, minLength: 1 },
  dateAdded: { type: Date, default: Date.now },
});

export default mongoose.model("Post", PostSchema);
