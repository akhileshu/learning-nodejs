/*
learning model view controller,file structure
*/
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// middleware for cross conection
const cors = require("cors");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const server = express();
const path =require('path')
console.log("env", process.env.DB_PASSWORD);

// db connection code
main().catch((err) => console.log(err));

async function main() {
  // await mongoose.connect("mongodb://127.0.0.1:27017/employes");
  await mongoose.connect(process.env.MONGO_URL);
  console.log("db connected");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// body parser
server.use(express.json());
server.use(cors());
server.use(express.static(process.env.PUBLIC_DIR))
server.use("/products", productRouter.router);
server.use("/users", userRouter.router);
server.use('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'build','index.html'))
})

server.listen(process.env.PORT, () => console.log("server started"));
