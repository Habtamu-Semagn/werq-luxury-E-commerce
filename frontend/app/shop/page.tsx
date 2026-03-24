"use client";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ProductCard from "@/components/product/ProductCard";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ShopContent() {
    const searchParams = useSearchParams();
    const categoryQuery = searchParams.get('category') || "all";

    interface Product { _id: string; name: string; price: number; category: string; images: string[] }
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                let url = "http://localhost:5000/api/products";
                if (categoryQuery !== "all") {
                    url += `?category=${categoryQuery}`;
                }
                const res = await fetch(url);
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [categoryQuery]);

    const categories = ["all", "leather", "watches", "apparel"];

    return (
        <div className="flex-1 container mx-auto px-4 py-32 flex flex-col md:flex-row gap-12">
            {/* Sidebar Filter */}
            <aside className="w-full md:w-64 shrink-0">
                <div className="sticky top-24">
                    <h2 className="font-luxury text-2xl mb-8">Collections</h2>
                    <ul className="flex md:flex-col gap-8 overflow-x-auto md:overflow-visible pb-4 md:pb-0 font-standard text-xs uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                        {categories.map((cat) => (
                            <li key={cat}>
                                <a
                                    href={`/shop${cat === "all" ? "" : "?category=" + cat}`}
                                    className={`hover:text-foreground transition-colors ${categoryQuery === cat ? "text-foreground font-bold border-b border-foreground md:border-none" : ""}`}
                                >
                                    {cat}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1 min-h-[50vh]">
                <h1 className="font-luxury text-4xl mb-12 tracking-wide capitalize">{categoryQuery === "all" ? "The Complete Catalog" : categoryQuery}</h1>

                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Curating Assortment...</span>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                price={product.price}
                                imageUrl={product.images[0] || "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80"}
                                category={product.category}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="h-64 flex flex-col items-center justify-center space-y-6 bg-muted/20 border border-foreground/5 p-8 text-center">
                        <span className="text-muted-foreground uppercase tracking-widest text-[10px] leading-relaxed max-w-sm">There are currently no pieces available capturing this aesthetic.</span>
                        <a href="/shop" className="border border-foreground px-8 py-3 uppercase tracking-widest text-[10px] hover:bg-foreground hover:text-background transition-colors">Clear Filters</a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <Suspense fallback={<div className="flex-1 py-32 flex items-center justify-center text-muted-foreground uppercase tracking-widest text-[10px]">Loading Elements...</div>}>
                <ShopContent />
            </Suspense>
            <Footer />
        </main>
    );
}
