"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
    message: string;
    type?: ToastType;
    onExited?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = "success" }) => {
    const icons = {
        success: <CheckCircle size={20} />,
        error: <AlertCircle size={20} />,
        info: <Info size={20} />,
    };

    const colors = {
        success: "#2E7D32",
        error: "#C62828",
        info: "#1565C0",
    };

    const bgColors = {
        success: "#E8F5E9",
        error: "#FFEBEE",
        info: "#E3F2FD",
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            style={{
                background: bgColors[type],
                color: colors[type],
                padding: "16px 24px",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontWeight: 700,
                fontSize: "0.95rem",
                border: `1.5px solid ${colors[type]}22`,
                minWidth: "300px",
                maxWidth: "450px",
            }}
        >
            <span style={{ display: "flex" }}>{icons[type]}</span>
            <span style={{ flex: 1 }}>{message}</span>
        </motion.div>
    );
};
