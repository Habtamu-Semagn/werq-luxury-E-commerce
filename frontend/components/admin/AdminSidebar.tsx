"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    LogOut,
    Store,
    ChevronRight
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { userInfo, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        router.push("/admin/login");
    };

    return (
        <aside className="flex flex-col w-64 h-full bg-background border-r border-foreground/8 overflow-y-auto">
            {/* Brand */}
            <div className="px-6 py-6 flex flex-col gap-1">
                <Link href="/" className="font-luxury text-2xl tracking-widest text-foreground hover:opacity-70 transition-opacity">
                    WERQ
                </Link>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Admin Console</p>
            </div>

            <Separator className="opacity-20" />

            {/* User badge */}
            <div className="px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-xs font-medium uppercase">
                    {userInfo?.name?.charAt(0) ?? "A"}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{userInfo?.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{userInfo?.email}</p>
                </div>
                <Badge variant="outline" className="text-[9px] uppercase tracking-widest px-2 py-0 border-foreground/20">
                    Admin
                </Badge>
            </div>

            <Separator className="opacity-20" />

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map(({ label, href, icon: Icon }) => {
                    const active = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-md text-xs uppercase tracking-widest transition-all duration-200 group
                                ${active
                                    ? "bg-foreground text-background"
                                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                                }
                            `}
                        >
                            <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                            <span className="flex-1">{label}</span>
                            {active && <ChevronRight className="w-3 h-3 opacity-60" />}
                        </Link>
                    );
                })}
            </nav>

            <Separator className="opacity-20" />

            {/* Footer actions */}
            <div className="px-3 py-4 space-y-1">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md text-xs uppercase tracking-widest text-muted-foreground hover:bg-foreground/5 hover:text-foreground transition-all"
                >
                    <Store className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                    View Storefront
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all"
                >
                    <LogOut className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
