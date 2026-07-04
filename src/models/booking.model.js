const pool = require("../config/db");

const createBooking = async (data) => {
  const {
    puja_name,
    customer_name,
    phone,
    email,
    booking_date,
    booking_time,
    city,
    address,
    landmark,
    state,
    pincode,
    requirements,
    status,
  } = data;

  const [result] = await pool.query(
    `INSERT INTO bookings
    (
      puja_name,
      customer_name,
      phone,
      email,
      booking_date,
      booking_time,
      city,
      address,
      landmark,
      state,
      pincode,
      requirements,
      status
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      puja_name,
      customer_name,
      phone,
      email,
      booking_date,
      booking_time,
      city,
      address,
      landmark,
      state,
      pincode,
      requirements,
      status,
    ]
  );

  return result;
};

const getAllBookings = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM bookings ORDER BY created_at DESC"
  );

  return rows;
};

const getBookingById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM bookings WHERE id=?",
    [id]
  );

  if (!rows.length) return null;

  return rows[0];
};

const updateBooking = async (id, data) => {
  const [result] = await pool.query(
    "UPDATE bookings SET status=? WHERE id=?",
    [data.status, id]
  );

  return result;
};

const deleteBooking = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM bookings WHERE id=?",
    [id]
  );

  return result;
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};