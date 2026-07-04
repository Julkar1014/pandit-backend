const {
  createPuja,
  getAllPujas,
  getPujaById,
  updatePuja,
  deletePuja,
} = require("../models/puja.model");

// Add Puja
const addPuja = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = "/uploads/" + req.file.filename;
    }

    const result = await createPuja(req.body);

    return res.status(201).json({
      success: true,
      message: "Puja added successfully",
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

// Get All Pujas
const getPujas = async (req, res) => {
  try {
    const pujas = await getAllPujas();

    return res.json({
      success: true,
      data: pujas,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Puja
const getSinglePuja = async (req, res) => {
  try {
    const puja = await getPujaById(req.params.id);

    if (!puja) {
      return res.status(404).json({
        success: false,
        message: "Puja not found",
      });
    }

    return res.json({
      success: true,
      data: puja,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Puja
const editPuja = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = "/uploads/" + req.file.filename;
    }

    await updatePuja(req.params.id, req.body);

    return res.json({
      success: true,
      message: "Puja updated successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Puja
const removePuja = async (req, res) => {
  try {
    await deletePuja(req.params.id);

    return res.json({
      success: true,
      message: "Puja deleted successfully",
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
  addPuja,
  getPujas,
  getSinglePuja,
  editPuja,
  removePuja,
};