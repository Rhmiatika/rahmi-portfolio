// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UIProvider } from "@/context/UIContext";
import { ToastProvider } from "@/context/ToastContext";
import GlobalLayer from "@/components/layout/GlobalLayer";
import Home from "@/pages/Home";
import ProjectDetail from "@/pages/ProjectDetail";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <UIProvider>
        <ToastProvider>
          {/* Global: background, cursor, toast */}
          <GlobalLayer />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ToastProvider>
      </UIProvider>
    </BrowserRouter>
  );
}
