"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Toast, ToastType } from "../components/Toast";
import { AnimatePresence } from "framer-motion";

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<{ id: number; message: string; type: ToastType }[]>([]);

    const showToast = useCallback((message: string, type: ToastType = "success") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div style={{ position: "fixed", top: "24px", right: "24px", zIndex: 10000, display: "flex", flexDirection: "column", gap: "10px" }}>
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <Toast key={toast.id} message={toast.message} type={toast.type} onExited={() => {}} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
