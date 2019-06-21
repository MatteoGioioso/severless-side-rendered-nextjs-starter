const functions = require("firebase-functions");
const express = require("express");
const helmet = require("helmet");
const mainPage = require("./_next/serverless/pages/index");
const postPage = require("./_next/serverless/pages/post");
const app = express();

app.use(helmet());

app.get("/", (request, response) => {
  mainPage.render(request, response);
});

app.get("/post/:id", (request, response) => {
  postPage.render(request, response);
});

exports.api = functions.https.onRequest(app);
