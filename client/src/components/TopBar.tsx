import {
  AppBar,
  createStyles,
  IconButton,
  Theme,
  Toolbar,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

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
    },
    appbar: {
      color: "white",
      backgroundColor: "#4e4ca0"
    }
  })
);

const TopBar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img width="20" src="./favicon.ico" />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.title}>
            eBIZ
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
