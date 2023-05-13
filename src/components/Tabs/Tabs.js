import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Tabs,
  Tab,
  Typography,
  Box,
  Link,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Language, Facebook, LinkedIn } from "@material-ui/icons";
import IconBtn from "../../components/IconBtn";
import { useTranslation } from "react-i18next";

const StyledTabs = (props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ isMobile });

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const socialLinkButton = (social) => {
    return (
      <a href={social.link} target="_blank" rel="noreferrer">
        <IconBtn icon={social.icon} fontSize={28} m={1} />
      </a>
    );
  };

  const webViewPanel = (exp, index) => {
    let endDate = exp?.duration?.isWorkingHere
      ? "cont."
      : `${exp.duration.endMonth.shortName} ${exp.duration.endYear}`;

    return (
      <TabPanel value={value} index={index} key={index}>
        <Box mb={4}>
          <Typography
            variant="h5"
            style={{ color: theme.palette.text.secondary }}
          >
            {exp.jobTitle} @{" "}
            <Link
              href={
                exp.links.websiteUrl ||
                exp.links.facebook ||
                exp.links.instagram
              }
              color="primary"
              style={{ cursor: "pointer", textDecoration: "none" }}
              target={"_blank"}
            >
              {exp.company}
            </Link>
          </Typography>
          <Typography
            variant="h6"
            style={{ color: theme.palette.text.secondary }}
            fontSize="14"
          >
            {exp.location} &nbsp; | &nbsp; {exp.duration.startMonth.shortName}{" "}
            {exp.duration.startYear} - {endDate}
          </Typography>
        </Box>
        <Box mb={4}>
          <Typography
            variant="body1"
            color="textPrimary"
            style={{ textAlign: "justify" }}
          >
            {exp.overview}
          </Typography>
        </Box>
        <Box>
          {exp.links.website &&
            socialLinkButton({ link: exp.links.website, icon: Language })}
          {exp.links.facebook &&
            socialLinkButton({ link: exp.links.facebook, icon: Facebook })}
          {exp.links.linkedIn &&
            socialLinkButton({ link: exp.links.linkedIn, icon: LinkedIn })}
        </Box>
      </TabPanel>
    );
  };

  const mobileViewPanel = (exp, index) => {
    let endDate = exp?.duration?.isWorkingHere
      ? "cont."
      : `${exp.duration.endMonth.shortName} ${exp.duration.endYear}`;
    return (
      <TabPanel value={value} index={index} key={index}>
        <Box mb={4}>
          <Typography
            variant="subtitle2"
            style={{ color: theme.palette.text.secondary }}
          >
            {exp.duration.startMonth.shortName} {exp.duration.startYear} -{" "}
            {endDate}
          </Typography>
          <Typography
            variant="h5"
            style={{ color: theme.palette.text.secondary }}
          >
            {exp.jobTitle}
          </Typography>
          <Typography
            variant="h5"
            style={{ color: theme.palette.text.secondary }}
          >
            @{" "}
            <Link
              href={
                exp.links.websiteUrl ||
                exp.links.facebook ||
                exp.links.instagram
              }
              color="primary"
              style={{ cursor: "pointer", textDecoration: "none" }}
              target={"_blank"}
            >
              {exp.company}
            </Link>
          </Typography>
          <Typography
            variant="h6"
            style={{ color: theme.palette.text.secondary }}
          >
            {exp.location}
          </Typography>
        </Box>
        <Box mb={4}>
          <Typography
            variant="body1"
            color="textPrimary"
            style={{ textAlign: "justify" }}
          >
            {exp.overview}
          </Typography>
        </Box>
        <Box>
          {exp.links.website &&
            socialLinkButton({ link: exp.links.website, icon: Language })}
          {exp.links.facebook &&
            socialLinkButton({ link: exp.links.facebook, icon: Facebook })}
          {exp.links.linkedIn &&
            socialLinkButton({ link: exp.links.linkedIn, icon: LinkedIn })}
        </Box>
      </TabPanel>
    );
  };
  return (
    <div className={classes.root}>
      <Tabs
        orientation={isMobile ? "horizontal" : "vertical"}
        value={value}
        onChange={handleChange}
        className={classes.tabs}
        classes={{ indicator: classes.indicator }}
        variant="scrollable"
        // centered
      >
        {props.experienceData.map((elem) => (
          <Tab label={elem.company} key={elem.id} />
        ))}
      </Tabs>
      {props.experienceData?.map((elem, index) =>
        isMobile ? mobileViewPanel(elem, index) : webViewPanel(elem, index)
      )}
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} minHeight={isMobile ? 0 : "350px"}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.main,
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: (props) => (props.isMobile ? "column" : "row"),
  },
  tabs: {
    borderRight: (props) =>
      props.isMobile ? "none" : `1px solid ${theme.palette.secondary.main}`,
    borderBottom: (props) =>
      !props.isMobile ? "none" : `1px solid ${theme.palette.secondary.main}`,
    width: (props) => (props.isMobile ? "inherit" : "200px"),
    maxWidth: (props) => (props.isMobile ? "inherit" : "200px"),
    minWidth: (props) => (props.isMobile ? "inherit" : "200px"),
  },
  indicator: {
    backgroundColor: "red",
  },
}));

export default StyledTabs;
