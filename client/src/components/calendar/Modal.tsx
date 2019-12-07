import React from "react";
import { Invoice } from "../../../../shared/types";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Theme,
  Divider,
  Box,
  Grid,
  IconButton
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import BusinessIcon from "@material-ui/icons/Business";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { Modal, Button } from "antd";
import ShareIcon from "@material-ui/icons/Share";
import EmailIcon from "@material-ui/icons/Email";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    title: {
      fontSize: "0.775rem"
    },
    subtitle: {
      fontSize: "0.675rem"
    },
    titleDivider: {
      width: "75%"
    }
  })
);

interface IModal {
  invoice: Invoice;
  invoiceTitle: string;
  invoiceModalOpen: boolean;
  setInvoiceModalOpen: any;
}

const InvoiceModal: React.FC<IModal> = ({
  invoice,
  invoiceTitle,
  invoiceModalOpen,
  setInvoiceModalOpen
}) => {
  const classes = useStyles();

  const icons = [PermIdentityIcon, MonetizationOnIcon, BusinessIcon];
  const titles = ["Name", "Amount To Pay", "Payee Financial Account"];
  const subtitles = [
    invoice.PartyName,
    Math.round(invoice.PayableAmount) +
      (invoice.Currency === "EUR" ? " €" : " HUF"),
    invoice.PayeeFinancialAccount
  ];

  const getLabelIcon = (label: string) => {
    switch (label) {
      case "fuel":
        return <BusinessIcon />;
      default:
        return <BusinessIcon />;
    }
  };

  return (
    <Modal
      title={
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography variant="h6">Invoice information</Typography>
          </Grid>
          <Grid item>
            <IconButton
              size="small"
              style={{ marginLeft: 15, color: "darkblue" }}
            >
              <EmailIcon style={{ fontSize: 20 }} />
            </IconButton>
            <IconButton
              size="small"
              style={{
                marginLeft: 15,
                marginRight: 45,
                color: "darkgreen"
              }}
            >
              <WhatsAppIcon style={{ fontSize: 20 }} />
            </IconButton>
          </Grid>
        </Grid>
      }
      visible={invoiceModalOpen}
      onOk={() => setInvoiceModalOpen(false)}
      onCancel={() => setInvoiceModalOpen(false)}
    >
      <Box mt={-1}>
        <List dense>
          <div className={classes.titleDivider}>
            <Typography>Details</Typography>
            <Box my={1}>
              <Divider />
            </Box>
          </div>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                style={{
                  width: 35,
                  height: 35
                }}
              >
                {getLabelIcon(invoice.Type)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography className={classes.title}>{"Type: "}</Typography>
                  <Typography className={classes.subtitle}>
                    {invoice.Type}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Box mt={2}>
            <div className={classes.titleDivider}>
              <Typography>Financial information</Typography>
              <Box my={1}>
                <Divider />
              </Box>
            </div>
          </Box>
          {icons.map((Icon, index) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  style={{
                    width: 35,
                    height: 35
                  }}
                >
                  <Icon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Grid container>
                    <Grid item>
                      <Typography className={classes.title}>
                        {titles[index]}
                      </Typography>
                      <Typography
                        className={classes.subtitle}
                        style={{ display: "inline-block" }}
                      >
                        {subtitles[index]}
                      </Typography>
                    </Grid>
                    {index === 1 && (
                      <Grid item>
                        <Box ml={14}>
                          <Button> Pay now! </Button>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                }
              />
            </ListItem>
          ))}
          <Box mt={2}>
            <div className={classes.titleDivider}>
              <Typography>Actions</Typography>
              <Box mt={1}>
                <Divider />
              </Box>
            </div>
          </Box>
        </List>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              style={{
                width: 35,
                height: 35
              }}
            >
              <AddAlertIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Button> Remind me </Button>
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              style={{
                width: 35,
                height: 35
              }}
            >
              <PictureAsPdfIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Button> Open Invoice </Button>
              </React.Fragment>
            }
          />
        </ListItem>
      </Box>
    </Modal>
  );
};

export default InvoiceModal;
