const express = require("express");
const { protect } = require("../middleware/AuthMiddleware");
const { getDashboardData } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", protect, getDashboardData);

module.exports = router;