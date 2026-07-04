console.log("✅ server.js started");

require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Database Connected");
  } catch (err) {
    console.error("❌ Database Error:");
    console.error(err);
  }

  console.log("✅ About to start Express");

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
})();