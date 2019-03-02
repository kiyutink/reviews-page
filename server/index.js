const express = require("express");
const fs = require("fs");
const app = express();

app.get("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  if (+req.path >= 4) {
    res.send(`
      {
        "reviews": [],
        "hasMore": false
      }
    `);
  }
  const pageData = fs.readFileSync(`./server/${req.path}.json`, {
    encoding: "utf-8"
  });
  setTimeout(() => {
    res.send(pageData);
  }, 500);
});

app.listen(8081);
