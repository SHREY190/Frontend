import express from "express";
import {
  createProducts,
  deleteProducts,
  getProducts,
  updateProducts,
} from "../controller/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProducts);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProducts);

export default router;
