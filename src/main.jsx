import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initWixAutoHeight } from "./wixAutoHeight.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

initWixAutoHeight();