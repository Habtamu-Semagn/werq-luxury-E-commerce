import Navbar from "@/components/sections/Navbar";
import CheckoutPage from "./CheckoutPage";

export default function Checkout() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <CheckoutPage />
        </main>
    );
}
