import express from "express";

const productRoute = express.Router();

productRoute.get("/product");
productRoute.get("/product/get");
productRoute.post("/product/add");
productRoute.delete("/product/del");
productRoute.put("/product/edit");

export default productRoute;
