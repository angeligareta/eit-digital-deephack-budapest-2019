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

  const refreshInvoices = () => {
    fetchInvoices().then(invoicesResult => {
      console.log("Receiving invoices...");
      console.log(invoicesResult);
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
                    invoice.Status === "Paid" ? "darkred" : "red",
                  height: 25
                }}
                onClick={() => setInvoiceModalOpen(true)}
              >
                <Typography className={classes.typography}>
                  {invoiceTitle}
                </Typography>
              </Button>
              <InvoiceModal
                invoice={invoice}
                invoiceTitle={invoiceTitle}
                invoiceModalOpen={invoiceModalOpen}
                setInvoiceModalOpen={setInvoiceModalOpen}
              />
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const MonthCell = (value: any) => {
    const num = getMonthData(value);

    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
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
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InvoiceCalendar;
