import React from "react";
import { createRoot } from "react-dom/client";
import PostieApp from "./postie-route-app.jsx";

// Register service worker for offline OSM tile caching
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}

createRoot(document.getElementById("root")).render(<PostieApp />);
