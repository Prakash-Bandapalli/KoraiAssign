import { useState } from "react";

const FileUpload = ({ handleAnalysis, isLoading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      handleAnalysis(selectedFile);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Upload Your Lab Report
          </h2>
          <p className="text-blue-100">
            AI will extract and analyze your health parameters instantly
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive
                  ? "border-blue-400 bg-blue-50"
                  : selectedFile
                  ? "border-green-400 bg-green-50"
                  : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={onFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="space-y-4">
                {selectedFile ? (
                  <>
                    <div className="text-4xl">✅</div>
                    <div>
                      <p className="text-lg font-semibold text-green-700">
                        File Selected
                      </p>
                      <p className="text-sm text-green-600 mt-1">
                        {selectedFile.name}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-4xl text-gray-400">📄</div>
                    <div>
                      <p className="text-lg font-semibold text-gray-700">
                        Drop your lab report here
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        or click to browse files
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Supported Formats */}
            <div className="flex flex-wrap justify-center gap-2">
              {["PDF", "PNG", "JPG", "JPEG"].map((format) => (
                <span
                  key={format}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                >
                  {format}
                </span>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedFile || isLoading}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                !selectedFile || isLoading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing Report...</span>
                </div>
              ) : (
                "🚀 Analyze Report"
              )}
            </button>
          </form>

          {/* Info Section */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-start space-x-3">
              <div className="text-blue-600 text-xl">🔒</div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">
                  Your Privacy is Protected
                </h4>
                <p className="text-sm text-blue-700">
                  Your lab reports are processed securely and never stored
                  permanently. All data is encrypted and deleted after analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
