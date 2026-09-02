import React from "react";
import ReactDOM from "react-dom/client";
import TechPartnerApp from "./app/page";
import "./app/globals.css";
import { Toaster } from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TechPartnerApp />
    <Toaster />
  </React.StrictMode>
);
