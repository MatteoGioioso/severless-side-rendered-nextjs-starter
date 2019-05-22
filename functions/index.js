const functions = require("firebase-functions");
const express = require("express");
const mainPage = require("./next/serverless/pages/index");
const postPage = require("./next/serverless/pages/post");
const app = express();

app.get("/", (request, response) => {
  mainPage.render(request, response);
});

app.get("/post/:postId", (request, response) => {
  postPage.render(request, response);
});

exports.hirviblogapi = functions.https.onRequest(app);
