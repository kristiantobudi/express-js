/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
import { Router } from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controller/product.controller";

export const ProductRouter: Router = Router();

ProductRouter.post("/", createProduct);
ProductRouter.get("/", getProduct);
ProductRouter.get("/:id", getProduct);
ProductRouter.put("/:id", updateProduct)
ProductRouter.delete("/:id", deleteProduct)