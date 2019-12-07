import { Invoice } from "../../../shared/types";
import invoices from "../data/invoice_in.json";

export const API_ENDPOINT = "https://backofficeteszt.otpebiz.hu:4435";
export const INVOICE_API_ENDPOINT =
  API_ENDPOINT + "/motor_rest/CRUD/v_ebiz_invoice_in";

/**export async function fetchInvoices(): Promise<Invoice[]> {
  try {
    const response = await fetch(INVOICE_API_ENDPOINT, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer" // no-referrer, *client
    });
    const invoiceObject = await response.json();
    const invoices = invoiceObject.v_ebiz_invoice_in;
    return invoices;
  } catch {
    console.error("Fail to retrieve invoices.");
    return [];
  }
}*/

export async function fetchInvoices(): Promise<Invoice[]> {
  return invoices.v_ebiz_invoice_in;
}

export function getListData(value: any) {
  let listData;
  console.log(value.date());
  switch (value.date()) {
    case 8:
      listData = [{ type: "outgoing", content: "Invoice example." }];
      break;
    default:
  }
  return listData || [];
}

export function getMonthData(value: any) {
  if (value.month() === 8) {
    return 1394;
  }
}
