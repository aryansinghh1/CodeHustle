import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Hackathon title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    theme: {
      type: String,
      required: [true, "Theme is required"],
    },

    mode: {
      type: String,
      enum: ["Online", "Offline"],
      required: true,
    },

    venue: {
      type: String,
      default: "",
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    registrationDeadline: {
      type: Date,
      required: true,
    },

    bannerImage: {
      type: String,
      default: "",
    },

    prizePool: {
      type: String,
      required: true,
    },

    maxTeamSize: {
      type: Number,
      required: true,
      min: 1,
    },

    rules: [
      {
        type: String,
      },
    ],

    judgingCriteria: [
      {
        type: String,
      },
    ],

    registrationOpen: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Upcoming",
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    judges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    winners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Hackathon = mongoose.model("Hackathon", hackathonSchema);

export default Hackathon;