const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../models/booking.model");

const createBookingController = async (req, res) => {
  try {
    const data = {
      ...req.body,
      status: "Pending",
    };

    const result = await createBooking(data);

    return res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await getAllBookings();

    return res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBooking = async (req, res) => {
  try {
    const booking = await getBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    await updateBooking(req.params.id, {
      status: req.body.status,
    });

    return res.json({
      success: true,
      message: "Booking Updated Successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBookingController = async (req, res) => {
  try {
    await deleteBooking(req.params.id);

    return res.json({
      success: true,
      message: "Booking Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking: createBookingController,
  getBookings,
  getBooking,
  updateBookingStatus,
  deleteBooking: deleteBookingController,
};