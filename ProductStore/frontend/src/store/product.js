import { create } from "zustand";

// Zustand store for managing product data and operations
export const useProductStore = create((set) => ({
  // State: array to hold all products
  products: [],

  // Function to directly set the products array
  setProducts: (products) => set({ products }),

  // Create a new product
  createProducts: async (newProduct) => {
    // Validate input fields
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }

    // Send POST request to backend
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const response = await res.json();

    // Update store with newly created product
    set((state) => ({ products: [...state.products, response.data] }));

    return { success: true, message: "Product created successfully." };
  },

  // Fetch all products from the server
  fetchProducts: async () => {
    const res = await fetch("/api/products", {
      method: "GET",
    });
    const response = await res.json();

    // Set the fetched products in the store
    set({ products: response.data });

    return { success: true, message: "Products fetched" };
  },

  // Delete a product by its ID
  deleteProducts: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const response = await res.json();

    if (!response.success) {
      return { success: false, message: response.message };
    }

    // Remove the product from the store immediately
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));

    return { success: true, message: response.message };
  },

  // Update a product by its ID
  updateProducts: async (pid, updatedProduct) => {
    // Validate input fields
    if (
      !updatedProduct.name ||
      !updatedProduct.price ||
      !updatedProduct.image
    ) {
      return { success: false, message: "Please fill in all fields." };
    }

    // Send PUT request to update the product
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    const response = await res.json();

    if (!response.success) {
      return { success: response.success, message: response.message };
    }

    // Update the product in the local store immediately
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? response.data : product
      ),
    }));

    return { success: true, message: response.message };
  },
}));
