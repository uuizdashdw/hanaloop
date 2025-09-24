"use client";

import { useEffect } from "react";

type ErrorModalProps = {
  message?: string;
  onClose: () => void;
};

export default function ErrorModal({ message = "에러가 발생했습니다.", onClose }: ErrorModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <h2 className="text-lg font-bold text-red-600 mb-4">⚠️ 오류</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
          다시 시도
        </button>
      </div>
    </div>
  );
}
