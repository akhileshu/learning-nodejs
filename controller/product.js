const fs = require("fs");
const products = JSON.parse(fs.readFileSync("data.json", "utf-8")).products;


exports.getAllProducts = (req, res) => {
    res.json(products);
  };
  exports.getProduct = (req, res) => {
    const id = +req.params.id;
    // product -> object
    const product = products.find((product) => product.id == id);
    res.json(product);
  };
  exports.replaceProduct = (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex((product) => product.id === id);
    products.splice(productIndex, 1, { id, ...req.body });
    res.status(201).json();
  };
  exports.updateProduct = (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex((product) => product.id === id);
    const product = products[productIndex];
    products.splice(productIndex, 1, { ...product, ...req.body });
    res.status(201).json();
  };
  exports.deleteProduct = (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex((product) => product.id === id);
    const product = products[productIndex];
    products.splice(productIndex, 1);
    res.status(201).json(product);
  };
  exports.createProduct = (req, res) => {
    // data form client
    console.log(req.body);
    products.push(req.body);
    res.status(201).json(req.body);
  };