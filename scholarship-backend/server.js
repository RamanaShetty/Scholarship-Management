const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const connection = require("./configuration/db.js");
const router = require("./controller/router.js");
const scheduleScholarshipStatusUpdate = require("./schedulers/scholarship.schedular.js");

const app = express();

app.use(bodyParser.json());
app.use(router);

// scheduleScholarshipStatusUpdate();

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
