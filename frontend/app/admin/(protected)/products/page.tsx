"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, Plus, Trash2, ExternalLink, Pencil } from "lucide-react";
import { getProducts, createProduct, deleteProduct, updateProduct } from "@/lib/api";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";

type Product = { _id: string; name: string; price: number; category: string; stock: number; description?: string; images?: string[] };

export default function AdminProducts() {
    const { userInfo } = useAuthStore();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Deletion State
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
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

    const deleteHandler = async () => {
        if (!deleteId || !userInfo?.token) return;
        try {
            await deleteProduct(deleteId, userInfo.token);
            setIsDeleteOpen(false);
            setDeleteId(null);
            fetchProducts();
        } catch { /* silent */ }
    };

    const editHandler = (product: Product) => {
        setFormData({
            name: product.name,
            description: product.description || "",
            price: product.price.toString(),
            category: product.category,
            stock: product.stock.toString(),
            imageUrl: product.images?.[0] || ""
        });
        setEditingId(product._id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ name: "", description: "", price: "", category: "leather", stock: "", imageUrl: "" });
    };

    const submitHandler = async (e: React.FormEvent) => {
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

            if (editingId) {
                await updateProduct(editingId, userInfo.token, productData);
            } else {
                await createProduct(userInfo.token, productData);
            }

            closeModal();
            fetchProducts();
        } catch (err: any) {
            alert(err.message || "Failed to process artifact");
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <TooltipProvider>
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

                {/* Create/Edit Artifact Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                            onClick={closeModal}
                        />
                        <div className="relative bg-background border border-foreground/10 p-8 w-full max-w-lg shadow-2xl space-y-8 animate-in fade-in zoom-in duration-300">
                            <div className="flex items-center justify-between">
                                <h2 className="font-luxury text-2xl tracking-wide">{editingId ? "Edit Artifact" : "New Catalog Entry"}</h2>
                                <button onClick={closeModal} className="text-muted-foreground hover:text-foreground transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={submitHandler} className="grid grid-cols-2 gap-6">
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
                                        {formLoading ? "Inscribing..." : (editingId ? "Update Artifact" : "Add to Catalog")}
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
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        onClick={() => router.push(`/product/${product._id}`)}
                                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                                    >
                                                        <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent className="text-[10px] uppercase tracking-widest bg-foreground text-background">
                                                    View Artifact
                                                </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        onClick={() => editHandler(product)}
                                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                                    >
                                                        <Pencil className="w-4 h-4" strokeWidth={1.5} />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent className="text-[10px] uppercase tracking-widest bg-foreground text-background">
                                                    Amend Metadata
                                                </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        onClick={() => {
                                                            setDeleteId(product._id);
                                                            setIsDeleteOpen(true);
                                                        }}
                                                        className="text-muted-foreground hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent className="text-[10px] uppercase tracking-widest bg-red-500 text-white">
                                                    Purge Artifact
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                {/* Deletion Confirmation Alert Dialog */}
                <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <AlertDialogContent className="bg-background border-foreground/10 text-foreground">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-xl tracking-wide uppercase">Purge Catalog Entry?</AlertDialogTitle>
                            <AlertDialogDescription className="text-muted-foreground text-xs uppercase tracking-widest leading-relaxed">
                                This action is permanent. The artifact will be scrubbed from the vault and cannot be recovered.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-8 gap-4">
                            <AlertDialogCancel className="border-foreground/20 text-foreground uppercase tracking-widest text-[10px] hover:bg-muted font-normal">
                                Preserve
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={deleteHandler}
                                className="bg-red-500 text-white hover:bg-red-600 uppercase tracking-widest text-[10px] font-normal border-none"
                            >
                                Purge
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </main>
        </TooltipProvider>
    );
}
