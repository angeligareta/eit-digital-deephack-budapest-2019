import { Invoice } from "../../../shared/types";
import invoices from "../data/incomingInvoice.json";

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
