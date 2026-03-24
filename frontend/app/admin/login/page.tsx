"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    const { userInfo, login } = useAuthStore();

    useEffect(() => {
        // Prevent looping. If auth is valid, shunt securely away from credential form.
        if (userInfo && userInfo.isAdmin) {
            router.push("/admin/dashboard");
        }
    }, [userInfo, router]);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok && data.isAdmin) {
                login(data);
                router.push("/admin/dashboard");
            } else {
                setError(data.message || "Unauthorized personnel access protocol rejected.");
            }
        } catch {
            setError("Server communication pipeline severed.");
        }
    };

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md border border-foreground/10 p-12 bg-muted/5 relative">
                    <div className="text-center mb-12">
                        <h1 className="font-luxury text-3xl tracking-widest mb-2">Vault Access</h1>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Authorized Curators Only</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] p-4 mb-8 text-center uppercase tracking-widest">
                            {error}
                        </div>
                    )}

                    <form onSubmit={submitHandler} className="space-y-8">
                        <div>
                            <input
                                type="email"
                                placeholder="Identification Hash (Email)"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-b border-foreground/20 bg-transparent py-4 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground placeholder:uppercase placeholder:tracking-widest placeholder:text-[10px] text-sm"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Cryptographic Key (Password)"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-b border-foreground/20 bg-transparent py-4 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground placeholder:uppercase placeholder:tracking-widest placeholder:text-[10px] text-sm"
                            />
                        </div>

                        <button type="submit" className="w-full bg-foreground text-background py-4 uppercase tracking-widest text-[10px] hover:bg-transparent hover:text-foreground border border-foreground transition-all duration-300 mt-8">
                            Initialize Handshake
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
}
