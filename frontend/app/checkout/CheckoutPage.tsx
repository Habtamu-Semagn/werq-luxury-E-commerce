"use client";

import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutPage() {
    const cart = useCartStore((state) => state.cart);
    const clearCart = useCartStore((state) => state.clearCart);
    const router = useRouter();

    const [mounted, setMounted] = useState(false);
    const [contact, setContact] = useState({ email: "", phone: "" });
    const [shipping, setShipping] = useState({ firstName: "", lastName: "", address: "", city: "", postalCode: "", country: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contact, shipping, items: cart, totalAmount: total }),
            });

            if (response.ok) {
                clearCart();
                router.push("/success");
            } else {
                alert("Oops! Failed to securely process this order. The MongoDB backend might be unreachable.");
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error(error);
            alert("A network error occurred connecting to the backend.");
            setIsSubmitting(false);
        }
    };

    if (cart.length === 0 && !isSubmitting) {
        return (
            <div className="flex-1 py-32 px-4 flex flex-col items-center justify-center">
                <h1 className="font-luxury text-3xl mb-6">Your bag is empty.</h1>
                <button onClick={() => router.push("/")} className="border border-foreground px-8 py-3 uppercase tracking-widest text-xs hover:bg-foreground hover:text-background transition-colors duration-300">Return to Shop</button>
            </div>
        );
    }

    return (
        <div className="flex-1 py-16 bg-background container mx-auto px-4 max-w-6xl">
            <h1 className="font-luxury text-4xl mb-12 tracking-wide text-center md:text-left">Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-16">
                {/* Main Info Forms */}
                <div className="flex-1">
                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-16">

                        <section>
                            <h2 className="font-luxury text-2xl mb-6 border-b border-foreground/10 pb-4">1. Contact Information</h2>
                            <div className="space-y-6">
                                <input type="email" placeholder="Email Address" required className="w-full border-b border-foreground/20 bg-transparent py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground text-sm" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                                <input type="tel" placeholder="Phone Number (Optional)" className="w-full border-b border-foreground/20 bg-transparent py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground text-sm" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
                            </div>
                        </section>

                        <section>
                            <h2 className="font-luxury text-2xl mb-6 border-b border-foreground/10 pb-4">2. Shipping Address</h2>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                                <input type="text" placeholder="First Name" required className="w-full border-b border-foreground/20 bg-transparent py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground text-sm" value={shipping.firstName} onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })} />
                                <input type="text" placeholder="Last Name" required className="w-full border-b border-foreground/20 bg-transparent py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground text-sm" value={shipping.lastName} onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })} />
                                <input type="text" placeholder="Address" required className="col-span-2 w-full border-b border-foreground/20 bg-transparent py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground text-sm" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
                                <div className="col-span-2 grid grid-cols-2 gap-x-6">
                                    <input type="text" placeholder="City" required className="w-full border-b border-foreground/20 bg-transparent py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground text-sm" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
                                    <input type="text" placeholder="Postal Code" required className="w-full border-b border-foreground/20 bg-transparent py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground text-sm" value={shipping.postalCode} onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })} />
                                </div>
                                <input type="text" placeholder="Country" required className="col-span-2 w-full border-b border-foreground/20 bg-transparent py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground text-sm" value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} />
                            </div>
                        </section>
                    </form>
                </div>

                {/* Sticky Order Display Cart logic */}
                <div className="w-full lg:w-1/3">
                    <div className="bg-muted/30 p-8 sticky top-32 border border-foreground/5">
                        <h2 className="font-luxury text-2xl mb-6">Order Summary</h2>
                        <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative w-16 h-20 bg-muted">
                                        <Image src={item.imageUrl} alt={item.name} fill unoptimized={true} className="object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h3 className="font-luxury text-sm">{item.name}</h3>
                                        <p className="text-[10px] text-muted-foreground uppercase mt-1 tracking-widest">Qty: {item.quantity}</p>
                                        <p className="text-sm font-medium mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-foreground/10 pt-6 space-y-4">
                            <div className="flex justify-between text-xs tracking-widest uppercase">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xs tracking-widest uppercase">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>Complimentary</span>
                            </div>
                            <div className="flex justify-between text-lg font-medium pt-4 border-t border-foreground/10">
                                <span className="font-luxury tracking-wide">Total</span>
                                <span className="font-luxury">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            disabled={isSubmitting}
                            className="w-full bg-foreground text-background py-4 uppercase tracking-widest text-xs mt-8 hover:bg-foreground/90 transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? "Processing Securely..." : "Complete Order"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
