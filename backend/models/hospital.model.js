import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({

  hospital_name: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  contact_number: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  latitude: {
    type: Number,
    required: true
  },

  longitude: {
    type: Number,
    required: true
  }

}, { timestamps: true });

export default mongoose.model("Hospital", hospitalSchema);