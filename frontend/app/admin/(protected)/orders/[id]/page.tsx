"use client"

import { useEffect, useState, use } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { getOrderById, updateOrderStatus } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package, User, MapPin, CreditCard, Clock } from "lucide-react";
import Link from "next/link";

type OrderDetail = {
    _id: string;
    contact: { email: string };
    shipping: { firstName: string; lastName: string; address: string; city: string; country: string; zipCode: string };
    items: { _id: string; name: string; quantity: number; price: number; images?: string[] }[];
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

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { userInfo } = useAuthStore();
    const router = useRouter();
    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!userInfo?.token) return;
            try {
                setLoading(true);
                const data = await getOrderById(id, userInfo.token);
                setOrder(data);
            } catch {
                router.push("/admin/orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id, userInfo?.token, router]);

    const updateStatus = async (newStatus: string) => {
        if (!userInfo?.token || !order) return;
        try {
            await updateOrderStatus(order._id, newStatus, userInfo.token);
            setOrder({ ...order, status: newStatus });
        } catch { /* silent */ }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] text-xs uppercase tracking-widest text-muted-foreground">
                Retrieving manifest...
            </div>
        );
    }

    if (!order) return null;

    return (
        <main className="p-8 max-w-5xl mx-auto w-full">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Link
                        href="/admin/orders"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-[10px] uppercase tracking-widest mb-4"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Manifests
                    </Link>
                    <h1 className="font-luxury text-3xl tracking-wide">Order #{order._id.slice(-8).toUpperCase()}</h1>
                    <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline" className={`text-[9px] uppercase tracking-widest ${statusColors[order.status]}`}>
                            {order.status}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                            {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                        </span>
                    </div>
                </div>
                <select
                    value={order.status}
                    onChange={(e) => updateStatus(e.target.value)}
                    className="bg-foreground text-background text-[10px] uppercase tracking-widest px-4 py-2 rounded-sm focus:outline-none transition-colors border-none"
                >
                    {["Pending", "Processing", "Shipped", "Delivered"].map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Items Column */}
                <div className="md:col-span-2 space-y-8">
                    <section className="bg-muted/30 border border-foreground/5 p-6 rounded-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <Package className="w-4 h-4 text-muted-foreground" />
                            <h2 className="text-xs uppercase tracking-widest font-semibold">Artifacts</h2>
                        </div>
                        <div className="space-y-4">
                            {order.items.map(item => (
                                <div key={item._id} className="flex items-center justify-between py-4 border-b border-foreground/5 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-muted/50 rounded-sm overflow-hidden border border-foreground/10">
                                            {item.images?.[0] && (
                                                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{item.name}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                                                Qty: {item.quantity} × ${item.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium">${(item.quantity * item.price).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-foreground/10 space-y-2">
                            <div className="flex justify-between text-xs text-muted-foreground uppercase tracking-widest">
                                <span>Subtotal</span>
                                <span>${order.totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-base font-semibold pt-2">
                                <span className="uppercase tracking-widest text-xs">Total Manifest Value</span>
                                <span>${order.totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Shipping & Contact Column */}
                <div className="space-y-6">
                    <section className="bg-muted/30 border border-foreground/5 p-6 rounded-sm space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <h2 className="text-xs uppercase tracking-widest font-semibold">Client Details</h2>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">{order.shipping.firstName} {order.shipping.lastName}</p>
                                <p className="text-xs text-muted-foreground">{order.contact.email}</p>
                            </div>
                        </div>

                        <Separator className="opacity-10" />

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <h2 className="text-xs uppercase tracking-widest font-semibold">Shipping Destination</h2>
                            </div>
                            <div className="space-y-1 text-xs text-muted-foreground leading-relaxed uppercase tracking-wider">
                                <p className="text-foreground font-medium">{order.shipping.address}</p>
                                <p>{order.shipping.city}, {order.shipping.zipCode}</p>
                                <p>{order.shipping.country}</p>
                            </div>
                        </div>

                        <Separator className="opacity-10" />

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <CreditCard className="w-4 h-4 text-muted-foreground" />
                                <h2 className="text-xs uppercase tracking-widest font-semibold">Payment Status</h2>
                            </div>
                            <p className="text-[10px] uppercase tracking-widest text-green-400 font-medium bg-green-400/10 w-fit px-2 py-1 rounded-sm border border-green-400/20">
                                Paid in Full
                            </p>
                        </div>
                    </section>

                    <section className="bg-muted/30 border border-foreground/5 p-6 rounded-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <h2 className="text-xs uppercase tracking-widest font-semibold">Timeline</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="relative">
                                    <div className="w-2 h-2 rounded-full bg-foreground mt-1" />
                                    <div className="absolute top-3 left-1 w-px h-8 bg-foreground/10" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium">Manifest Inscribed</p>
                                    <p className="text-[10px] text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
