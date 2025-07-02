import { useState } from "react";
import FileUpload from "../components/FileUpload";
import ResultsTable from "../components/ResultsTable";
import Spinner from "../components/Spinner";
import { analyzeReportApi, getInsightsApi } from "../services/api.service";

export const DUMMY_PAST_REPORT = [
  { parameter: "Hemoglobin", value: "13.5" },
  { parameter: "Packed Cell Volume (PCV)", value: "45.0" },
  { parameter: "Platelet Count", value: "195000" },

  { parameter: "Glucose", value: "95" },
  { parameter: "Total Cholesterol", value: "195" },
];

const HomePage = () => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [error, setError] = useState(null);

  const hasInsights = results && results.some((r) => r.insight);

  const handleAnalysis = async (file) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await analyzeReportApi(file);
      setResults(response.data);
    } catch (err) {
      setError(err.error || "Failed to analyze the file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetInsights = async () => {
    if (!results) return;

    setIsGeneratingInsights(true);
    setError(null);

    try {
      const response = await getInsightsApi(results);
      setResults(response.data);
    } catch (err) {
      setError(err.error || "Failed to generate AI insights.");
    } finally {
      setIsGeneratingInsights(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (results) {
      return (
        <ResultsTable
          results={results}
          pastReport={DUMMY_PAST_REPORT}
          onGetInsights={handleGetInsights}
          hasInsights={hasInsights}
          isGeneratingInsights={isGeneratingInsights}
        />
      );
    }

    return <FileUpload handleAnalysis={handleAnalysis} isLoading={isLoading} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">{renderContent()}</div>
      </div>
    </div>
  );
};

export default HomePage;
