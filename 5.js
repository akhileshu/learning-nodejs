/*
learning model view controller,file structure
*/
require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const { Schema } = mongoose;
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const server = express();
console.log('env',process.env.DB_PASSWORD);

// db connection code
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/employes');
  console.log('db connected')

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



  

// body parser
server.use(express.json());

server.use('/products' , productRouter.router)
server.use('/users' , userRouter.router)

server.listen(process.env.PORT,()=>console.log('server started'));
