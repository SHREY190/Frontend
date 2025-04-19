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
    const res = await fetch("/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    set({ products: response.data });
    return { success: true, message: "Products Fetched" };
  },
  deleteProducts: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    const response = await res.json();
    if (!response.success) {
      return { success: false, message: response.message };
    }

    // Update the ui immediately, without needing a refresh
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: response.message };
  },
}));
