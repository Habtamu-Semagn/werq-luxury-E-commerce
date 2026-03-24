"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
    _id?: string;
    id?: string;
    name: string;
    price: number;
    category: string;
    images: string[];
}

export default function ProductCard(product: ProductCardProps) {
    const { _id, id, name, price, category, images } = product;
    const productId = _id || id || "";
    const imageUrl = images?.[0] || "";
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <div className="group block w-full space-y-4">
            <Link href={`/product/${productId}`} className="relative aspect-[4/5] block w-full overflow-hidden bg-muted">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
            </Link>
            <div className="flex flex-col space-y-2 text-center md:text-left">
                <div className="space-y-1">
                    <span className="text-muted-foreground uppercase tracking-widest text-[10px]">{category}</span>
                    <h3 className="font-luxury text-lg text-foreground tracking-wide">{name}</h3>
                    <p className="font-medium text-foreground text-sm">${price.toFixed(2)}</p>
                </div>
                <button
                    onClick={() => addToCart({ id: productId, name, price, imageUrl, category })}
                    className="w-full sm:w-auto border border-foreground/20 text-foreground py-2 md:px-6 uppercase tracking-widest text-[10px] hover:bg-foreground hover:text-background transition-colors duration-300"
                >
                    Add to Bag
                </button>
            </div>
        </div>
    );
}
