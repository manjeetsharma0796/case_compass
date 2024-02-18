const express = require("express");
const path = require('path');
const { promptInput } = require("./gemini");
const bodyParser = require("body-parser");

const ROOT_DIR = path.resolve();

const serveHome = (req, res) => {
  const filePath = `${ROOT_DIR}/public/index.html`;
  res.sendFile(filePath);
};

const log = (req, res, next) => {
  console.log(req.path);
  next();
}

const createApp = () => {
    // Create a new Express application.
    const app = express();
    app.use(log);
    app.use(bodyParser.json());
    app.get("/", serveHome);
    app.post('/submit', promptInput);
    app.use(express.static("public"));
    return app;
}

module.exports = {createApp};