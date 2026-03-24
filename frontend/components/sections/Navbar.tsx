"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function Navbar() {
    const toggleCart = useCartStore((state) => state.toggleCart);
    const cart = useCartStore((state) => state.cart);
     
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/70 border-b border-foreground/10 transition-colors duration-300">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Navigation Links */}
                <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-medium">
                    <Link href="/shop" className="group relative py-2">
                        Shop
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 ease-in-out group-hover:w-full"></span>
                    </Link>
                    <Link href="/collections" className="group relative py-2">
                        Collections
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 ease-in-out group-hover:w-full"></span>
                    </Link>
                    <Link href="/about" className="group relative py-2">
                        Our Story
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 ease-in-out group-hover:w-full"></span>
                    </Link>
                </nav>

                {/* Logo */}
                <div className="flex-1 flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
                    <Link href="/" className="font-luxury text-3xl tracking-widest text-foreground">
                        WERQ
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end">
                    <button
                        onClick={toggleCart}
                        className="p-2 hover:opacity-70 transition-opacity relative group"
                        aria-label="Shopping Cart"
                    >
                        <ShoppingBag className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                        {mounted && itemCount > 0 && (
                            <span className="absolute top-1 right-0 translate-x-1/4 -translate-y-1/4 bg-foreground text-background text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium group-hover:scale-110 transition-transform">
                                {itemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
