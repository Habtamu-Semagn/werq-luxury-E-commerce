"use client";

import { useAuthStore } from "@/store/authStore";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { userInfo } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            router.push("/admin/login");
        }
    }, [userInfo, router]);

    if (!userInfo || !userInfo.isAdmin) return null;

    return (
        <div className="flex h-screen bg-muted/20 overflow-hidden">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
