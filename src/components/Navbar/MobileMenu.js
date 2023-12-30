import React from "react";
import {
  makeStyles,
  Drawer,
  List,
  Button,
  Divider,
  ListItem,
  Link as MuiLink,
} from "@material-ui/core";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { GASendEvent } from "../../utils/googleAnalytics";

const MobileMenu = ({ open, onClose, onOpen }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const listItemProps = {
    button: true,
    component: Link,
    onClick: onClose,
    onKeyDown: onClose,
    spy: true,
    smooth: true,
    offset: 0,
    duration: 500,
    className: classes.listItem,
    activeClass: classes.active,
  };
  const { profile } = useSelector((state) => state.profile);

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      classes={{ paper: classes.drawer }}
    >
      <div className={classes.list} role="presentation">
        <List className={classes.fullList}>
          <ListItem {...listItemProps} to="about">
            {t("menu_about")}
          </ListItem>
          <ListItem {...listItemProps} to="experience">
            {t("menu_experience")}
          </ListItem>
          <ListItem {...listItemProps} to="projects">
            {t("menu_projects")}
          </ListItem>
          <ListItem {...listItemProps} to="know_more">
            {t("menu_know_more")}
          </ListItem>
          <ListItem {...listItemProps} to="contact">
            {t("menu_contact")}
          </ListItem>
          <ListItem className={classes.btnContainer}>
            <Button
              component={MuiLink}
              href={profile?.resumeUrl}
              target="_blank"
              variant="outlined"
              color="primary"
              underline="none"
              onClick={() => {
                GASendEvent("ViewedResume");
              }}
            >
              {t("menu_resume")}
            </Button>
          </ListItem>
          {/* <ListItem className={classes.btnContainer}>
                        <LangSelector onClose={onClose} />
                    </ListItem> */}
          {/* <ListItem className={classes.btnContainer}>
                        <DarkModeSwitcher onClose={onClose} />
                    </ListItem> */}
          <Divider />
        </List>
      </div>
    </Drawer>
  );
};

const useStyles = makeStyles((theme) => ({
  drawer: {
    backgroundColor: theme.palette.background.default,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
    marginTop: theme.spacing(4),
  },
  listItem: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2, 0),
    "&:hover": {
      backgroundColor: "rgb(80,80,80)",
    },
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1),
  },
  active: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default MobileMenu;
