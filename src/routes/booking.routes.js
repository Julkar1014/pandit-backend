const express = require("express");

const {
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus,
  deleteBooking,
} = require("../controllers/booking.controller");

const router = express.Router();

// Website
router.post("/", createBooking);

// Admin
router.get("/", getBookings);
router.get("/:id", getBooking);
router.put("/:id", updateBookingStatus);
router.delete("/:id", deleteBooking);

module.exports = router;