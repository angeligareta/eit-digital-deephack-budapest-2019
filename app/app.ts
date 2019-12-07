import fs = require("fs");
import express = require("express");
import request = require("request");
//import _ = require("lodash");
import { pushInvoice } from "./calendar";

const app: express.Application = express();
const port = 3000;

const API_ENDPOINT = "http://localhost:3000/getInvoices";
const invoices_path = "data/invoice_in.json";

app.get("/getInvoices", (req, res) => {
  fs.readFile(invoices_path, "utf8", function(err, data) {
    if (err) {
      throw err;
    }
    let invoices = JSON.parse(data);
    res.send(invoices);
  });
});

app.get("/storeInvoice", (req, res) => {
  request(API_ENDPOINT, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      let invoices = JSON.parse(body);

      // Get the input invoices
      invoices.v_ebiz_invoice_in.forEach(invoice => {
        pushInvoice(invoice);
      });

      res.send("Calendar event created!");
    } else {
      res.send("Error accesing the API.");
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
