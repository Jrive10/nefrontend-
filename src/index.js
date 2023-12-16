import React from "react";
import { createRoot } from 'react-dom/client'; // Import createRoot
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import './index.css';

// Import your SCSS file here if needed, e.g.:
// import './index.scss';

// Select the root element
const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Create a root

// Render your app within the Router and StrictMode
root.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
