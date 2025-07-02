const Tesseract = require("tesseract.js");

const extractTextFromFile = async (filePath) => {
  try {
    console.log(`Starting OCR process for file: ${filePath}`);
    const {
      data: { text },
    } = await Tesseract.recognize(filePath, "eng", {
      logger: (m) => {
        if (m.status === "recognizing text") {
          console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
        }
      },
    });
    console.log("OCR process completed successfully.");
    return text;
  } catch (error) {
    console.error("Error during OCR processing:", error);
    throw new Error("Failed to extract text using Tesseract.");
  }
};

module.exports = {
  extractTextFromFile,
};
