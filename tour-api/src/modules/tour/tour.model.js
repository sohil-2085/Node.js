import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    maxGroupSize: {
      type: Number,
      required: true,
    },

    difficulty: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;