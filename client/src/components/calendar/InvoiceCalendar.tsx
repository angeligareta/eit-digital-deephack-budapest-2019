import {
  Box,
  createStyles,
  Divider,
  Grid,
  Paper,
  Theme,
  Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";
import { makeStyles } from "@material-ui/styles";
import { Button, Calendar } from "antd";
import { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { Invoice } from "../../../../shared/types";
// IMPORT ANTD CSS
import "../../styles/calendar.css";
import { fetchInvoices, getMonthData } from "../../utils/index";
import InvoiceModal from "./Modal";

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    typography: {
      color: "white",
      fontSize: "0.675rem"
    },
    calendar: {
      marginTop: 10
    }
  })
);

const InvoiceCalendar: React.FC = () => {
  const classes = useStyles();
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | undefined>(
    undefined
  );

  const payInvoice = () => {
    if (selectedInvoice) {
      setInvoices(
        invoices.map(inv => {
          if (inv.recordid === selectedInvoice.recordid) {
            return { ...selectedInvoice, Status: "Paid" };
          } else {
            return inv;
          }
        })
      );
    }
  };

  const refreshInvoices = () => {
    fetchInvoices().then(invoicesResult => {
      setInvoices(invoicesResult);
    });
  };

  // Refresh invoices when the component is loaded
  useEffect(() => refreshInvoices(), []);

  const DateCell = (value: Moment) => {
    const formattedDateCell = value.format("YYYY-MM-DD");

    // Filter invoices that match the formatted date cell
    let listData: Invoice[] = invoices.filter(
      invoice => invoice.DueDate === formattedDateCell
    );

    return (
      <div style={{ overflow: "hidden" }}>
        {listData.map(invoice => {
          const invoiceTitle =
            invoice.PartyName +
            " - " +
            Math.round(invoice.PayableAmount) +
            (invoice.Currency === "EUR" ? " €" : " HUF");
          return (
            <React.Fragment>
              <Button
                style={{
                  backgroundColor:
                    invoice.TransactionType === "Income" ? "red" : "green",
                  opacity: invoice.Status === "Paid" ? 0.3 : 1,
                  height: 25,
                  width: "100%"
                }}
                onClick={() => {
                  setSelectedInvoice(invoice);
                  setInvoiceModalOpen(true);
                }}
              >
                <Typography className={classes.typography}>
                  {invoiceTitle}
                </Typography>
              </Button>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const MonthCell = (value: Moment) => {
    let sum = 0;
    invoices.forEach(invoice => {
      sum +=
        parseInt(invoice.DueDate.split("-")[1]) === value.month() + 1 ? 1 : 0;
    });

    return sum !== 0 ? (
      <div className="notes-month">
        <span>Invoice number</span>
        <section>{sum}</section>
      </div>
    ) : null;
  };

  return (
    <Grid container direction="column" className={classes.calendar}>
      <Grid item>
        <Box mt={1} mb={2}>
          <Box mx={2} mb={2}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography
                  style={{
                    fontFamily: "Lato",
                    fontWeight: "bold",
                    display: "inline-block"
                  }}
                  variant="h4"
                >
                  {"Invoice"}
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Lato",
                    display: "inline-block",
                    marginLeft: 10
                  }}
                  variant="h4"
                >
                  Calendar
                </Typography>
              </Grid>
              <Grid item>
                <Button type="link">
                  <AddIcon style={{ fontSize: 30 }} />
                </Button>
                <Button type="link">
                  <RefreshIcon style={{ fontSize: 30 }} />
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Divider />
        </Box>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Paper>
            <Calendar dateCellRender={DateCell} monthCellRender={MonthCell} />
            {selectedInvoice && (
              <InvoiceModal
                invoice={selectedInvoice}
                invoiceModalOpen={invoiceModalOpen}
                setInvoiceModalOpen={setInvoiceModalOpen}
                payInvoice={payInvoice}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InvoiceCalendar;
