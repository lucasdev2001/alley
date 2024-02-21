import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

export default model("User", UserSchema);
