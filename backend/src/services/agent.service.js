require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const parseValue = (valueStr) => {
  if (!valueStr) return null;
  return parseFloat(valueStr.replace(/[HL]$/i, ""));
};

const parseRange = (rangeStr) => {
  if (!rangeStr) return { min: null, max: null };

  if (rangeStr.startsWith("<"))
    return { min: null, max: parseFloat(rangeStr.substring(1)) };
  if (rangeStr.startsWith(">"))
    return { min: parseFloat(rangeStr.substring(1)), max: null };
  const parts = rangeStr.split("-").map((s) => parseFloat(s.trim()));
  return { min: parts[0], max: parts[1] };
};

const generateInsights = async (results) => {
  const resultsWithProvisionalStatus = results.map((result) => {
    if (result.range) {
      const numericValue = parseValue(result.value);
      const { min, max } = parseRange(result.range);
      let status = "NORMAL";
      if (numericValue !== null) {
        if (max !== null && numericValue > max) status = "HIGH";
        if (min !== null && numericValue < min) status = "LOW";
      }
      return { ...result, status };
    }
    return { ...result, status: "UNKNOWN" };
  });

  const prompt = `
    You are an AI medical assistant. Your task is to analyze a list of lab results.
    For each item in the input JSON, you must return an object with "parameter", "status", and "insight".

    Instructions:
    1. If the input item's "status" is 'HIGH', 'LOW', or 'NORMAL', YOU MUST USE THAT STATUS. Then provide a relevant insight.
    2. If the input item's "status" is 'UNKNOWN', you must use your medical knowledge to determine if the value is 'HIGH', 'LOW', or 'NORMAL', and set the status accordingly. Then provide a relevant insight.
    3. For 'HIGH' or 'LOW' insights, explain the test and potential implications, ending with "Please discuss with your doctor."
    4. For 'NORMAL' insights, give a simple one-sentence definition of the test.

    The input lab results are:
    ${JSON.stringify(resultsWithProvisionalStatus, null, 2)}

    IMPORTANT: You MUST return a single, valid JSON array as your response. Your response must start with '[' and end with ']'. Do not include any other text, explanations, or markdown formatting like \`\`\`json.
  `;

  try {
    const aiResponse = await model.generateContent(prompt);
    const responseText = await aiResponse.response.text();

    const jsonStart = responseText.indexOf("[");
    const jsonEnd = responseText.lastIndexOf("]");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("AI did not return a valid JSON array.");
    }

    const jsonString = responseText.substring(jsonStart, jsonEnd + 1);

    const aiAnalysis = JSON.parse(jsonString);

    const analysisMap = new Map(
      aiAnalysis.map((item) => [
        item.parameter,
        { status: item.status, insight: item.insight },
      ])
    );

    const finalResults = results.map((result) => {
      const analysis = analysisMap.get(result.parameter);
      return {
        ...result,
        status: analysis ? analysis.status : "N/A",
        insight: analysis
          ? analysis.insight
          : "AI analysis failed for this parameter.",
      };
    });

    return finalResults;
  } catch (error) {
    console.error("Error in batch AI processing:", error);
    return results.map((r) => ({
      ...r,
      status: "Error",
      insight: "AI analysis failed.",
    }));
  }
};

module.exports = {
  generateInsights,
};
