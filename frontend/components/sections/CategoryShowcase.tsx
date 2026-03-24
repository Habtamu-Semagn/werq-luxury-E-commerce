import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
    {
        title: "Leather Goods",
        href: "/shop?category=leather",
        imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80"
    },
    {
        title: "Timeless Timepieces",
        href: "/shop?category=watches",
        imageUrl: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80"
    },
    {
        title: "Cashmere & Silk",
        href: "/shop?category=apparel",
        imageUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80"
    }
];

export default function CategoryShowcase() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {CATEGORIES.map((cat, idx) => (
                        <Link key={idx} href={cat.href} className="group relative block aspect-[3/4] overflow-hidden bg-muted">
                            <Image
                                src={cat.imageUrl}
                                alt={cat.title}
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                                <h3 className="text-white font-luxury text-2xl md:text-3xl tracking-wide opacity-90 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-500">
                                    {cat.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
