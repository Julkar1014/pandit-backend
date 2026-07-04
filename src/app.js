const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const pujaRoutes = require("./routes/puja.routes");
const bookingRoutes = require("./routes/booking.routes");
const reviewRoutes = require("./routes/review.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Upload Folder
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pujas", pujaRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Pandit Booking Backend Running 🚀",
  });
});

module.exports = app;