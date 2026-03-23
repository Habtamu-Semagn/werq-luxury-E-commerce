import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 py-32 container mx-auto px-4 max-w-5xl">
                <header className="text-center mb-32">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Maison</p>
                    <h1 className="font-luxury text-5xl md:text-7xl tracking-wide">The Archive of Less.</h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center mb-32">
                    <div className="relative aspect-[3/4] bg-muted w-full">
                        <Image src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80" alt="Editorial Fashion" fill unoptimized className="object-cover" />
                    </div>
                    <div className="space-y-8">
                        <h2 className="font-luxury text-3xl">Our Origins</h2>
                        <p className="text-muted-foreground leading-relaxed text-sm">Founded on the principle that true elegance is defined not by ornamentation, but by architecture and restraint. WERQ emerged as a counter-movement against maximalist consumption.</p>
                        <p className="text-muted-foreground leading-relaxed text-sm">Every silhouette we cast is an exhaustive study in reduction—trimming the noise until only the absolute, undeniable essence of the object remains.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center mb-32">
                    <div className="order-2 md:order-1 space-y-8">
                        <h2 className="font-luxury text-3xl">Uncompromising Craft</h2>
                        <p className="text-muted-foreground leading-relaxed text-sm">We source from the same generational mills and historic tanneries as legacy luxury houses, intentionally bypassing the traditional markup matrix.</p>
                        <p className="text-muted-foreground leading-relaxed text-sm">Sustainability is not a supplementary badge; it is the core metric by which we evaluate our material partners. By producing in fiercely controlled, limited batches, we eradicate deadstock waste entirely.</p>
                    </div>
                    <div className="order-1 md:order-2 relative aspect-[4/5] bg-muted w-full mt-16 md:mt-0">
                        <Image src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80" alt="Artisan detail" fill unoptimized className="object-cover" />
                    </div>
                </div>

                <div className="text-center py-24 border-t border-b border-foreground/10 bg-muted/5">
                    <h2 className="font-luxury text-4xl mb-6">Invest in Permanence.</h2>
                    <a href="/shop" className="inline-block mt-8 border border-foreground px-12 py-4 uppercase tracking-widest text-xs hover:bg-foreground hover:text-background transition-colors duration-500">View The Collection</a>
                </div>
            </div>

            <Footer />
        </main>
    );
}
