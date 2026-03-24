"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { getProducts, createProduct, deleteProduct } from "@/lib/api";

import { X } from "lucide-react";

type Product = { _id: string; name: string; price: number; category: string; stock: number; description?: string; images?: string[] };

export default function AdminProducts() {
    const { userInfo } = useAuthStore();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "leather",
        stock: "",
        imageUrl: ""
    });

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(Array.isArray(data) ? data : []);
        } catch { /* silent */ } finally { setLoading(false); }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const deleteHandler = async (id: string) => {
        if (!window.confirm("Permanently remove this product from the catalog?")) return;
        if (!userInfo?.token) return;
        try {
            await deleteProduct(id, userInfo.token);
            fetchProducts();
        } catch { /* silent */ }
    };

    const createHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInfo?.token) return;

        try {
            setFormLoading(true);
            const productData = {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                images: formData.imageUrl ? [formData.imageUrl] : undefined
            };
            await createProduct(userInfo.token, productData);
            setIsModalOpen(false);
            setFormData({ name: "", description: "", price: "", category: "leather", stock: "", imageUrl: "" });
            fetchProducts();
        } catch (err: any) {
            alert(err.message || "Failed to create artifact");
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <main className="p-8 max-w-6xl mx-auto w-full relative">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-luxury text-3xl tracking-wide">Catalog Vault</h1>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                        {products.length} artifact{products.length !== 1 ? "s" : ""} indexed
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-[10px] uppercase tracking-widest hover:bg-foreground/80 transition-colors rounded-sm"
                >
                    <Plus className="w-3.5 h-3.5" />
                    New Artifact
                </button>
            </div>

            <Separator className="mb-8 opacity-20" />

            {/* Create Artifact Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="relative bg-background border border-foreground/10 p-8 w-full max-w-lg shadow-2xl space-y-8 animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center justify-between">
                            <h2 className="font-luxury text-2xl tracking-wide">New Catalog Entry</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={createHandler} className="grid grid-cols-2 gap-6">
                            <div className="col-span-2 space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Artifact Name</label>
                                <input
                                    required
                                    className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors text-sm"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="col-span-2 space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Description</label>
                                <textarea
                                    className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors text-sm min-h-[80px] resize-none"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Price (USD)</label>
                                <input
                                    required
                                    type="number"
                                    className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors text-sm"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Initial Stock</label>
                                <input
                                    required
                                    type="number"
                                    className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors text-sm"
                                    value={formData.stock}
                                    onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Category</label>
                                <select
                                    className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors text-sm uppercase tracking-widest appearance-none"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="leather" className="bg-background">Leather</option>
                                    <option value="watches" className="bg-background">Watches</option>
                                    <option value="apparel" className="bg-background">Apparel</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Image URL</label>
                                <input
                                    className="w-full bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors text-sm"
                                    placeholder="https://..."
                                    value={formData.imageUrl}
                                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                />
                            </div>

                            <div className="col-span-2 pt-4">
                                <button
                                    disabled={formLoading}
                                    type="submit"
                                    className="w-full bg-foreground text-background py-4 uppercase tracking-widest text-[10px] hover:bg-foreground/90 transition-colors disabled:opacity-50"
                                >
                                    {formLoading ? "Inscribing..." : "Add to Catalog"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
