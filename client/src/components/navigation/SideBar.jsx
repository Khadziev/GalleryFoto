import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import LocalHospitalOutlinedIcon from "@material-ui/icons/LocalHospitalOutlined";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import FaceIcon from "@material-ui/icons/Face";
import Box from "@material-ui/core/Box";
import WcIcon from "@material-ui/icons/Wc";
import Typography from "@material-ui/core/Typography";
import { Rating } from "@material-ui/lab";
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
    },
  },
  fullList: {
    width: "auto",
  },
  buttonSidBar: {
    marginTop: 10,
    backgroundColor: "#1073b2",
    "&:hover": {
      backgroundColor: "#ff1f1f",
    },
  },
  arrow: {
    transition: "transform 0.3s ease",
  },
  arrowOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function SideBar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (event) => {
    if (
        event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  const list = (
      <div
          style={{ background: "#333" }}
          className={clsx(classes.list, {
            [classes.fullList]: open,
          })}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
      >
        <List>
          <a
              href="https://mosgorzdrav.ru/ru-RU/news/default/card/3291.html"
              style={{ textDecoration: "none" }}
          >
            <ListItem button>
              <ListItemIcon style={{ color: "white" }}>
                <WcIcon />
              </ListItemIcon>
              <ListItemText primary="Счастье детям" />
            </ListItem>
          </a>
        </List>
        <List>
          <a
              href="https://www.championat.com/lifestyle/article-4122395-kakoj-vid-sporta-vybrat-dlja-rebjonka-v-kakuju-sekciju-otdat-rebjonka.html"
              style={{ textDecoration: "none" }}
          >
            <ListItem button>
              <ListItemIcon style={{ color: "white" }}>
                <ChildCareIcon />
              </ListItemIcon>
              <ListItemText primary="Спорт для ребенка" />
            </ListItem>
          </a>
        </List>
        <List>
          <a
              href="https://zdorovye-detey.ru/services/vyzov-vracha-na-dom.html"
              style={{ textDecoration: "none" }}
          >
            <ListItem button>
              <ListItemIcon style={{ color: "white" }}>
                <LocalHospitalOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Вызов врача на дом" />
            </ListItem>
          </a>
        </List>
        <List>
          <a
              href="https://agulife.ru/calendopedia/principy-zdorovogo-pitaniya-malyshei"
              style={{ textDecoration: "none" }}
          >
            <ListItem button>
              <ListItemIcon style={{ color: "white" }}>
                <LocalHospitalOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Правильное питание ребенка" />
            </ListItem>
          </a>
        </List>
        <List>
          <a
              href="https://zdorovye-detey.ru/services/vyzov-vracha-na-dom.html"
              style={{ textDecoration: "none" }}
          >
            <ListItem button>
              <ListItemIcon style={{ color: "white" }}>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary="Услуги няни" />
            </ListItem>
          </a>
        </List>
        <List>
          <a
              href="https://onideti.ru/skype/?gclid=CjwKCAjwjdOIBhA_EiwAHz8xm4QybI2--fZppynQaTdZbaFpO0D3AttDwrAZDpsVD7pnf7A4LdoHxRoCUOcQAvD_BwE"
              style={{ textDecoration: "none" }}
          >
            <ListItem button>
              <ListItemIcon style={{ color: "white" }}>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Детский психолог" />
            </ListItem>
          </a>
        </List>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Controlled</Typography>
          <Rating
              name="simple-controlled"
              value={2}
              onChange={() => {}}
          />
        </Box>
        <Divider />
      </div>
  );

  return (
      <div>
        <Button
            variant="contained"
            color="primary"
            className={classes.buttonSidBar}
            onClick={toggleDrawer}
        >
          {open ? <CloseIcon/> :  <KeyboardArrowRightIcon />}
          <span
              className={clsx(classes.arrow, {
                [classes.arrowOpen]: open,
              })}
          >

        </span>
        </Button>

        <SwipeableDrawer
            anchor="right"
            open={open}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
        >
          {list}
        </SwipeableDrawer>
      </div>
  );
}
