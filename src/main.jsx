import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Legacy article adapter initializes mounted DOM once; migrate it before enabling StrictMode's development remount.
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
