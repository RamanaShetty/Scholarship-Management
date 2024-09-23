const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const connection = require("./configuration/db.js");
const router = require("./controller/router.js");

const app = express();

app.use(bodyParser.json());
app.use(router);

app.get("/", (req, res) => {
  console.log("sdfkasdjkasdjlkasjdasjf");
});

connection.connect((err) => {
  if (err) {
    console.log("user: ", process.env.MYSQL_USER);
    console.log(err.message);
    return;
  }
  console.log("Database connection successfull");
  app.listen(process.env.PORT || 8080, () => {
    console.log(`App is listening on port ${process.env.PORT || 8080}`);
  });
});
