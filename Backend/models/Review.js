import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    judge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    submission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
      required: true,
    },

    innovation: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    technicalComplexity: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    userInterface: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    functionality: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    scalability: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    documentation: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    presentation: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    feedback: {
      type: String,
      default: "",
      trim: true,
    },

    totalScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


reviewSchema.pre("save", function () {
  this.totalScore =
    (this.innovation || 0) +
    (this.technicalComplexity || 0) +
    (this.userInterface || 0) +
    (this.functionality || 0) +
    (this.scalability || 0) +
    (this.documentation || 0) +
    (this.presentation || 0);
});


reviewSchema.index(
  { judge: 1, submission: 1 },
  { unique: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;