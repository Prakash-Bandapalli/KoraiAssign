import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleGetStarted = () => {
    setCurrentPage("login");
  };

  const handleLogin = (username, password) => {
    if (username === "user" && password === "password") {
      setIsLoggedIn(true);
      setCurrentPage("app");
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("landing");
  };

  const handleBackToLanding = () => {
    setCurrentPage("landing");
  };

  const renderHeader = () => {
    if (currentPage === "landing") {
      return (
        <header className="absolute top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <button
              onClick={handleBackToLanding}
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Korai Health
              </h1>
            </button>
            <button
              onClick={handleGetStarted}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Get Started
            </button>
          </nav>
        </header>
      );
    }

    if (currentPage === "login") {
      return (
        <header className="bg-white shadow-sm border-b border-gray-100">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <button
              onClick={handleBackToLanding}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="font-bold">Korai Health</span>
            </button>
          </nav>
        </header>
      );
    }

    if (currentPage === "app" && isLoggedIn) {
      return (
        <header className="bg-white shadow-sm border-b border-gray-100">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <button
              onClick={handleBackToLanding}
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Korai Health Analyzer
              </h1>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-semibold"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </nav>
        </header>
      );
    }

    return null;
  };

  const renderContent = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onGetStarted={handleGetStarted} />;
      case "login":
        return <LoginPage onLogin={handleLogin} />;
      case "app":
        return isLoggedIn ? <HomePage /> : <LoginPage onLogin={handleLogin} />;
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  const renderFooter = () => {
    if (currentPage === "landing") {
      return (
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <h3 className="text-xl font-bold mb-4">Korai Health</h3>
                <p className="text-gray-400 mb-4">
                  AI-powered lab report analysis for better health
                  understanding.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Features</li>
                  <li>How it Works</li>
                  <li>Privacy</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Help Center</li>
                  <li>Contact Us</li>
                  <li>FAQ</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>
                © {new Date().getFullYear()} Korai Health. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      );
    }

    if (currentPage === "app") {
      return (
        <footer className="bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Korai Health. All rights reserved.
          </div>
        </footer>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {renderHeader()}
      <main className="flex-grow">{renderContent()}</main>
      {renderFooter()}
    </div>
  );
}

export default App;
