const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const morgan = require("morgan");

dotenv.config();

const app = express();

// =======================
// ENV CHECK
// =======================
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI missing in .env");
  process.exit(1);
}

// =======================
// DATABASE CONNECTION
// =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

// =======================
// MIDDLEWARE
// =======================
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Logging only in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// =======================
// RATE LIMITERS
// =======================
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many login attempts. Try again later.",
  },
});

const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: "Too many requests. Please slow down.",
  },
});

// =======================
// ROUTES IMPORTS
// =======================
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const aiRoutes = require("./routes/aiRoutes");

// ⚠️ FIX: safe import for payment route
let paymentRoutes;
try {
  paymentRoutes = require("./routes/payment");
  console.log("✅ Payment route loaded");
} catch (err) {
  console.error("❌ Payment route NOT found:", err.message);
}

// =======================
// ROUTES USAGE
// =======================

// Auth
app.use("/api/auth", authRoutes);
app.use("/api/auth/login", loginLimiter);

// Tasks
app.use("/api/tasks", taskRoutes);

// AI
app.use("/api/ai", aiLimiter, aiRoutes);

// Payment (ONLY if exists)
if (paymentRoutes) {
  app.use("/api/payment", paymentRoutes);
}

// =======================
// HEALTH CHECK
// =======================
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// =======================
// 404 HANDLER
// =======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =======================
// GLOBAL ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});