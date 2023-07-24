const fs = require("fs");
const express = require("express");
// 3 rd party midleware - logger
const morgan = require("morgan");

let htmlPage = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// server created
const server = express();
// code for server

server.use(morgan("dev")); //GET /public.html 304 3.294 ms - -
server.use(morgan("default")); //::1 - - [Mon, 24 Jul 2023 00:59:17 GMT] "GET /public.html HTTP/1.1" 304 - "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"

// midleware - logger
// server.use((req, res, next) => {
//   console.log(req.method, req.ip, req.hostname, new Date());
//   // GET ::1 localhost 2023-07-23T14:38:07.206Z
//   next();
// });
// body parser
server.use(express.json());

// for static hosting
server.use(express.static("public"));

const auth = (req, res, next) => {
  // http://localhost:8080/?password=123->req.query
  // if (req.body.password == 123) {
    next();
  // } else res.sendStatus(401);
};

// auth -middleware applies to whole server ,not to be done like this
// server.use(auth)

// api -endpoint -route
// testing in postman
server.post("/", auth, (req, res) => {
  res.json({ type: "POST" });
});
server.delete("/", (req, res) => {
  res.json({ type: "delete" });
});
server.put("/", (req, res) => {
  res.json({ type: "put" });
});
server.patch("/", (req, res) => {
  res.json({ type: "patch" });
});

server.get("/product/:id", auth, (req, res) => {
  // id is dynamic
  console.log(req.params)//{ id: '6' }
  res.send("hello");
  //     Send a response.

  // Examples:

  // res.send({ some: 'json' });
  // res.send('<p>some html</p>');
  // res.status(404).send('Sorry, cant find that');
  // res.sendFile("C:/Users/akhilesh upadhyay/Pictures/Screenshots/Screenshot (45).png")
  // res.sendStatus(404)
  // res.sendStatus(201).send('<h1>hello</h1>')
});

// listen server
server.listen(8080);
// 3 ways to send data from clint to  server
// query parameters , body , url parameters

