import ProductCard from "./ProductCard";

// Using the provided placeholder URL for mock data
const MOCK_PRODUCTS = [
    {
        id: "1",
        name: "The Classic Tote",
        price: 350,
        category: "Bags",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80"
    },
    {
        id: "2",
        name: "Minimalist Briefcase",
        price: 450,
        category: "Bags",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80"
    },
    {
        id: "3",
        name: "Structured Handbag",
        price: 320,
        category: "Handbags",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80"
    },
    {
        id: "4",
        name: "Leather Messenger",
        price: 380,
        category: "Bags",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80"
    }
];

export default function ProductGrid() {
    return (
        <section className="py-24 px-4 md:px-8 container mx-auto bg-background">
            <div className="flex flex-col items-center mb-16 space-y-4">
                <h2 className="font-luxury text-4xl text-foreground tracking-wide">Featured Collection</h2>
                <div className="w-12 h-[1px] bg-foreground/30"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {MOCK_PRODUCTS.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </section>
    );
}
