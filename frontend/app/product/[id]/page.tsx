"use client";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState, use } from "react";
import Image from "next/image";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    type ProductData = { _id: string; name: string; price: number; category: string; description: string; images: string[]; message?: string };
    const [product, setProduct] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState(true);

    const addToCart = useCartStore((state) => state.addToCart);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`http://localhost:5000/api/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <main className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center uppercase tracking-widest text-xs text-muted-foreground">
                    Retrieving Artifact...
                </div>
            </main>
        );
    }

    if (!product || product.message) {
        return (
            <main className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center uppercase tracking-widest text-xs text-muted-foreground">
                    Artifact Not Found.
                </div>
            </main>
        );
    }

    const defaultImage = "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80";
    const imageUrl = product.images?.[0] || defaultImage;

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 flex flex-col lg:flex-row">
                {/* Left Immersive Image Pane */}
                <div className="w-full lg:w-1/2 aspect-square lg:aspect-auto lg:h-[calc(100vh-80px)] relative bg-muted sticky top-20">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover object-center"
                    />
                </div>

                {/* Right Scrolling Information Pane */}
                <div className="w-full lg:w-1/2 px-6 py-16 lg:px-24 xl:px-32 flex flex-col justify-center min-h-[calc(100vh-80px)]">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">{product.category}</p>
                    <h1 className="font-luxury text-4xl md:text-5xl lg:text-6xl tracking-wide mb-6">{product.name}</h1>
                    <p className="text-xl mb-12">${product.price.toFixed(2)}</p>

                    <button
                        onClick={() => addToCart({ id: product._id, name: product.name, price: product.price, imageUrl, category: product.category })}
                        className="w-full border border-foreground bg-foreground text-background py-5 uppercase tracking-widest text-[10px] hover:bg-transparent hover:text-foreground transition-all duration-300 mb-16"
                    >
                        Add To Bag
                    </button>

                    <div className="space-y-12">
                        <section>
                            <h3 className="font-standard text-xs uppercase tracking-widest mb-4 border-b border-foreground/10 pb-2">Description</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">{product.description || "A masterclass in restraint. This piece embodies the absolute core of our luxury philosophy, forged from uncompromising materials."}</p>
                        </section>

                        <section>
                            <h3 className="font-standard text-xs uppercase tracking-widest mb-4 border-b border-foreground/10 pb-2">Details & Care</h3>
                            <ul className="text-muted-foreground leading-relaxed text-[11px] uppercase tracking-widest space-y-2 list-disc list-inside">
                                <li>Sustainably sourced premium materials</li>
                                <li>Crafted meticulously by master artisans</li>
                                <li>Avoid prolonged exposure to direct elements</li>
                                <li>Professional conservation recommended</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
