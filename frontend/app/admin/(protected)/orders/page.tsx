"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type OrderRecord = {
    _id: string;
    shipping: { firstName: string; lastName: string; city: string; country: string };
    contact: { email: string };
    items: { id: string }[];
    totalAmount: number;
    status: string;
    createdAt: string;
};

const statusColors: Record<string, string> = {
    Pending: "bg-orange-500/10 text-orange-400 border-orange-400/20",
    Processing: "bg-blue-500/10 text-blue-400 border-blue-400/20",
    Shipped: "bg-purple-500/10 text-purple-400 border-purple-400/20",
    Delivered: "bg-green-500/10 text-green-400 border-green-400/20",
};

export default function AdminOrders() {
    const { userInfo } = useAuthStore();
    const [orders, setOrders] = useState<OrderRecord[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = useCallback(async () => {
        if (!userInfo?.token) return;
        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/api/orders", {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            const data = await res.json();
            setOrders(Array.isArray(data) ? data : []);
        } catch { /* silent */ } finally { setLoading(false); }
    }, [userInfo?.token]);

    useEffect(() => { fetchOrders(); }, [fetchOrders]);

    const updateStatus = async (id: string, status: string) => {
        try {
            await fetch(`http://localhost:5000/api/orders/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo?.token}`
                },
                body: JSON.stringify({ status })
            });
            fetchOrders();
        } catch { /* silent */ }
    };

    return (
        <main className="p-8 max-w-6xl mx-auto w-full">
            <div className="mb-8">
                <h1 className="font-luxury text-3xl tracking-wide">Fulfillment Manifests</h1>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    {orders.length} order{orders.length !== 1 ? "s" : ""} recorded
                </p>
            </div>

            <Separator className="mb-8 opacity-20" />

            {loading ? (
                <div className="flex items-center justify-center h-48 text-xs uppercase tracking-widest text-muted-foreground">
                    Loading manifests...
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow className="border-foreground/10">
                            <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Order ID</TableHead>
                            <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Client</TableHead>
                            <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Items</TableHead>
                            <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Total</TableHead>
                            <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Status</TableHead>
                            <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-normal text-right">Update</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-xs text-muted-foreground py-12 uppercase tracking-widest">
                                    No orders yet.
                                </TableCell>
                            </TableRow>
                        ) : orders.map(order => (
                            <TableRow key={order._id} className="border-foreground/5 hover:bg-muted/20 transition-colors">
                                <TableCell className="text-xs text-muted-foreground font-mono">{order._id.slice(0, 8)}...</TableCell>
                                <TableCell>
                                    <p className="text-sm font-medium">{order.shipping.firstName} {order.shipping.lastName}</p>
                                    <p className="text-[10px] text-muted-foreground mt-0.5">{order.contact.email}</p>
                                </TableCell>
                                <TableCell className="text-sm">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</TableCell>
                                <TableCell className="font-medium text-sm">${order.totalAmount.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={`text-[9px] uppercase tracking-widest ${statusColors[order.status] ?? ""}`}
                                    >
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatus(order._id, e.target.value)}
                                        className="bg-transparent border border-foreground/15 text-[10px] uppercase tracking-widest p-1.5 rounded-sm focus:outline-none hover:border-foreground/40 transition-colors"
                                    >
                                        {["Pending", "Processing", "Shipped", "Delivered"].map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </main>
    );
}
