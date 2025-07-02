const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center p-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Analyzing Your Report
        </h3>
        <p className="text-gray-600">
          Our AI is extracting and processing your health data...
        </p>
      </div>
    </div>
  );
};

export default Spinner;
