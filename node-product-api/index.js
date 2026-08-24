import express from "express";
import { readFile } from "fs/promises";
import { getProducts, getProductById } from "./module/product.js";

const app = express();

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/products", async (req, res) => {
  const products = await getProducts();
  res.json(products);
});

app.get("/product/:id", async (req, res) => {
  const productId = Number(req.params.id);
  const product = await getProductById(productId);

  if (!product) {
    return res.status(404).json({
      message: "Page not found",
    });
  }

  res.json(product);
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(3000, () => {
  console.log("server is running on localhost 3000");
});
