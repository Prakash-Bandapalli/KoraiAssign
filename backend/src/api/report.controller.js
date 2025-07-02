const ocrService = require("../services/ocr.service");
const parsingService = require("../services/parsing.service");
const agentService = require("../services/agent.service");
const fs = require("fs");

const analyzeReport = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const filePath = req.file.path;

  try {
    const extractedText = await ocrService.extractTextFromFile(filePath);

    // comment out these for logging results in console

    // // --- LOGGING POINT 1: Raw OCR Output ---
    // console.log("\n========================================");
    // console.log("✅ (1/2) RAW TEXT FROM OCR SERVICE:");
    // console.log("========================================");
    // console.log(extractedText);
    // console.log("----------------------------------------\n");

    const structuredData = parsingService.parseText(extractedText);

    // // --- LOGGING POINT 2: Parsed, Structured Data ---
    // console.log("\n========================================");
    // console.log("✅ (2/2) STRUCTURED DATA FROM PARSING SERVICE:");
    // console.log("========================================");
    // console.log(JSON.stringify(structuredData, null, 2));
    // console.log("----------------------------------------\n");

    res.status(200).json({
      message: "Report analyzed successfully.",
      data: structuredData,
    });
  } catch (error) {
    console.error("Failed during /analyze endpoint:", error);
    res.status(500).json({ error: "Failed to analyze the report." });
  } finally {
    fs.unlinkSync(filePath);
  }
};

const getInsights = async (req, res) => {
  const { results } = req.body;
  if (!results || !Array.isArray(results)) {
    return res.status(400).json({ error: "Invalid results data provided." });
  }

  //   // --- LOGGING POINT 3: Data Received by Insights Endpoint ---
  //   console.log("\n========================================");
  //   console.log("🧠 (3/4) DATA RECEIVED BY AI AGENT:");
  //   console.log("========================================");
  //   console.log(JSON.stringify(results, null, 2));
  //   console.log("----------------------------------------\n");

  try {
    const enhancedData = await agentService.generateInsights(results);

    // // --- LOGGING POINT 4: Final Enhanced Data from AI Agent ---
    // console.log("\n========================================");
    // console.log("✨ (4/4) FINAL ENHANCED DATA FROM AI AGENT:");
    // console.log("========================================");
    // console.log(JSON.stringify(enhancedData, null, 2));
    // console.log("----------------------------------------\n");

    res.status(200).json({
      message: "Insights generated successfully.",
      data: enhancedData,
    });
  } catch (error) {
    console.error("Failed during /insights endpoint:", error);
    res.status(500).json({ error: "Failed to generate insights." });
  }
};

module.exports = {
  analyzeReport,
  getInsights,
};
