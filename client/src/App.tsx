import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import TopBar from "./components/TopBar";
import { InvoiceCalendar } from "./components/calendar";

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: 2
    },
    title: {
      flexGrow: 1
    }
  })
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar />
      <InvoiceCalendar />
    </div>
  );
};

export default App;
