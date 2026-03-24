"use client";

import { useCartStore } from "@/store/cartStore";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SideCart() {
    const cart = useCartStore((state) => state.cart);
    const isCartOpen = useCartStore((state) => state.isCartOpen);
    const setCartOpen = useCartStore((state) => state.setCartOpen);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const router = useRouter();
     
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckoutNav = () => {
        setCartOpen(false);
        router.push("/checkout");
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCartOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-[110] flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-foreground/10">
                            <h2 className="font-luxury text-2xl tracking-wide">Your Bag ({cart.length})</h2>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="p-2 hover:bg-muted transition-colors rounded-full"
                                aria-label="Close Cart"
                            >
                                <X className="w-5 h-5 text-foreground" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                                    <ShoppingBag className="w-12 h-12" strokeWidth={1} />
                                    <p className="font-standard text-sm uppercase tracking-widest">Your bag is empty.</p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="relative h-32 w-24 bg-muted overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                fill
                                                unoptimized={true}
                                                className="object-cover object-center"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-luxury text-lg leading-tight pr-4">{item.name}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-muted-foreground hover:text-foreground text-[10px] uppercase tracking-widest transition-colors shrink-0"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{item.category}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center border border-foreground/20">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 px-2 hover:bg-muted transition-colors"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="px-3 text-xs font-medium w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 px-2 hover:bg-muted transition-colors"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 border-t border-foreground/10 bg-muted/30">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="font-standard text-xs uppercase tracking-widest text-muted-foreground">Subtotal</span>
                                    <span className="font-luxury text-xl">${total.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleCheckoutNav}
                                    className="w-full bg-foreground text-background py-4 uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
                                >
                                    Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
