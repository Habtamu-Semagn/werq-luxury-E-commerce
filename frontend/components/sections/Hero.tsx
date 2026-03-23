import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80"
                    alt="High fashion model in studio lighting"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
                {/* Subtle overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
                <h1 className="font-luxury text-5xl md:text-7xl lg:text-8xl text-accent mb-8 drop-shadow-sm tracking-wide">
                    THE NEW COLLECTION
                </h1>
                <Link
                    href="/shop"
                    className="inline-flex items-center justify-center border border-white/60 text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500 ease-in-out backdrop-blur-sm"
                >
                    Shop Now
                </Link>
            </div>
        </section>
    );
}
