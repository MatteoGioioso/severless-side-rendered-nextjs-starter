const functions = require("firebase-functions");
const express = require("express");
const mainPage = require("./_next/serverless/pages/index");
const postPage = require("./_next/serverless/pages/post");
const app = express();
const path = require('path')

app.get("/", (request, response) => {
  mainPage.render(request, response);
});

app.get("/post/:postId", (request, response) => {
  postPage.render(request, response);
});

exports.hirviblogapi = functions.https.onRequest(app);
