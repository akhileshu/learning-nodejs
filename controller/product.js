const {Product} = require("../model/product");
// const Product = model.Product;

exports.getAllProducts = async(req, res) => {
  const products =await Product.find(/*{price:{$gt:600}}*/);
  res.json(products);
};
exports.getProduct = async(req, res) => {
  const id = req.params.id;
  // product -> object
  const product =await Product.findById(id);
  res.json(product);
};
exports.replaceProduct = async(req, res) => {
  const id = req.params.id;
  try{
    const doc =await Product.findOneAndReplace({_id:id},req.body,{new:true})
    res.status(201).json(doc);

  }catch(error){
console.log(error)
res.status(400).json(error);
  }
};
exports.updateProduct = async(req, res) => {
  const id = req.params.id;
  try{
    const doc =await Product.findOneAndUpdate({_id:id},req.body,{new:true})
    res.status(201).json(doc);

  }catch(error){
console.log(error)
res.status(400).json(error);
  }
};
exports.deleteProduct = async(req, res) => {
  const id = req.params.id;
  try{
    const doc =await Product.findOneAndDelete({_id:id})
    res.status(201).json(doc);

  }catch(error){
console.log(error)
res.status(400).json(error);
  }
};
exports.createProduct = async(req, res) => {
  // data form client
  // const product = new Product({ title: "phonex pro", rating: 5 });

  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};
