import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

app.use(express.json()); // This is middleware that allows to accept JSON data in the req.body.

app.use("/api/products", productRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server Started at http://localhost:5000");
});
