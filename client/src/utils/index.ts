import invoices from "../data/incomingInvoice.json";
import { Invoice } from "../shared/types.js";

export const API_ENDPOINT = "https://backofficeteszt.otpebiz.hu:4435";
export const INVOICE_API_ENDPOINT =
  API_ENDPOINT + "/motor_rest/CRUD/v_ebiz_invoice_in";

export async function fetchInvoices(): Promise<Invoice[]> {
  return invoices;
}

export function getMonthData(value: any) {
  if (value.month() === 8) {
    return 1394;
  }
}

export function addGoogleEvent(invoice: Invoice) {
  fetch("http://localhost:4000/storeInvoice", {
    method: "POST",
    body: JSON.stringify(invoice),
    headers: {
      "Access-Control-Allow-Origin": "'*'",
      "Content-Type": "application/json"
    }
  });
}
