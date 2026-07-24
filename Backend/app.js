import express from "express";
import cors from "cors";
import morgan from "morgan";
import errorMiddleware from "./middleware/errorMiddleware";

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

app.use(errorMiddleware);

export default app;