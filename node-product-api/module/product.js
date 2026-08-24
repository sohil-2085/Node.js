import { readFile } from "fs";

const getProducts = async () => {
  const data = await readFile("./data/product.json", "utf-8");
  return JSON.parse(data);
};

const getProductById = async (id) => {
  const products = await getProducts();

  const product = products.find((p) => p.id === id);
  return JSON.parse(product);
};

export {getProducts, getProductById}