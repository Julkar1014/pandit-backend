const {
  createReview,
  getAllReviews,
  getApprovedReviews,
  updateReviewStatus,
  deleteReview,
} = require("../models/review.model");

const addReview = async (req, res) => {
  try {
    const result = await createReview(req.body);

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit review",
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await getAllReviews();

    return res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};

const getWebsiteReviews = async (req, res) => {
  try {
    const reviews = await getApprovedReviews();

    return res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};

const changeReviewStatus = async (req, res) => {
  try {
    await updateReviewStatus(req.params.id, req.body.status);

    return res.json({
      success: true,
      message: "Review status updated successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update review status",
    });
  }
};

const removeReview = async (req, res) => {
  try {
    await deleteReview(req.params.id);

    return res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete review",
    });
  }
};

module.exports = {
  addReview,
  getReviews,
  getWebsiteReviews,
  changeReviewStatus,
  removeReview,
};