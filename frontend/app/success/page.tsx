import Navbar from "@/components/sections/Navbar";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function Success() {
    // We generate a deterministic layout and handle styling.
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center space-y-8 p-12 bg-muted/20 border border-foreground/10 shadow-sm">
                    <div className="flex justify-center">
                        <CheckCircle className="w-12 h-12 text-accent" strokeWidth={1} />
                    </div>

                    <div className="space-y-4">
                        <h1 className="font-luxury text-4xl tracking-wide">Thank You</h1>
                        <p className="text-foreground text-sm leading-relaxed">
                            Your exceptional taste has been confirmed. Your luxurious items are currently being curated and packaged for immediate dispatch.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-foreground/10">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-8">Order Reference Confirmed & Sent via Email</p>

                        <Link
                            href="/"
                            className="inline-block border border-foreground px-8 py-4 uppercase tracking-widest text-[10px] hover:bg-foreground hover:text-background transition-colors duration-300 w-full"
                        >
                            Continue Exploring
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
