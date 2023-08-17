import React, { Component, useState } from "react";
import classes from "./KnowMore.module.css";
import {
  Tabs,
  Tab,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Certifications from "./Certifications/index";
import Education from "./Education/index";
import Skills from "./Skills";

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

  const onTabChange = (event, newValue) => {
    setSelectedTabIndex(newValue);
  };

  const selectedComponent = () => {
    const target = tabsList.filter((t) => t.index === selectedTabIndex)[0];
    return target.component;
  };

  const webView = () => {
    return (
      <>
        <Tabs
          orientation={"horizontal"}
          value={selectedTabIndex}
          onChange={onTabChange}
          className={localStyles.tabs}
          classes={{ indicator: localStyles.indicator }}
          variant="scrollable"
          // centered
        >
          {tabsList.map((elem) => (
            <Tab
              label={elem.title}
              key={elem.index}
              className={localStyles.tab}
            />
          ))}
        </Tabs>
        {selectedComponent()}
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
  tabs: {
    borderBottom: (props) =>
      !props.isMobile ? "none" : `1px solid ${theme.palette.secondary.main}`,
    marginBottom: "14px",
    width: "inherit",
    maxWidth: "inherit",
    minWidth: "inherit",
  },
  tab: { fontSize: "16px", letterSpacing: "1px" },
  indicator: {
    backgroundColor: "red",
  },
}));

export default KnowMore;
