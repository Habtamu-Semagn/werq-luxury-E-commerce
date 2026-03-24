"use client"

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Separator } from "@/components/ui/separator";

const sections = [
    {
        title: "1. Data Collection",
        content: "At WERQ, we collect only the essential information required to provide you with an uncompromising luxury experience. This includes personal identifiers (name, email), shipping details (address, geolocation if opted-in), and transaction history."
    },
    {
        title: "2. Usage of Information",
        content: "Your data is used solely to fulfill manifests, personalize your interactive shopping experience, and maintain the integrity of our platform. We do not sell your data to third-party entities."
    },
    {
        title: "3. Safeguarding Artifacts",
        content: "We implement industry-standard encryption and security protocols to ensure that your personal information and transaction history remain confidential within the WERQ vault."
    },
    {
        title: "4. Your Rights",
        content: "You have the right to request a full transcript of your data profile or the permanent deletion of your account and associated records at any time."
    }
];

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-3xl">
                    <header className="mb-20 text-center md:text-left">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Legal Framework</p>
                        <h1 className="font-luxury text-5xl tracking-wide mb-6">Privacy Policy</h1>
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
                            For inquiries regarding our data protocols, please contact<br />
                            <span className="text-foreground">concierge@werq.luxury</span>
                        </p>
                    </footer>
                </div>
            </div>
            <Footer />
        </main>
    );
}
