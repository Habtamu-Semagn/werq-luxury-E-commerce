"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Package, ShoppingCart, TrendingUp, Clock } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { BASE_URL } from "@/lib/api";

export default function AdminDashboard() {
    const { userInfo } = useAuthStore();
    const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, pending: 0 });

    const fetchStats = useCallback(async () => {
        // Guard token
        const token = userInfo?.token;
        if (!token) return;

        try {
            const [prodRes, ordRes] = await Promise.all([
                fetch(`${BASE_URL}/products`),
                fetch(`${BASE_URL}/orders`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);
            const productsData = await prodRes.json();
            const ordersData = await ordRes.json();

            const revenueValue = Array.isArray(ordersData)
                ? ordersData.reduce((s: number, o: { totalAmount?: number }) => s + (o.totalAmount || 0), 0)
                : 0;
            const pendingCount = Array.isArray(ordersData)
                ? ordersData.filter((o: { status?: string }) => o.status === "Pending").length
                : 0;

            setStats({
                products: Array.isArray(productsData) ? productsData.length : 0,
                orders: Array.isArray(ordersData) ? ordersData.length : 0,
                revenue: revenueValue,
                pending: pendingCount
            });
        } catch { /* silent */ }
    }, [userInfo?.token]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchStats();
    }, [fetchStats]);

    const statCards = [
        { title: "Total Products", value: stats.products, icon: Package, href: "/admin/products", color: "text-blue-400" },
        { title: "Total Orders", value: stats.orders, icon: ShoppingCart, href: "/admin/orders", color: "text-green-400" },
        { title: "Revenue", value: `$${stats.revenue.toFixed(2)}`, icon: TrendingUp, href: "/admin/orders", color: "text-purple-400" },
        { title: "Pending Orders", value: stats.pending, icon: Clock, href: "/admin/orders", color: "text-orange-400" },
    ];

    return (
        <main className="p-8 max-w-6xl mx-auto w-full">
            {/* Header */}
            <div className="mb-8">
                <h1 className="font-luxury text-3xl tracking-wide">Dashboard</h1>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    Welcome back, {userInfo?.name}
                </p>
            </div>

            <Separator className="mb-8 opacity-20" />

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                {statCards.map(({ title, value, icon: Icon, href, color }) => (
                    <Link key={title} href={href}>
                        <Card className="border-foreground/8 bg-background hover:bg-muted/30 transition-colors cursor-pointer group">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-normal">{title}</CardTitle>
                                <Icon className={`w-4 h-4 ${color} group-hover:scale-110 transition-transform`} strokeWidth={1.5} />
                            </CardHeader>
                            <CardContent>
                                <p className="font-luxury text-3xl">{value}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/admin/products">
                    <Card className="border-foreground/8 bg-background hover:bg-muted/30 transition-colors cursor-pointer group">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-md bg-blue-500/10 flex items-center justify-center">
                                <Package className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Manage Catalog</p>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">View, add, or remove products</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/orders">
                    <Card className="border-foreground/8 bg-background hover:bg-muted/30 transition-colors cursor-pointer group">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-md bg-green-500/10 flex items-center justify-center">
                                <ShoppingCart className="w-5 h-5 text-green-400" strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Fulfillment Manifests</p>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">Track and manage customer orders</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </main>
    );
}
