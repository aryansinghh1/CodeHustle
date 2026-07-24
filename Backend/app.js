import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import hackathonRoutes from "./routes/hackathonRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Default Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to CodeHustle API 🚀"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/hackathons", hackathonRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/reviews", reviewRoutes);

app.use(errorMiddleware);

export default app;