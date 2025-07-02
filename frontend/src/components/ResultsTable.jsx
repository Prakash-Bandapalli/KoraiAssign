import React, { useState } from "react";

const StatusBadge = ({ status }) => {
  if (!status) return null;

  const baseClasses = "px-3 py-1 text-xs font-bold rounded-full border";
  let statusClasses = "";

  switch (status.toUpperCase()) {
    case "HIGH":
      statusClasses = "bg-red-50 text-red-700 border-red-200";
      break;
    case "LOW":
      statusClasses = "bg-blue-50 text-blue-700 border-blue-200";
      break;
    case "NORMAL":
      statusClasses = "bg-green-50 text-green-700 border-green-200";
      break;
    default:
      return null;
  }

  return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>;
};

const TrendIndicator = ({ currentValue, pastValue }) => {
  if (pastValue === null || pastValue === undefined) {
    return <span className="text-gray-400 text-lg">—</span>;
  }

  const current = Number.parseFloat(currentValue);
  const past = Number.parseFloat(pastValue);

  if (isNaN(current) || isNaN(past)) {
    return <span className="text-gray-400 text-lg">—</span>;
  }

  if (current > past) {
    return (
      <div className="flex items-center justify-center">
        <span className="text-green-600 font-bold text-xl">↗</span>
      </div>
    );
  }

  if (current < past) {
    return (
      <div className="flex items-center justify-center">
        <span className="text-blue-600 font-bold text-xl">↘</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <span className="text-gray-500 font-bold text-lg">=</span>
    </div>
  );
};

const ResultsTable = ({
  results,
  pastReport,
  onGetInsights,
  hasInsights,
  isGeneratingInsights,
}) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleToggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  if (!Array.isArray(results) || results.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 text-center bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="text-6xl mb-4">📋</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Data Found</h2>
        <p className="text-gray-500">
          Could not extract any health parameters from the uploaded file.
        </p>
      </div>
    );
  }

  const pastReportMap = new Map(
    pastReport.map((item) => [item.parameter.toLowerCase(), item.value])
  );

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Health Parameters Analysis
          </h2>
          <p className="text-gray-600">
            AI-extracted data from your lab report with trend analysis
          </p>
        </div>

        {!hasInsights && (
          <button
            onClick={onGetInsights}
            disabled={isGeneratingInsights}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              isGeneratingInsights
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 shadow-lg hover:shadow-xl"
            }`}
          >
            {isGeneratingInsights ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <span>✨</span>
                <span>Get AI Insights</span>
              </>
            )}
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Parameter
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Value
                </th>
                <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Trend
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Reference Range
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Unit
                </th>
                <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {results.map((item, index) => {
                const pastValue = pastReportMap.get(
                  item.parameter.toLowerCase()
                );
                return (
                  <React.Fragment key={index}>
                    <tr className="hover:bg-blue-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold text-gray-900">
                          {item.parameter || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-bold text-gray-900">
                          {item.value || "N/A"}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <TrendIndicator
                          currentValue={item.value}
                          pastValue={pastValue}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {item.range || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {item.unit || "N/A"}
                      </td>
                      <td className="px-4 py-4 text-center">
                        {item.insight && (
                          <button
                            onClick={() => handleToggleRow(index)}
                            className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-150"
                            aria-label="Toggle details"
                          >
                            <svg
                              className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                                expandedRow === index ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                        )}
                      </td>
                    </tr>
                    {expandedRow === index && (
                      <tr className="bg-gradient-to-r from-purple-50 to-indigo-50">
                        <td
                          colSpan="7"
                          className="px-6 py-4 border-t border-purple-100"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="text-purple-600 text-xl">💡</div>
                            <div>
                              <h4 className="font-semibold text-purple-900 mb-2">
                                AI Insight
                              </h4>
                              <p className="text-purple-800 leading-relaxed">
                                {item.insight}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Showing {results.length} parameters</span>
            <span>Scroll to view more data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;
