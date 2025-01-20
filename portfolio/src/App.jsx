import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProjectView from "./pages/ProjectView";
import Footer from "./pages/miniComponents/Footer";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { initializeAnalytics, logPageView } from "./lib/analytics"; // Import Analytics Utility
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    initializeAnalytics(); // Initialize Google Analytics
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <PageTracker /> {/* Component to track page views */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectView />} />
        </Routes>
        <Footer />
        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </ThemeProvider>
  );
}

// PageTracker Component for Tracking Route Changes
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname); // Log page views on route change
  }, [location]);

  return null;
};

export default App;
