import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "../src/routes/auth.route.js";
import messageRoutes from "../src/routes/message.route.js";
import groupRoutes from "../src/routes/group.route.js";

const app = express();

// CORS configuration for production
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://your-frontend-domain.vercel.app", // Replace with your actual frontend domain
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/groups", groupRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Root endpoint
app.get("/", (req, res) => {
    res.json({ message: "QuirkQuack API is running!" });
});

export default app; 