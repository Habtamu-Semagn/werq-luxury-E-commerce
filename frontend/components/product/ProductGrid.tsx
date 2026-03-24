"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/api";

export default function ProductGrid() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="py-24 px-4 md:px-8 container mx-auto bg-background">
            <div className="flex flex-col items-center mb-16 space-y-4">
                <h2 className="font-luxury text-4xl text-foreground tracking-wide">Featured Collection</h2>
                <div className="w-12 h-[1px] bg-foreground/30"></div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64 text-sm uppercase tracking-widest text-muted-foreground animate-pulse">
                    Retrieving artifacts...
                </div>
            ) : error ? (
                <div className="flex justify-center items-center h-64 text-sm text-red-500 uppercase tracking-widest">
                    {error}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 text-foreground">
                    {products.length === 0 ? (
                        <div className="col-span-full text-center text-muted-foreground uppercase tracking-widest py-20 grayscale opacity-60 font-standard text-xs">
                            No artifacts present in the vault at this time.
                        </div>
                    ) : (
                        products.map((product) => (
                            <ProductCard key={product._id} {...product} />
                        ))
                    )}
                </div>
            )}
        </section>
    );
}
