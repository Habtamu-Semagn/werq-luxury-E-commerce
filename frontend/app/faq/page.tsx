import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 py-32 container mx-auto px-4 max-w-4xl">
                <header className="text-center mb-24">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Resolution</p>
                    <h1 className="font-luxury text-4xl md:text-6xl tracking-wide">Frequently Asked</h1>
                    <div className="w-12 h-[1px] bg-foreground/30 mx-auto mt-8"></div>
                </header>

                <div className="space-y-8">
                    <details className="group border-b border-foreground/10 pb-6 outline-none marker:content-[''] cursor-pointer">
                        <summary className="font-standard text-xs md:text-sm uppercase tracking-widest cursor-pointer list-none flex justify-between items-center group-open:text-foreground/70 transition-colors">
                            Are your materials ethically sourced?
                            <span className="transition-transform duration-300 group-open:-rotate-180">+</span>
                        </summary>
                        <p className="mt-8 text-muted-foreground text-sm leading-relaxed max-w-2xl">
                            Absolutely. We source strictly from historic tanneries and sustainable mills across Europe that adhere to the most rigid environmental and ethical parameters imaginable.
                        </p>
                    </details>

                    <details className="group border-b border-foreground/10 pb-6 outline-none marker:content-[''] cursor-pointer">
                        <summary className="font-standard text-xs md:text-sm uppercase tracking-widest cursor-pointer list-none flex justify-between items-center group-open:text-foreground/70 transition-colors">
                            Can I request a bespoke commission?
                            <span className="transition-transform duration-300 group-open:-rotate-180">+</span>
                        </summary>
                        <p className="mt-8 text-muted-foreground text-sm leading-relaxed max-w-2xl">
                            We accommodate limited bespoke commissions quarterly. Please reach out to our Concierge via the Contact portal to discuss your unique vision and join the private waitlist.
                        </p>
                    </details>

                    <details className="group border-b border-foreground/10 pb-6 outline-none marker:content-[''] cursor-pointer">
                        <summary className="font-standard text-xs md:text-sm uppercase tracking-widest cursor-pointer list-none flex justify-between items-center group-open:text-foreground/70 transition-colors">
                            What forms of payment do you secure?
                            <span className="transition-transform duration-300 group-open:-rotate-180">+</span>
                        </summary>
                        <p className="mt-8 text-muted-foreground text-sm leading-relaxed max-w-2xl">
                            We currently facilitate highly-encrypted secure transfers natively via all major luxury credit institutions (Visa, Mastercard, Amex), alongside Apple Pay natively inside the Checkout portal.
                        </p>
                    </details>
                </div>
            </div>
            <Footer />
        </main>
    );
}
