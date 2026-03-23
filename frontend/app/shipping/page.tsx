import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function ShippingPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 py-32 container mx-auto px-4 max-w-4xl">
                <header className="text-center mb-24">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Logistics</p>
                    <h1 className="font-luxury text-4xl md:text-6xl tracking-wide">Shipping & Returns</h1>
                    <div className="w-12 h-[1px] bg-foreground/30 mx-auto mt-8"></div>
                </header>

                <div className="space-y-24">
                    <section className="space-y-6">
                        <h2 className="font-luxury text-2xl border-b border-foreground/10 pb-4">Global Dispatch</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            We offer complimentary express shipping globally. All orders are processed and dispatched from our atelier within 48 hours of meticulous purchase verification.
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Delivery timelines generally span 3-5 business days, varying slightly subject to international customs processing protocols. A signature is explicitly required upon delivery to ensure the secure transfer of your investment.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="font-luxury text-2xl border-b border-foreground/10 pb-4">Our Return Policy</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Articles in their original, pristine condition—unworn, unsent, and with all proprietary protective tags and packaging fully intact—may be returned within 14 days of receipt for a full refund routed safely to the original payment method.
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Please contact our Concierge implicitly to initiate a return sequence. Bespoke, tailored, or heavily personalized artifacts are definitive final sales and cannot be reversed or adjusted.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
