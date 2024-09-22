const express = require("express");
require("dotenv").config();

const app = express();

app.listen(process.env.PORT || 8080, () => {
  console.log(`App is listening on port ${process.env.PORT || 8080}`);
});
