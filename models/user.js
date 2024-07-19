import mongoose, { SchemaType } from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: { type: String, required: true, minLength: 1, maxLength: 100 },
  lastName: { type: String, required: true, minLength: 1, maxLength: 100 },
  username: { type: String, required: true, minLength: 1, maxLength: 100, unique: true },
  password: { type: String, required: true, minLength: 1, maxLength: 100 },
  isMember: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  messages: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

export default mongoose.model("User", UserSchema);
