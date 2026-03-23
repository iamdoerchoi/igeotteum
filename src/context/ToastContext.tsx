"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const showToast = (msg: string) => {
    setMessage(msg);
    setIsVisible(true);
    // 2초 뒤에 자동으로 사라짐
    setTimeout(() => setIsVisible(false), 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* 토스트 UI 컴포넌트 (화면 중앙 하단 고정) */}
      <div
        className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold">
          <span>✅</span>
          <span>{message}</span>
        </div>
      </div>
    </ToastContext.Provider>
  );
}

// 편하게 쓰기 위한 커스텀 훅
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
