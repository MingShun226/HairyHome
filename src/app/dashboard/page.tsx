"use client";

import React from "react";
import Link from "next/link";
import { Shield, Briefcase, User, ArrowRight } from "lucide-react";
import styles from "./Dashboard.module.css";

export default function DashboardPortal() {
    const roles = [
        {
            title: "Admin Portal",
            desc: "Manage partners, validate services, and oversee platform performance.",
            href: "/dashboard/admin",
            icon: Shield,
            color: "#E1F5FE"
        },
        {
            title: "B2B Partner",
            desc: "Manage your pet shop, update services, and view upcoming bookings.",
            href: "/dashboard/b2b",
            icon: Briefcase,
            color: "#FFF9C4"
        },
        {
            title: "Pet Owner",
            desc: "View your bookings, manage pet profiles, and explore the marketplace.",
            href: "/dashboard/user",
            icon: User,
            color: "#FFCCBC"
        }
    ];

    return (
        <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto', padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <span className={styles.roleBadge} style={{ marginBottom: '20px' }}>Developer Sandbox</span>
                <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '15px' }}>Role Selection</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    Quickly jump between different dashboard prototypes for testing.
                </p>
            </div>

            <div style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', display: 'grid', gap: '30px' }}>
                {roles.map((role) => (
                    <Link key={role.href} href={role.href} style={{ textDecoration: 'none' }}>
                        <div className="card-retro" style={{ padding: '40px', height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}>
                            <div style={{ 
                                width: '60px', 
                                height: '60px', 
                                borderRadius: 'var(--radius-md)', 
                                background: role.color, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                marginBottom: '25px',
                                border: '2px solid black'
                            }}>
                                <role.icon size={30} color="black" />
                            </div>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '15px' }}>{role.title}</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '30px', flex: 1 }}>{role.desc}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800, color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                                Preview UI <ArrowRight size={18} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <Link href="/auth/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>Go to Real Auth Flow &rarr;</Link>
            </div>
        </div>
    );
}
