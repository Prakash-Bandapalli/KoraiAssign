const express = require("express");
const multer = require("multer");
const reportController = require("./report.controller");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/analyze",
  upload.single("report"),
  reportController.analyzeReport
);

router.post("/insights", reportController.getInsights);

module.exports = router;
