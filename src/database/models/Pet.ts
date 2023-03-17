import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  born: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    required: true,
  },
  specie: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: false,
  },
  colour: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Pet = mongoose.model("Pet", petSchema);

export default Pet;
