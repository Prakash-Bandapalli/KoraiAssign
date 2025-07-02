const Tesseract = require("tesseract.js");

const extractTextWithOCR = async (fileSource) => {
  try {
    console.log(`Starting OCR process...`);
    const {
      data: { text },
    } = await Tesseract.recognize(fileSource, "eng", {
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
  extractTextWithOCR,
};
