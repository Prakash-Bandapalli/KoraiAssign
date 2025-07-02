const LandingPage = ({ onGetStarted }) => {
  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Analysis",
      description:
        "Advanced AI extracts and interprets your lab results with medical-grade accuracy",
    },
    {
      icon: "📊",
      title: "Trend Tracking",
      description:
        "Compare current results with previous reports to track your health progress",
    },
    {
      icon: "⚡",
      title: "Instant Results",
      description:
        "Get your health parameters extracted and organized in seconds",
    },
    {
      icon: "💡",
      title: "Smart Insights",
      description:
        "Receive personalized AI insights about your health parameters",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Upload",
      description: "Upload your lab report (PDF or image)",
    },
    {
      step: "2",
      title: "Analyze",
      description: "AI extracts and processes your health data",
    },
    {
      step: "3",
      title: "Understand",
      description: "View organized results with insights",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI-Powered
              <span className="text-blue-600 block">Lab Report Analysis</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your medical lab reports into clear, actionable health
              insights with our advanced AI technology. Track trends, understand
              your results, and take control of your health.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </button>
            <div className="flex items-center text-sm text-gray-500">
              <svg
                className="w-4 h-4 mr-2 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              No signup required for demo
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    See It In Action
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Extract key health parameters
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Identify normal vs abnormal values
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Track changes over time
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 text-center relative overflow-hidden">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse delay-300"></div>
                  <div className="absolute top-1/2 left-2 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-700"></div>

                  <div className="relative z-10">
                    <div className="text-4xl mb-4 animate-bounce">⚡</div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      Lightning Fast
                    </h4>
                    <p className="text-blue-700 font-semibold">
                      From lab report to insights in under 10 seconds
                    </p>

                    <div className="mt-4 bg-white rounded-full p-1">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      AI Processing...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to understand and track your health data
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Simple, fast, and accurate</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                    {step.step}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-200 transform translate-x-8"></div>
                  )}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are taking control of their health with
            AI-powered lab report analysis.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Analyzing Your Reports
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
