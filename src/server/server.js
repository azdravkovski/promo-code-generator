const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const generatePromoCodes = require("../utils/promoCodeGenerator");

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", true);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

app.get("/promocodes", (req, res) => res.send(generatePromoCodes(1000)));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
