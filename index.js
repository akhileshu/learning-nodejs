// const http = require('http');
import { createServer } from "http";
import { readFileSync } from "fs";

const htmlPage = readFileSync("index.html", "utf-8");
const jsonData = readFileSync("data.json", "utf-8");

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
      res.end(jsonData);
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
