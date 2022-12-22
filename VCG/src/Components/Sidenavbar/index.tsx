import React, { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/Mail";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Header from "../Header";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import QuizIcon from "@mui/icons-material/Quiz";
import ArticleIcon from "@mui/icons-material/Article";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { padding } from "@mui/system";
//import { history } from "../../config/history";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "blue",
    fontSize: "20px",
  },
  icon: {
    color: "white",
  },
}));

const SwipeableSidenavbar = (props: any) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <React.Fragment>
        <List>
          <img
            className={
              props.width == 2
                ? "logo-big side-bar-logo"
                : "logo-small side-bar-logo"
            }
            src={
              props.width == 2
                ? process.env.PUBLIC_URL + "/assets/img/vcg-logo.svg"
                : process.env.PUBLIC_URL + "/assets/img/vcg-logo-mini.svg"
            }
          />

          <ListItem
            button
            key={"text"}
            style={{ marginTop: "30px" }}
            onClick={() => navigate("/dashboard")}
            className={
              window.location.href.includes("dashboard") ? "active-silder" : ""
            }
          >
            <ListItemIcon className="icon-color">
              <DashboardIcon className="icon-align" />
            </ListItemIcon>
            {props.width == 2 && (
              <ListItemText className="text-styling" primary={"Dashboard"} />
            )}
          </ListItem>

          <Typography className="li-styling text-styling">QLE</Typography>
          <ListItem
            button
            onClick={() => navigate("/qle")}
            
            
            className={
              (window.location.href.endsWith("qle") || window.location.href.includes("qle-edit")) ? "active-silder" : ""
            }
          >
            <ListItemIcon className="icon-color">
              <CalendarTodayIcon className="icon-align" />
            </ListItemIcon>
            {props.width == 2 && (
              <ListItemText className="text-styling" primary={"QLEs"} />
            )}
          </ListItem>

          <ListItem
            button
            onClick={() => navigate("/report/QLE")}
            className={
              window.location.href.includes("/report/QLE") ? "active-silder" : ""
            }
          >
            <ListItemIcon className="icon-color">
              <AssessmentIcon className="icon-align" />{" "}
            </ListItemIcon>
            {props.width == 2 && (
              <ListItemText className="text-styling" primary={"Reports"} />
            )}
          </ListItem>

          <ListItem
            button
            onClick={() => navigate("/qle-email")}
            className={
              window.location.href.includes("qle-email") ? "active-silder" : ""
            }
          >
            <ListItemIcon className="icon-color">
              <MailOutlineIcon className="icon-align" />{" "}
            </ListItemIcon>
            {props.width == 2 && (
              <ListItemText className="text-styling" primary={"Email/SMS Template"} />
            )}
          </ListItem>

          <ListItem
            button
            onClick={() => navigate("/qleFaqs/QLE")}
            className={
              window.location.href.includes("qleFaqs/QLE") ? "active-silder" : ""
            }
          >
            <ListItemIcon className="icon-color">
              {" "}
              <QuizIcon className="icon-align" />{" "}
            </ListItemIcon>
            {props.width == 2 && (
              <ListItemText className="text-styling" primary={"FAQs"} />
            )}
          </ListItem>
          
          <Typography className="li-styling">ACA</Typography>

          <ListItem
            button
            className={
              window.location.href.endsWith("aca-applications") ||
              window.location.href.includes("edit-aca-applications")
                ? "active-silder"
                : ""
            }
            onClick={() => navigate("/aca-applications")}
          >
            <ListItemIcon className="icon-color">
              <AccountCircleIcon className="icon-align" />{" "}
            </ListItemIcon>
            {props.width == 2 && (
              <ListItemText className="text-styling" primary={"Applications"} />
            )}
          </ListItem>

          <ListItem
            button
            onClick={() => navigate("/report/ACA")}
            className={
              window.location.href.includes("/report/ACA") ? "active-silder" : ""
            }
          >
            <ListItemIcon className="icon-color">
              <AssessmentIcon className="icon-align" />{" "}
            </ListItemIcon>
            {props.width == 2 && (
              <ListItemText className="text-styling" primary={"Reports"} />
            )}
          </ListItem>

          <ListItem
            button
            onClick={() => navigate("/aca-email")}
            className={
              window.location.href.includes("aca-email") ? "active-silder" : ""
            }
          >
            <ListItemIcon className="icon-color">
              <MailOutlineIcon className="icon-align" />{" "}
            </ListItemIcon>
            {props.width == 2 && (
              <ListItemText className="text-styling" primary={"Email/SMS Template"} />
            )}
          </ListItem>
          <ListItem
            button
            onClick={() => navigate("/qleFaqs/ACA")}
            className={
              window.location.href.includes("/qleFaqs/ACA") ? "active-silder" : ""
            }
          >
            <ListItemIcon className="icon-color">
              <QuizIcon className="icon-align" />{" "}
            </ListItemIcon>
            {props.width == 2 && (
              <ListItemText className="text-styling" primary={"FAQs"} />
            )}
          </ListItem>
          <Typography className="li-styling">
            {" "}
            {props.width == 2 && "SETTINGS"}
          </Typography>

          <ListItem
            button
            className={
              window.location.href.includes("roles") ? "active-silder" : ""
            }
            onClick={() => navigate("/roles")}
          >
            <ListItemIcon className="icon-color">
              <GroupAddIcon className="icon-align" />
            </ListItemIcon>
            {props.width == 2 && (
              <ListItemText className="text-styling" primary={"Roles"} />
            )}{" "}
          </ListItem>

          <ListItem
            button
            onClick={() => navigate("/users")}
            className={
              window.location.href.includes("users") ? "active-silder" : ""
            }
          >
            <ListItemIcon className="icon-color">
              <GroupIcon className="icon-align" />{" "}
            </ListItemIcon>
            {props.width == 2 && (
              <ListItemText className="text-styling" primary={"Users"} />
            )}
          </ListItem>
          <ListItem
            button
            className={
              window.location.href.includes("mployer") ? "active-silder" : ""
            }
            onClick={() => navigate("/employers")}
          >
            <ListItemIcon className="icon-color">
              <AccountCircleIcon className="icon-align" />{" "}
            </ListItemIcon>
            {props.width == 2 && (
              <ListItemText className="text-styling" primary={"Employers"} />
            )}
          </ListItem>
        </List>
      </React.Fragment>
    </div>
  );
};

export default SwipeableSidenavbar;
