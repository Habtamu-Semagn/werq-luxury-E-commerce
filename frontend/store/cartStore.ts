import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    category: string;
}

interface CartState {
    cart: CartItem[];
    isCartOpen: boolean;
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    setCartOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            isCartOpen: false,
            addToCart: (item) =>
                set((state) => {
                    const existing = state.cart.find((i) => i.id === item.id);
                    if (existing) {
                        return {
                            cart: state.cart.map((i) =>
                                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                            ),
                            isCartOpen: true,
                        };
                    }
                    return { cart: [...state.cart, { ...item, quantity: 1 }], isCartOpen: true };
                }),
            removeFromCart: (id) =>
                set((state) => ({
                    cart: state.cart.filter((i) => i.id !== id),
                })),
            updateQuantity: (id, quantity) =>
                set((state) => ({
                    cart: state.cart.map((i) =>
                        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
                    ),
                })),
            clearCart: () => set({ cart: [] }),
            toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
            setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
        }),
        {
            name: "werq-cart-storage",
            partialize: (state) => ({ cart: state.cart }),
        }
    )
);
