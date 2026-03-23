import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import CategoryShowcase from "@/components/sections/CategoryShowcase";

export default function CollectionsPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 py-24">
                <header className="text-center mb-8 px-4">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Curated</p>
                    <h1 className="font-luxury text-4xl md:text-6xl tracking-wide">The Collections</h1>
                    <div className="w-12 h-[1px] bg-foreground/30 mx-auto mt-8"></div>
                </header>

                {/* Reusing our high-end Category Showcase module */}
                <CategoryShowcase />
            </div>

            <Footer />
        </main>
    );
}
