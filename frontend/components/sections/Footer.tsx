import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-background pt-24 pb-12 text-center md:text-left">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="md:col-span-1">
                    <Link href="/" className="font-luxury text-3xl tracking-widest text-foreground inline-block mb-6">WERQ</Link>
                    <p className="text-muted-foreground text-[10px] uppercase tracking-widest leading-loose max-w-xs mx-auto md:mx-0">
                        Redefining luxury through the lens of uncompromising minimalism.
                    </p>
                </div>

                <div>
                    <h4 className="font-luxury text-lg mb-6">Collections</h4>
                    <ul className="space-y-4 text-[10px] uppercase tracking-widest text-muted-foreground">
                        <li><Link href="/shop" className="hover:text-foreground transition-colors">All Products</Link></li>
                        <li><Link href="/shop?category=leather" className="hover:text-foreground transition-colors">Leather Goods</Link></li>
                        <li><Link href="/shop?category=watches" className="hover:text-foreground transition-colors">Timepieces</Link></li>
                        <li><Link href="/shop?category=apparel" className="hover:text-foreground transition-colors">Apparel</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-luxury text-lg mb-6">Customer Care</h4>
                    <ul className="space-y-4 text-[10px] uppercase tracking-widest text-muted-foreground">
                        <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
                        <li><Link href="/shipping" className="hover:text-foreground transition-colors">Shipping & Returns</Link></li>
                        <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
                        <li><Link href="/care" className="hover:text-foreground transition-colors">Product Care</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-luxury text-lg mb-6">Social</h4>
                    <ul className="space-y-4 text-[10px] uppercase tracking-widest text-muted-foreground">
                        <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
                        <li><a href="#" className="hover:text-foreground transition-colors">Pinterest</a></li>
                        <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-6 border-t border-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} WERQ. All Rights Reserved.</p>
                <div className="space-x-4 mt-4 md:mt-0">
                    <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
