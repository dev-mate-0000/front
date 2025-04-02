"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { motion, AnimatePresence } from "framer-motion";

type AlertType = "success" | "error" | "warning";

type AlertState = {
  message: string;
  type: AlertType;
  isOpen: boolean;
  open: (msg: string, type: AlertType) => void;
  close: () => void;
};

export const TEXT_COLOR = {
  success: "text-green-400",
  warning: "text-yellow-400",
  error: "text-red-400",
} as const;

export const STATUS = {
  success: "success",
  warning: "warning",
  error: "error",
} as const;

export const useAlertStore = create<AlertState>((set) => ({
  message: "",
  type: "success", // 기본값
  isOpen: false,
  open: (msg, type) => set({ message: msg, type, isOpen: true }),
  close: () => set({ message: "", isOpen: false }),
}));

const AlertModal = () => {
  const { message, type, isOpen, close } = useAlertStore();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        close();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.8 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-15 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-gray-900 px-6 py-3 rounded-xl shadow-lg flex flex-col items-center gap-3 text-center">
            <span className={`text-lg font-semibold ${TEXT_COLOR[type]}`}>
              [{type.charAt(0).toUpperCase() + type.slice(1)}]
            </span>
            <span className="text-base text-white">
              {message}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertModal;
