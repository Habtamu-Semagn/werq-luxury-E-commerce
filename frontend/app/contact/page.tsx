"use client";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { useState } from "react";

export default function ContactPage() {
    const [sent, setSent] = useState(false);

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 py-32 container mx-auto px-4 max-w-6xl flex flex-col lg:flex-row gap-24">

                {/* Contact Form */}
                <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Concierge</p>
                    <h1 className="font-luxury text-5xl tracking-wide mb-12">Client Relations</h1>

                    {sent ? (
                        <div className="py-12 border-y border-foreground/10 text-center space-y-4">
                            <h3 className="font-luxury text-2xl">Message Received</h3>
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground leading-relaxed max-w-sm mx-auto">Our maison concierge will review your inquiry and dispatch a response within 24 hours.</p>
                        </div>
                    ) : (
                        <form className="space-y-12" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <input type="text" placeholder="Name" required className="w-full border-b border-foreground/20 bg-transparent py-4 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground placeholder:uppercase placeholder:tracking-widest placeholder:text-[10px] text-sm" />
                                <input type="email" placeholder="Email Address" required className="w-full border-b border-foreground/20 bg-transparent py-4 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground placeholder:uppercase placeholder:tracking-widest placeholder:text-[10px] text-sm" />
                            </div>
                            <input type="text" placeholder="Order Number (Optional)" className="w-full border-b border-foreground/20 bg-transparent py-4 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground placeholder:uppercase placeholder:tracking-widest placeholder:text-[10px] text-sm" />
                            <textarea placeholder="Your Inquiry" required rows={4} className="w-full border-b border-foreground/20 bg-transparent py-4 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground placeholder:uppercase placeholder:tracking-widest placeholder:text-[10px] text-sm resize-none"></textarea>

                            <button type="submit" className="bg-foreground text-background px-12 py-4 uppercase tracking-widest text-[10px] hover:bg-transparent hover:text-foreground border border-foreground transition-colors duration-300">
                                Dispatch Message
                            </button>
                        </form>
                    )}
                </div>

                {/* FAQ Sidebar */}
                <div className="w-full lg:w-1/3 space-y-12 mt-12 lg:mt-0">
                    <div>
                        <h3 className="font-luxury text-2xl mb-6">Frequently Asked</h3>
                        <div className="space-y-6">
                            <details className="group border-b border-foreground/10 pb-4">
                                <summary className="font-standard text-[10px] uppercase tracking-widest cursor-pointer list-none flex justify-between items-center">
                                    Shipping Timelines
                                    <span className="transition group-open:rotate-180">+</span>
                                </summary>
                                <p className="mt-4 text-muted-foreground text-[11px] leading-relaxed">Complimentary global dispatch within 48 hours. Deliveries generally arrive within 3-5 business days depending on customs processing.</p>
                            </details>

                            <details className="group border-b border-foreground/10 pb-4">
                                <summary className="font-standard text-[10px] uppercase tracking-widest cursor-pointer list-none flex justify-between items-center">
                                    Return Policy
                                    <span className="transition group-open:rotate-180">+</span>
                                </summary>
                                <p className="mt-4 text-muted-foreground text-[11px] leading-relaxed">Items in original, unworn condition with tags attached may be returned within 14 days of receipt for a full refund. Custom or bespoke items are final sale.</p>
                            </details>

                            <details className="group border-b border-foreground/10 pb-4">
                                <summary className="font-standard text-[10px] uppercase tracking-widest cursor-pointer list-none flex justify-between items-center">
                                    Materials & Care
                                    <span className="transition group-open:rotate-180">+</span>
                                </summary>
                                <p className="mt-4 text-muted-foreground text-[11px] leading-relaxed">Our leathers patrol a natural patina over time. We advise strictly avoiding direct prolonged sunlight and excessive moisture. Professional cleaning is strongly recommended.</p>
                            </details>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
