const fs = require("fs");
const path=require('path')

const users = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../data.json"), "utf-8")).users;


exports.getAllusers = (req, res) => {
    res.json(users);
  };
  exports.getuser = (req, res) => {
    const id = +req.params.id;
    // user -> object
    const user = users.find((user) => user.id == id);
    res.json(user);
  };
  exports.replaceuser = (req, res) => {
    const id = +req.params.id;
    const userIndex = users.findIndex((user) => user.id === id);
    users.splice(userIndex, 1, { id, ...req.body });
    res.status(201).json();
  };
  exports.updateuser = (req, res) => {
    const id = +req.params.id;
    const userIndex = users.findIndex((user) => user.id === id);
    const user = users[userIndex];
    users.splice(userIndex, 1, { ...user, ...req.body });
    res.status(201).json();
  };
  exports.deleteuser = (req, res) => {
    const id = +req.params.id;
    const userIndex = users.findIndex((user) => user.id === id);
    const user = users[userIndex];
    users.splice(userIndex, 1);
    res.status(201).json(user);
  };
  exports.createuser = (req, res) => {
    // data form client
    console.log(req.body);
    users.push(req.body);
    res.status(201).json(req.body);
  };