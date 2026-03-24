"use client"

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Separator } from "@/components/ui/separator";

const sections = [
    {
        title: "1. Manifest Acceptance",
        content: "By engaging with the WERQ platform, you agree to be bound by these terms. Each order placed constitutes a unique manifest binding both the client and the artisan to the terms of acquisition."
    },
    {
        title: "2. Intellectual Property",
        content: "All artifacts, imagery, and cartographic data presented on this platform are the exclusive property of WERQ. Unauthorized reproduction or dissemination is strictly prohibited."
    },
    {
        title: "3. Acquisition & Returns",
        content: "Luxury artifacts are handcrafted and inspected with the utmost precision. Returns are accepted only for manifest discrepancies or structural anomalies reported within 48 hours of delivery."
    },
    {
        title: "4. Jurisdiction",
        content: "These terms are governed by the laws of the jurisdiction in which WERQ is registered. Any disputes will be mediated through the appropriate legal channels in the respective territory."
    }
];

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-3xl">
                    <header className="mb-20 text-center md:text-left">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Governance</p>
                        <h1 className="font-luxury text-5xl tracking-wide mb-6">Terms of Service</h1>
                        <p className="text-muted-foreground text-xs uppercase tracking-widest">Last Updated: March 24, 2026</p>
                    </header>

                    <div className="space-y-16">
                        {sections.map((section, index) => (
                            <section key={index} className="space-y-6">
                                <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground">{section.title}</h2>
                                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                                    {section.content}
                                </p>
                                {index !== sections.length - 1 && <Separator className="opacity-5 pt-8" />}
                            </section>
                        ))}
                    </div>

                    <footer className="mt-24 pt-12 border-t border-foreground/5 text-center">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-loose">
                            By continuing your journey on WERQ, you acknowledge acceptance of these governing principles.
                        </p>
                    </footer>
                </div>
            </div>
            <Footer />
        </main>
    );
}
