/*
learning model view controller,file structure
*/
const express = require("express");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const server = express();

// body parser
server.use(express.json());

server.use('/products' , productRouter.router)
server.use('/users' , userRouter.router)

server.listen(8080);
