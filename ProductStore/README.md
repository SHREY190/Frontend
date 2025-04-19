# ProductStore

## Description
The **ProductStore** project is a web application that allows users to add and edit products in a store. Currently, **anyone** can add new products and edit existing ones. However, future updates will limit the ability to create and edit products to the store owner only. The products are displayed on a page in the frontend for users to view.

## Features
- **Add Products:** Anyone can add new products to the store.
- **Edit Products:** Anyone can edit existing products.
- **Frontend Display:** A page on the frontend where the list of products is shown.
- **Owner Access (Future):** The store owner will have exclusive permissions to create and edit products in the future.

## Technologies Used
- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework to build the backend API.
- **MongoDB**: Database to store product information.
- **Mongoose**: ODM for MongoDB to interact with the database.
- **dotenv**: To manage environment variables.

## Getting Started

To run the project locally, follow these steps:

1. **Clone the repo:**
   ```bash
   git clone https://github.com/SHREY190/ProductStore.git

2. Navigate to the project folder:
   cd ProductStore
   
3. Install backend dependencies:
   npm install
   
4. Start the server:
   npm run start
   
5. Navigate to the frontend folder and install dependencies:
   cd frontend
   npm install
   
6. Start the frontend server:
   npm run dev

##The backend server will be running on http://localhost:5000, and the frontend will be running on http://localhost:3000 by default.


TODO:
1. Implement Owner-only Access for adding and editing products (authentication and authorization).

2. Restrict Add Product, Delete Product and Edit Product functionality to the store owner.

3. Add Authentication to distinguish between owner and regular users.
