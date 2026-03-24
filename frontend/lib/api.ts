const BASE_URL = "http://localhost:5000/api";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(error.message || "API request failed");
    }

    return res.json();
}

export const getProducts = (category?: string) =>
    apiFetch(`/products${category && category !== "all" ? `?category=${category}` : ""}`);

export const getProductById = (id: string) =>
    apiFetch(`/products/${id}`);

export const createOrder = (orderData: any) =>
    apiFetch("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
    });

export const getOrders = (token: string) =>
    apiFetch("/orders", {
        headers: { Authorization: `Bearer ${token}` },
    });

export const updateOrderStatus = (id: string, status: string, token: string) =>
    apiFetch(`/orders/${id}/status`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
    });

export const createProduct = (token: string, productData?: any) =>
    apiFetch("/products", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: productData ? JSON.stringify(productData) : undefined,
    });

export const deleteProduct = (id: string, token: string) =>
    apiFetch(`/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
