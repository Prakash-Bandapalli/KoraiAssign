const { extractTextWithOCR } = require("../services/ocr.service");
const parsingService = require("../services/parsing.service");
const agentService = require("../services/agent.service");
const fs = require("fs");
const pdf = require("pdf-parse");

const analyzeReport = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const filePath = req.file.path;
  let extractedText = "";

  try {
    // --- SMART PIPELINE LOGIC ---
    if (req.file.mimetype === "application/pdf") {
      console.log("PDF file detected. Attempting fast text extraction...");
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdf(dataBuffer);

      // If we get meaningful text, use it. This is the "fast path".
      if (pdfData && pdfData.text.trim().length > 0) {
        console.log("Fast text extraction successful!");
        extractedText = pdfData.text;
      } else {
        console.log(
          "Fast text extraction failed (likely a scanned PDF). Falling back to OCR..."
        );
        extractedText = await extractTextWithOCR(filePath);
      }
    } else {
      console.log("Image file detected. Proceeding with OCR...");
      extractedText = await extractTextWithOCR(filePath);
    }

    // comment these out to see the logs

    // console.log("\n========================================");
    // console.log("✅ (1/2) RAW TEXT FOR PARSING:");
    // console.log("========================================");
    // console.log(extractedText);
    // console.log("----------------------------------------\n");

    const structuredData = parsingService.parseText(extractedText);

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

  //   console.log("\n========================================");
  //   console.log("🧠 (3/4) DATA RECEIVED BY AI AGENT:");
  //   console.log("========================================");
  //   console.log(JSON.stringify(results, null, 2));
  //   console.log("----------------------------------------\n");

  try {
    const enhancedData = await agentService.generateInsights(results);

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
