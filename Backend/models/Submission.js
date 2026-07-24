import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
      required: true,
    },

    projectName: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },

    problemStatement: {
      type: String,
      required: [true, "Problem statement is required"],
    },

    solution: {
      type: String,
      required: [true, "Solution is required"],
    },

    description: {
      type: String,
      required: [true, "Project description is required"],
    },

    githubRepo: {
      type: String,
      required: true,
    },

    liveDemo: {
      type: String,
      default: "",
    },

    techStack: [
      {
        type: String,
      },
    ],

    screenshots: [
      {
        type: String,
      },
    ],

    presentationPDF: {
      type: String,
      default: "",
    },

    demoVideo: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Under Review", "Approved", "Rejected"],
      default: "Pending",
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


submissionSchema.index(
  { team: 1, hackathon: 1 },
  { unique: true }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;