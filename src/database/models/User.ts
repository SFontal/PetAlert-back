import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: false,
  },
});

const User = model("User", userSchema, "users");

export default User;
