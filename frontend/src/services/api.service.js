import axios from "axios";

const API_URL =
  import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5001/api";

export const analyzeReportApi = async (file) => {
  const formData = new FormData();
  formData.append("report", file);
  try {
    const response = await axios.post(`${API_URL}/analyze`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading and analyzing report:", error);
    throw error.response?.data || new Error("An unknown error occurred.");
  }
};

export const getInsightsApi = async (results) => {
  try {
    const response = await axios.post(`${API_URL}/insights`, { results });
    return response.data;
  } catch (error) {
    console.error("Error getting AI insights:", error);
    throw error.response?.data || new Error("An unknown error occurred.");
  }
};
