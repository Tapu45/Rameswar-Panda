import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Lenis setup
import Lenis from "@studio-freight/lenis";

const lenis = new Lenis({
  lerp: 0.1, // Adjust for smoothness
  smooth: true,
  direction: "vertical",
  gestureDirection: "vertical",
  mouseMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);