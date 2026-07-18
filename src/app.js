console.log("✅ app.js loaded");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const pool = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const pujaRoutes = require("./routes/puja.routes");
const bookingRoutes = require("./routes/booking.routes");
const reviewRoutes = require("./routes/review.routes");

const app = express();

// Middlewares
const allowedOrigins = [
  "https://panditjiigreaternoida.com",
  "https://www.panditjiigreaternoida.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Postman ya direct server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
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
// Serve React Frontend
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pujas", pujaRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.get("/sitemap.xml", async (req, res) => {
  try {
   const [rows] = await pool.query(
  "SELECT slug FROM pujas"
);

    const baseUrl = "https://panditjiigreaternoida.com";

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<url>
<loc>${baseUrl}/</loc>
<priority>1.0</priority>
</url>

<url>
<loc>${baseUrl}/services</loc>
<priority>0.9</priority>
</url>

<url>
<loc>${baseUrl}/about</loc>
<priority>0.8</priority>
</url>

<url>
<loc>${baseUrl}/reviews</loc>
<priority>0.8</priority>
</url>

<url>
<loc>${baseUrl}/contact</loc>
<priority>0.8</priority>
</url>`;

    rows.forEach((item) => {
      xml += `
<url>
<loc>${baseUrl}/services/${item.slug}</loc>
</url>`;
    });

    xml += `
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);

  } catch (err) {
    console.error(err);
    res.status(500).send("Sitemap Error");
  }
});
// React Routes
// React Routes (must be after all API routes)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

module.exports = app;