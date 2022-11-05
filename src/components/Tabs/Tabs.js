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
import { useSelector, useDispatch } from "react-redux";
import {
  fetchExperienceThunk,
  addNewExperienceThunk,
  deleteExperienceThunk,
  editExperienceThunk,
} from "../../redux/slices/experienceSlice";

const StyledTabs = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ isMobile });

  const dispatch = useDispatch();

  const { experienceList, isLoading } = useSelector(
    (state) => state.experience
  );

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function addDummyExperience() {
    try {
      const experienceData = {
        company: "TESTING 2",
        jobTitle: "TESTING DOC",
        overview:
          "Code District is a software provider of custom web and mobile application development services. Here we're providing full-cycle services in the areas of SaaS-based product development, content management solutions, web portals, e-commerce, web-based enterprise solutions and mobile applications. ",
        duration: {
          start: "Jan 2022",
          end: "cont.",
        },
        links: {
          website: "https://www.codedistrict.com/",
          facebook: "https://www.facebook.com/codedistrictpk/",
          linkedIn: "https://www.linkedin.com/company/the-code-district/",
        },
      };
      console.log("add dispatched");
      await dispatch(addNewExperienceThunk(experienceData));
      console.log("add done");
      getExperienceData();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function deleteDummyExperience() {
    try {
      const eId = "zzWCKH5K5UOhzr6xUR09";
      console.log("delete dispatched");
      await dispatch(deleteExperienceThunk(eId));
      console.log("delete done");
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  async function updateDummyExperience() {
    try {
      const eId = "zzWCKH5K5UOhzr6xUR09";
      const experienceData = {
        id: eId,
        company: "TESTING 2",
        jobTitle: "TESTING DOC",
        overview:
          "Code District is a software provider of custom web and mobile application development services. Here we're providing full-cycle services in the areas of SaaS-based product development, content management solutions, web portals, e-commerce, web-based enterprise solutions and mobile applications. ",
        duration: {
          start: "Jan 2022",
          end: "cont.",
        },
        links: {
          website: "https://www.codedistrict.com/",
          facebook: "https://www.facebook.com/codedistrictpk/",
          linkedIn: "https://www.linkedin.com/company/the-code-district/",
        },
      };
      console.log("update dispatched");
      await dispatch(editExperienceThunk(experienceData));
      console.log("update done");
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  async function getExperienceData() {
    try {
      // We can wait for this async operation, and can update states 
      // before & after of this async operation by using setState()
      await dispatch(fetchExperienceThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    // setTimeout(() => {
    //   addDummyExperience();
    // }, 3000);
    // deleteDummyExperience();
    // updateDummyExperience();
    getExperienceData();
  }, []);
  const socialLinkButton = (social) => {
    return (
      <a href={social.link} target="_blank" rel="noreferrer">
        <IconBtn icon={social.icon} fontSize={28} m={1} />
      </a>
    );
  };
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className={classes.root}>
      <Tabs
        orientation={isMobile ? "horizontal" : "vertical"}
        value={value}
        onChange={handleChange}
        className={classes.tabs}
        classes={{ indicator: classes.indicator }}
        centered
      >
        {experienceList.map((elem) => (
          <Tab label={elem.company} key={elem.id} />
        ))}
      </Tabs>
      {experienceList.map((elem) => (
        <TabPanel value={value} index={elem.index} key={elem.id}>
          <Box mb={4}>
            <Typography variant="h5">
              {elem.jobTitle} @{" "}
              <Link
                href={
                  elem.links.website ||
                  elem.links.facebook ||
                  elem.links.instagram
                }
                color="primary"
                target={"_blank"}
              >
                {elem.company}
              </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" fontSize="14">
              {elem.duration.start} - {elem.duration.end}
            </Typography>
          </Box>
          <Box mb={4}>
            <Typography variant="body1" color="textPrimary">
              {elem.overview}
            </Typography>
          </Box>
          <Box>
            {elem.links.website &&
              socialLinkButton({ link: elem.links.website, icon: Language })}
            {elem.links.facebook &&
              socialLinkButton({ link: elem.links.facebook, icon: Facebook })}
            {elem.links.linkedIn &&
              socialLinkButton({ link: elem.links.linkedIn, icon: LinkedIn })}
          </Box>
        </TabPanel>
      ))}
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
