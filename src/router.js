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
};

const processLegalPrompt = (req, res) => {
  const { prompt } = req.body;
  const legalPrompt = `As a lawyer, provide a detailed response to the following legal inquiry: ${prompt}`;
  promptInput(legalPrompt, res); // Call promptInput with the modified prompt
};

const createApp = () => {
    // Create a new Express application.
    const app = express();
    app.use(log);
    app.use(bodyParser.json());
    app.get("/", serveHome);
    app.post('/submit', processLegalPrompt); // Updated route to use processLegalPrompt
    app.use(express.static("public"));
    return app;
};

module.exports = { createApp };
