"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Calendar,
    Store,
    Settings,
    LogOut,
    Search,
    BarChart3,
    ClipboardList,
    Star,
    PawPrint,
    Heart,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
import styles from "./Dashboard.module.css";

type NavItem = {
    label: string;
    href: string;
    icon: React.ElementType;
} | {
    section: string;
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { showToast } = useToast();

    const isB2B = pathname.includes("/b2b");
    const isAdmin = pathname.includes("/admin");

    const roleLabel = isAdmin ? "Administrator" : isB2B ? "Business Partner" : "Pet Owner";

    const adminNav: NavItem[] = [
        { section: "Main" },
        { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { section: "Manage" },
        { label: "Partner Applications", href: "/dashboard/admin/applications", icon: ClipboardList },
        { label: "All Partners", href: "/dashboard/admin/partners", icon: Users },
        { label: "Platform Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
    ];

    const b2bNav: NavItem[] = [
        { section: "Main" },
        { label: "Overview", href: "/dashboard/b2b", icon: LayoutDashboard },
        { section: "Business" },
        { label: "My Services", href: "/dashboard/b2b/services", icon: Store },
        { label: "Upcoming Bookings", href: "/dashboard/b2b/bookings", icon: Calendar },
        { label: "Reviews", href: "/dashboard/b2b/reviews", icon: Star },
        { label: "Shop Settings", href: "/dashboard/b2b/settings", icon: Settings },
    ];

    const userNav: NavItem[] = [
        { section: "Main" },
        { label: "Overview", href: "/dashboard/user", icon: LayoutDashboard },
        { section: "My Stuff" },
        { label: "My Bookings", href: "/dashboard/user/bookings", icon: Calendar },
        { label: "My Pets", href: "/dashboard/user/pets", icon: PawPrint },
        { label: "Favorites", href: "/dashboard/user/favorites", icon: Heart },
        { label: "Search Services", href: "/dashboard/user/search", icon: Search },
        { label: "Settings", href: "/dashboard/user/settings", icon: Settings },
    ];

    const navItems = isAdmin ? adminNav : isB2B ? b2bNav : userNav;

    const isPortal = pathname === "/dashboard";

    return (
        <div className={styles.layout}>
            {!isPortal && (
                <aside className={styles.sidebar}>
                    <Link href="/" className={styles.logo}>
                        <Image src="/groomshine_logo.png" alt="Logo" width={40} height={40} />
                        <span>GROOMSHINE</span>
                    </Link>

                    <div className={styles.roleHeader}>
                        <span className={styles.roleBadge}>{roleLabel}</span>
                    </div>

                    <nav className={styles.nav}>
                        {navItems.map((item, index) => {
                            if ("section" in item) {
                                return (
                                    <div key={`section-${index}`} className={styles.navSection}>
                                        {item.section}
                                    </div>
                                );
                            }
                            return (
                                <Link
                                    key={`${item.href}-${item.label}`}
                                    href={item.href}
                                    className={`${styles.navItem} ${pathname === item.href ? styles.active : ""}`}
                                >
                                    <item.icon size={20} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                        <Link
                            href="/auth/login"
                            className={`${styles.navItem} ${styles.logoutBtn} ${styles.mobileLogout}`}
                            onClick={() => showToast("Successfully logged out. See you next time!", "info")}
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </Link>
                    </nav>

                    <div className={styles.footer}>
                        <Link
                            href="/auth/login"
                            className={`${styles.navItem} ${styles.logoutBtn} ${styles.desktopLogout}`}
                            onClick={() => showToast("Successfully logged out. See you next time!", "info")}
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </Link>
                    </div>
                </aside>
            )}

            <main className={`${styles.content} ${isPortal ? styles.fullContent : ""}`}>
                {children}
            </main>
        </div>
    );
}
