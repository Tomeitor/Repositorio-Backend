console.log("hola");

const express = require("express");
const app = express();
const port = 8080;

const ProductManager = require("./2-desafio.js");

const productManager = new ProductManager();

app.get("/products", (req, res) => {
  const limit = req.query.limit;

  let products = productManager.getProducts();

  if (limit) {
    products = products.slice(0, parseInt(limit));
  }

  res.json(products);
});

app.get("/products/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);

  res.json(product);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
