import React, { Component, useState, useEffect } from "react";
import classes from "./KnowMore.module.css";
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { GASendEvent } from "../../utils/googleAnalytics";
import Certifications from "./Certifications/index";
import Education from "./Education/index";
import Skills from "./Skills";

const tabs = {
  Skills: {
    index: 2,
    component: <Skills />,
  },
  Certifications: {
    index: 1,
    component: <Certifications />,
  },
  Education: {
    index: 0,
    component: <Education />,
  },
};

const tabsList = [
  {
    title: "Education",
    index: 0,
    component: <Education />,
  },
  {
    title: "Certifications",
    index: 1,
    component: <Certifications />,
  },
  {
    title: "Skill Set",
    index: 2,
    component: <Skills />,
  },
];

const KnowMore = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const localStyles = useStyles();

  useEffect(() => {
    const target = tabsList.filter((t) => t.index === selectedTabIndex)[0];
    GASendEvent(`Viewed${target.title.replace(/\s/g, "")}`);
  }, [selectedTabIndex]);

  const onTabChange = (tabIndex) => {
    setSelectedTabIndex(tabIndex);
  };

  const selectedComponent = () => {
    const target = tabsList.filter((t) => t.index === selectedTabIndex)[0];
    return target.component;
  };

  const webView = () => {
    return (
      <>
        <div className={classes.wrapper}>
          <ul id={classes.tab}>
            {tabsList
              .sort((a, b) => b.index - a.index)
              .map((tab, index) => {
                return (
                  <li key={index}>
                    <div
                      className={
                        selectedTabIndex === tab.index
                          ? localStyles.selectedTab
                          : null
                      }
                      onClick={() => onTabChange(tab.index)}
                    >
                      {tab.title.toUpperCase()}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className={classes.body}>{selectedComponent()}</div>
      </>
    );
  };

  const mobileView = () => {
    return (
      <>
        {tabsList
          .sort((a, b) => a.index - b.index)
          .map((tab, index) => {
            return (
              <Accordion
                key={index}
                style={{ marginBottom: "10px" }}
                onClick={() => onTabChange(tab.index)}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      style={{ color: theme.palette.text.secondary }}
                    />
                  }
                  aria-controls={`${tab.index}-content`}
                  id={`${tab.index}-header`}
                >
                  <Typography variant="h6">
                    {tab.title.toUpperCase()}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ display: "block" }}>
                  {tab.component}
                </AccordionDetails>
              </Accordion>
            );
          })}
      </>
    );
  };
  return <>{isMobile ? mobileView() : webView()}</>;
};

const useStyles = makeStyles((theme) => ({
  selectedTab: {
    "border-bottom-style": "solid",
    "border-color": theme.palette.primary.main,
  },
}));

export default KnowMore;
