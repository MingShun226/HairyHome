"use client";

import React from "react";
import styles from "../../AdminDashboard.module.css";
import {
    DollarSign,
    Calendar,
    Users,
    UserCheck,
    TrendingUp,
    Star,
} from "lucide-react";

const MONTHLY_REVENUE = [
    { month: "Jan", value: 12500 },
    { month: "Feb", value: 15800 },
    { month: "Mar", value: 18200 },
    { month: "Apr", value: 14600 },
    { month: "May", value: 21000 },
    { month: "Jun", value: 24300 },
];

const SERVICE_BOOKINGS = [
    { service: "Grooming", count: 542 },
    { service: "Boarding", count: 387 },
    { service: "Daycare", count: 298 },
    { service: "Spa", count: 215 },
    { service: "Training", count: 156 },
    { service: "Veterinary", count: 132 },
];

const TOP_PARTNERS = [
    { name: "Happy Tails Hostel", bookings: 342, revenue: "RM 28,560", rating: 4.8, growth: "+12%" },
    { name: "Pet Paradise", bookings: 287, revenue: "RM 14,350", rating: 4.7, growth: "+8%" },
    { name: "Bark Avenue", bookings: 218, revenue: "RM 15,260", rating: 4.6, growth: "+15%" },
    { name: "The Pet Lodge", bookings: 203, revenue: "RM 24,360", rating: 4.5, growth: "+6%" },
    { name: "PawSpa Premium", bookings: 189, revenue: "RM 22,680", rating: 4.9, growth: "+20%" },
];

const RECENT_ACTIVITY = [
    { id: 1, text: "Revenue milestone: Platform crossed RM 100,000 total revenue", time: "1 hour ago" },
    { id: 2, text: "New partner registration: Purrfect Grooming from Ampang", time: "3 hours ago" },
    { id: 3, text: "Peak booking day: 48 bookings recorded on March 10", time: "5 hours ago" },
    { id: 4, text: "User milestone: 500th user registered on the platform", time: "1 day ago" },
    { id: 5, text: "Monthly report generated for February 2024", time: "2 days ago" },
];

export default function PlatformAnalyticsPage() {
    const maxRevenue = Math.max(...MONTHLY_REVENUE.map(m => m.value));
    const maxBookings = Math.max(...SERVICE_BOOKINGS.map(s => s.count));

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Platform Analytics</h1>
            </div>

            {/* Period Selector */}
            <div className={styles.filterTabs}>
                <button className={`${styles.filterTab}`}>This Week</button>
                <button className={`${styles.filterTab} ${styles.filterTabActive}`}>This Month</button>
                <button className={`${styles.filterTab}`}>This Year</button>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#E8F5E9' }}>
                        <DollarSign size={20} color="#388E3C" />
                    </div>
                    <span className={styles.statValue}>RM 106,470</span>
                    <span className={styles.statLabel}>Total Revenue</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2E7D32', marginTop: '4px', display: 'block' }}>+12.5% vs last month</span>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#E1F5FE' }}>
                        <Calendar size={20} color="#1976D2" />
                    </div>
                    <span className={styles.statValue}>1,730</span>
                    <span className={styles.statLabel}>Total Bookings</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2E7D32', marginTop: '4px', display: 'block' }}>+8.3% vs last month</span>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#FFF9C4' }}>
                        <Users size={20} color="#F57F17" />
                    </div>
                    <span className={styles.statValue}>32</span>
                    <span className={styles.statLabel}>Active Partners</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2E7D32', marginTop: '4px', display: 'block' }}>+6.7% vs last month</span>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#F3E5F5' }}>
                        <UserCheck size={20} color="#7B1FA2" />
                    </div>
                    <span className={styles.statValue}>512</span>
                    <span className={styles.statLabel}>Registered Users</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2E7D32', marginTop: '4px', display: 'block' }}>+18.2% vs last month</span>
                </div>
            </div>

            {/* Revenue Chart */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3>Monthly Revenue (2024)</h3>
                </div>
                <div className={styles.chartWrapper}>
                    <div className={styles.chartGrid}>
                        {/* Y-axis gridlines */}
                        {[0, 1, 2, 3, 4].map(i => {
                            const value = Math.round(maxRevenue - (maxRevenue * i) / 4);
                            const pct = (i / 4) * 100;
                            return (
                                <div key={i}>
                                    <div className={styles.gridLine} style={{ top: `${pct}%` }} />
                                    <span className={styles.gridLabel} style={{ top: `${pct}%` }}>
                                        {(value / 1000).toFixed(0)}k
                                    </span>
                                </div>
                            );
                        })}
                        {/* Bars */}
                        <div className={styles.chartContainer}>
                            {MONTHLY_REVENUE.map(m => (
                                <div key={m.month} className={styles.chartBar}>
                                    <div className={styles.barFill} style={{ height: `${(m.value / maxRevenue) * 100}%` }}>
                                        <span className={styles.barValue}>RM {m.value.toLocaleString()}</span>
                                    </div>
                                    <span className={styles.barLabel}>{m.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.chartTotal}>
                    <span className={styles.chartTotalLabel}>Total H1 Revenue</span>
                    <span className={styles.chartTotalValue}>RM {MONTHLY_REVENUE.reduce((a, b) => a + b.value, 0).toLocaleString()}</span>
                    <span className={styles.chartTotalChange}>+14.2% YoY</span>
                </div>
            </div>

            {/* Bookings by Service Type */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3>Bookings by Service Type</h3>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                        {SERVICE_BOOKINGS.reduce((a, b) => a + b.count, 0).toLocaleString()} total
                    </span>
                </div>
                <div className={styles.formSection}>
                    {SERVICE_BOOKINGS.map((s, i) => {
                        const colors = ['#5D64A4', '#7B83D1', '#9B7FD1', '#D17FB3', '#D1A87F', '#7FD1B3'];
                        const pct = Math.round((s.count / SERVICE_BOOKINGS.reduce((a, b) => a + b.count, 0)) * 100);
                        return (
                            <div key={s.service} style={{ marginBottom: '18px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--foreground)' }}>
                                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: colors[i], display: 'inline-block', flexShrink: 0 }} />
                                        {s.service}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--foreground)' }}>{s.count}</span>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', minWidth: '32px' }}>{pct}%</span>
                                    </span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: '#F3F4FB', borderRadius: '50px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${(s.count / maxBookings) * 100}%`,
                                        height: '100%',
                                        background: colors[i],
                                        borderRadius: '50px',
                                        transition: 'width 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)',
                                    }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Top Performing Partners */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3>Top Performing Partners</h3>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Partner Name</th>
                            <th>Total Bookings</th>
                            <th>Revenue</th>
                            <th>Rating</th>
                            <th>Growth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TOP_PARTNERS.map((p, i) => (
                            <tr key={i}>
                                <td><strong>{p.name}</strong></td>
                                <td>{p.bookings}</td>
                                <td>{p.revenue}</td>
                                <td>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                                        <Star size={14} fill="#FFD700" color="#FFD700" /> {p.rating}
                                    </span>
                                </td>
                                <td>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#2E7D32', fontWeight: 700 }}>
                                        <TrendingUp size={14} /> {p.growth}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Recent Platform Activity */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <h3>Recent Platform Activity</h3>
                </div>
                <div className={styles.activityFeed}>
                    {RECENT_ACTIVITY.map(item => (
                        <div key={item.id} className={styles.activityItem}>
                            <div className={styles.activityDot} />
                            <div className={styles.activityContent}>
                                <p style={{ fontSize: '0.95rem', color: 'var(--foreground)', margin: 0, fontWeight: 500 }}>{item.text}</p>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Platform Summary */}
            <div className={styles.tableContainer} style={{ marginBottom: '16px' }}>
                <div className={styles.tableHeader}>
                    <h3>Platform Summary</h3>
                </div>
            </div>
            <div className={styles.statsGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Avg. Booking Value</span>
                    <span className={styles.statValue} style={{ fontSize: '1.5rem' }}>RM 61.50</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Customer Satisfaction</span>
                    <span className={styles.statValue} style={{ fontSize: '1.5rem' }}>4.7/5.0</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Partner Retention</span>
                    <span className={styles.statValue} style={{ fontSize: '1.5rem' }}>94%</span>
                </div>
            </div>
        </div>
    );
}
