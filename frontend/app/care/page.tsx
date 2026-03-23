import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function CarePage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 py-32 container mx-auto px-4 max-w-5xl">
                <header className="text-center mb-32">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Maintenance</p>
                    <h1 className="font-luxury text-4xl md:text-6xl tracking-wide">Product Care</h1>
                    <div className="w-12 h-[1px] bg-foreground/30 mx-auto mt-8"></div>
                </header>

                <div className="space-y-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                        <div className="space-y-8">
                            <h2 className="font-luxury text-3xl">Leather Goods</h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Our leathers are intentionally untreated with synthetic sealants, allowing them to patrol a natural, highly-individualized evolving patina over their lifetime.
                            </p>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                We advise strictly avoiding direct, prolonged exposure to harsh sunlight, intense heat, and excessive moisture. Should your artifact encounter water, blot immediately with a soft, pristine lint-free cloth and allow it to air dry naturally.
                            </p>
                        </div>
                        <div className="space-y-8">
                            <h2 className="font-luxury text-3xl">Cashmere & Silk</h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Due to the highly delicate structural integrity of these natural fibers, we strictly enforce professional dry cleaning exclusively. Hand-washing or synthetic detergents will shatter the micro-fibers.
                            </p>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Store knits folded securely flat to prevent stretching or distortion, firmly avoiding hanging. Silk garments should be stored strictly in breathable cotton garment bags suspended in a cool, dark environment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
