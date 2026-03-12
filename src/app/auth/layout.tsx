"use client";

import { usePathname } from "next/navigation";
import styles from "../dashboard/Dashboard.module.css";
import Link from "next/link";
import Image from "next/image";
import { 
    LayoutDashboard, 
    Users, 
    Calendar, 
    ShieldCheck, 
    Store, 
    Settings, 
    LogOut, 
    Home,
    Search
} from "lucide-react";

import Navbar from "@/components/Navbar";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Navbar />
            {children}
        </div>
    );
}
