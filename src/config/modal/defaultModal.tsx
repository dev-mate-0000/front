import { useEffect } from "react";

type ModalPropsPrivate = {
  title: string;
  sub: string;
  submitText: string;
  isOpen: boolean;
  onClose: () => void;
  onOkClose: () => void;
}

export type ModalProps = {
  title: string;
  sub: string;
  submitText: string;
  isOpen: boolean;
}

export default function Modal({
  title,
  sub,
  submitText,
  isOpen,
  onClose,
  onOkClose,
}: ModalPropsPrivate) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 animate-fade-in">
      <div className="bg-gray-900 p-6 rounded-lg shadow-2xl relative w-96 text-white border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-all"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-2 text-gray-300">{sub}</p>

        <button
          onClick={onOkClose}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 transition-all text-white rounded-md w-full"
        >
          {submitText}
        </button>
      </div>
    </div>
  );
}
