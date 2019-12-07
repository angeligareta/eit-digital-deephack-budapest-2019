import fs = require("fs");
import express = require("express");
import request = require("request");
//import _ = require("lodash");
import { pushInvoice } from "./calendar";

const app: express.Application = express();
const port = 4000;

const API_ENDPOINT =
  "https://backofficeteszt.otpebiz.hu:4435/motor_rest/CRUD/v_ebiz_invoice_in";
const invoices_path = "./data/invoice_in.json";

app.get("/getInvoices", (req, res) => {
  request.get(API_ENDPOINT);
});

const options = {
  hostname: "https://backofficeteszt.otpebiz.hu",
  port: 4435,
  path: "/motor_rest/CRUD/v_ebiz_invoice_in",
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
};

app.get("/storeInvoice", (req, res) => {
  request(API_ENDPOINT, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      let invoices = JSON.parse(body);
      console.log(invoices);

      // Get the input invoices
      invoices.v_ebiz_invoice_in.forEach(invoice => {
        pushInvoice(invoice);
      });

      res.send("Calendar event created!");
    } else {
      console.log(error);
      res.send("Error accesing the API." + error);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
