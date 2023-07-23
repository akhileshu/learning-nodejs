// const http = require('http');
import { createServer } from "http";
import { readFileSync } from "fs";

let htmlPage = readFileSync("index.html", "utf-8");
const data = JSON.parse(readFileSync("data.json", "utf-8"));
const product=data.products[0]

// dynamic html 
  htmlPage=htmlPage.replace('**title**',product.title).replace('**price**',product.price).replace('**rating**',product.rating).replace('**url**',product.thumbnail)


// Create a local server
const server = createServer((req, res) => {
  console.log("requested");
  console.log(req.url);
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
  // res.setHeader("content-Type", "text/html");
  // res.setHeader('content-Type','application/json')
  // res.end(jsonData);
});

server.listen(8000);
