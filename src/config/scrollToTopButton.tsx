"use client";

import { ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 rounded-full shadow-xl transition-all duration-300 
      ${
        isVisible
          ? "opacity-100 scale-100 bg-gray-700 hover:scale-110"
          : "opacity-0 scale-90"
      }`}
    >
      <ChevronUp className="text-white w-6 h-6" />
    </button>
  );
}
