// const http = require('http');
import { createServer } from "http";
import { readFileSync } from "fs";

let htmlPage = readFileSync("index.html", "utf-8");
const data = JSON.parse(readFileSync("data.json", "utf-8"));

// Create a local server
const server = createServer((req, res) => {
  console.log("requested");
  console.log(req.url);
  
//   this works when user updates url ex /products/1 ->show details of product 1
// ex /products/2 ->show details of product 2
  if (req.url.startsWith("/products")) {
    const productId = req.url.split("/")[2];
    console.log(productId);
    const product = data.products[productId];
   let modifiedPage = htmlPage
      .replace("**title**", product.title)
      .replace("**price**", product.price)
      .replace("**rating**", product.rating)
      .replace("**url**", product.thumbnail);

      res.setHeader("content-Type", "text/html");
      res.end(modifiedPage);
      return
  }
  switch (req.url) {
    case "/":
      res.setHeader("content-Type", "text/html");
      res.end(htmlPage);
      break;
    case "/json":
      res.setHeader("content-Type", "application/json");
      res.end(JSON.stringify(data)); // Send the JSON data
      break;
    default:
      res.writeHead(404, "nt found");
      res.end();
  }
});

server.listen(8000);
