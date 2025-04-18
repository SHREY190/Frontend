import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // This is middleware that allows to accept JSON data in the req.body.

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server Started at http://localhost:" + PORT);
});
