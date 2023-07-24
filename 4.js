/*
learning rest apis - Representational State Transfer Application Programming Interface. It is a type of web API (Application Programming Interface) that follows the principles of the REST architectural style
*/
const fs = require("fs");
const express = require("express");
const server = express();

// body parser
server.use(express.json());
const products = JSON.parse(fs.readFileSync("data.json", "utf-8")).products;

// products -> array
// api root,base url ex->www.google.com/

// create post  /products   C R U D
server.post("/products", (req, res) => {
  // data form client
  console.log(req.body);
  products.push(req.body);
  res.status(201).json(req.body);
});

// read get  /products
server.get("/products", (req, res) => {
  res.json(products);
});
// read get  /products/:id
server.get("/products/:id", (req, res) => {
  const id = +req.params.id;
  // product -> object
  const product = products.find((product) => product.id == id);
  res.json(product);
});

// update put  /products:id
server.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  // const updatedProduct = req.body
  // const updatedProducts = products.map((product) => product.id == id ? updatedProduct : product);
  const productIndex = products.findIndex((product) => product.id === id);
  products.splice(productIndex, 1, { id, ...req.body });

  res.status(201).json();
});

//   dont overwrite just update required fields
server.patch("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((product) => product.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1, { ...product, ...req.body });
  res.status(201).json();
});

// delete /products/:id
server.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((product) => product.id === id);
  const product = products[productIndex]
  products.splice(productIndex, 1);
  res.status(201).json(product);
});

server.listen(8080);
