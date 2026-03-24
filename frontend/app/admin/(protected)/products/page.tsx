"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, ExternalLink } from "lucide-react";

type Product = { _id: string; name: string; price: number; category: string; stock: number };

export default function AdminProducts() {
    const { userInfo } = useAuthStore();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/api/products");
            const data = await res.json();
            setProducts(Array.isArray(data) ? data : []);
        } catch { /* silent */ } finally { setLoading(false); }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const deleteHandler = async (id: string) => {
        if (!window.confirm("Permanently remove this product from the catalog?")) return;
        try {
            await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${userInfo?.token}` }
            });
            fetchProducts();
        } catch { /* silent */ }
    };

    const createHandler = async () => {
        try {
            await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: { Authorization: `Bearer ${userInfo?.token}` }
            });
            fetchProducts();
        } catch { /* silent */ }
    };

    return (
        <main className="p-8 max-w-6xl mx-auto w-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-luxury text-3xl tracking-wide">Catalog Vault</h1>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                        {products.length} artifact{products.length !== 1 ? "s" : ""} indexed
                    </p>
                </div>
                <button
                    onClick={createHandler}
                    className="flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-[10px] uppercase tracking-widest hover:bg-foreground/80 transition-colors rounded-sm"
                >
                    <Plus className="w-3.5 h-3.5" />
                    New Artifact
                </button>
            </div>

            <Separator className="mb-8 opacity-20" />

            {loading ? (
                <div className="flex items-center justify-center h-48 text-xs uppercase tracking-widest text-muted-foreground">
                    Loading catalog...
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow className="border-foreground/10">
                            <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Name</TableHead>
                            <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Category</TableHead>
                            <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Price</TableHead>
                            <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Stock</TableHead>
                            <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-normal text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-xs text-muted-foreground py-12 uppercase tracking-widest">
                                    No products found. Create one above.
                                </TableCell>
                            </TableRow>
                        ) : products.map(product => (
                            <TableRow key={product._id} className="border-foreground/5 hover:bg-muted/20 transition-colors">
                                <TableCell className="font-medium text-sm">{product.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="text-[9px] uppercase tracking-widest border-foreground/15">
                                        {product.category}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm">${product.price.toFixed(2)}</TableCell>
                                <TableCell>
                                    <span className={`text-xs font-medium ${product.stock === 0 ? "text-red-400" : "text-green-400"}`}>
                                        {product.stock === 0 ? "Out of stock" : `${product.stock} units`}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button
                                            onClick={() => router.push(`/product/${product._id}`)}
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                            title="View on storefront"
                                        >
                                            <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                                        </button>
                                        <button
                                            onClick={() => deleteHandler(product._id)}
                                            className="text-muted-foreground hover:text-red-500 transition-colors"
                                            title="Delete product"
                                        >
                                            <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </main>
    );
}
