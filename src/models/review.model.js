const pool = require("../config/db");

const createReview = async (data) => {
  const { name, city, rating, review } = data;

  const [result] = await pool.query(
    `INSERT INTO reviews
    (name, city, rating, review)
    VALUES (?,?,?,?)`,
    [name, city, rating, review]
  );

  return result;
};

const getAllReviews = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM reviews ORDER BY created_at DESC"
  );

  return rows;
};

const getApprovedReviews = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM reviews WHERE status='Approved' ORDER BY created_at DESC"
  );

  return rows;
};

const updateReviewStatus = async (id, status) => {
  const [result] = await pool.query(
    "UPDATE reviews SET status=? WHERE id=?",
    [status, id]
  );

  return result;
};

const deleteReview = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM reviews WHERE id=?",
    [id]
  );

  return result;
};

module.exports = {
  createReview,
  getAllReviews,
  getApprovedReviews,
  updateReviewStatus,
  deleteReview,
};