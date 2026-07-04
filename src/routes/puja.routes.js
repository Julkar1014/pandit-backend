const express = require("express");
const router = express.Router();

const {
  addPuja,
  getPujas,
  getSinglePuja,
  editPuja,
  removePuja,
} = require("../controllers/puja.controller");

const upload = require("../middleware/upload");

router.post("/", upload.single("image"), addPuja);

router.get("/", getPujas);

router.get("/:id", getSinglePuja);

router.put("/:id", upload.single("image"), editPuja);

router.delete("/:id", removePuja);

module.exports = router;