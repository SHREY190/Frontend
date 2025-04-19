import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProducts: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const response = await res.json();
    set((state) => ({ products: [...state.products, response.data] }));
    return { success: true, message: "Product created successfuly." };
  },
  fetchProducts: async () => {
    const res = await fetch("api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    set((state) => ({ products: response.data }));
    return { success: true, message: "Products Fetched" };
  },
}));
