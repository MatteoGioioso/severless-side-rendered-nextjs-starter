// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const express = require("express");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const path = require("path");
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(express.static(path.join(__dirname, "/static")));

  server.get("/", (req, res) => {
    return app.render(req, res, "/", req.query);
  });

  server.get("/post/:postId", (req, res) => {
    return app.render(req, res, "/post", { postId: req.params.id });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
