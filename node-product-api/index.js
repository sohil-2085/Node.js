import express from "express";
import { readFile } from "fs/promises";

const app = express();

const getProducts = async () => {
  const data = await readFile("./data/product.json", "utf-8");
  return JSON.parse(data);
};

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/products", async (req, res) => {
  const products = await getProducts();
  res.json(products);
});

app.get("/product/:id", async (req, res) => {
  const products = await getProducts();
  const productId = Number(req.params.id);

  const product = products.find((p) => p.id === productId);

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
