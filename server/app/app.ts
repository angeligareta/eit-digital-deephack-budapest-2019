import fs = require("fs");
import express = require("express");
import request = require("request");
const cors = require("cors");
//import _ = require("lodash");
import { pushInvoice } from "./calendar";

const app: express.Application = express();
const port = 4000;

app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post("/storeInvoice", (req, res) => {
  const invoice = req.body;
  pushInvoice(invoice);
  res.send("Calendar event created!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
