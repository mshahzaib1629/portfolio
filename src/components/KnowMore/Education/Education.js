import {
  makeStyles,
  useMediaQuery,
  useTheme,
  Typography,
  Link,
  Box,
  Tabs,
  Tab,
} from "@material-ui/core";
import { useEffect, useState } from "react";
// import classes from "./Education.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchEducationThunk } from "../../../redux/slices/educationSlice";
import TryAgain from "../../TryAgain";

function Education() {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [value, setValue] = useState(0);
  const { educationList, isLoading } = useSelector((state) => state.education);

  async function getEducationData() {
    try {
      await dispatch(fetchEducationThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const webViewPanel = (edu, index) => {
    let endDate = edu?.duration?.isStudying
      ? "cont."
      : `${edu.duration?.endYear}`;
    return (
      <TabPanel value={value} index={index} key={index}>
        <Box mb={4}>
          <Typography
            variant="h5"
            style={{ color: theme.palette.text.secondary }}
          >
            {edu.degreeTitle} @{" "}
            <Link
              href={edu.siteUrl?.length > 0 ? edu.siteUrl : null}
              color="primary"
              style={{ cursor: "pointer", textDecoration: "none" }}
              target={"_blank"}
            >
              {edu.school}
            </Link>
          </Typography>
          <Typography
            variant="h6"
            style={{ color: theme.palette.text.secondary }}
            fontSize="14"
          >
            {edu.location} &nbsp; | &nbsp;
            {edu.duration.startYear} - {endDate}
          </Typography>
        </Box>
        {edu.includeProject && (
          <>
            <Typography
              variant="h6"
              style={{ color: theme.palette.primary.main }}
            >
              {edu.project?.niche}
            </Typography>
            <Typography
              variant="h5"
              style={{ color: theme.palette.text.secondary }}
            >
              {edu.project?.title}
            </Typography>
            <Box mb={4}>
              <Typography
                variant="body1" color="textSecondary" align="justify"
              >
                {edu.project?.description}
              </Typography>
            </Box>
          </>
        )}
      </TabPanel>
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const webView = () => (
    <div className={classes.root}>
      <Tabs
        orientation={"horizontal"}
        value={value}
        onChange={handleChange}
        className={classes.tabs}
        classes={{ indicator: classes.indicator }}
        variant="scrollable"
        // centered
      >
        {educationList.map((elem) => (
          <Tab label={elem.degreeTitle} key={elem.id} />
        ))}
      </Tabs>
      {educationList?.map((elem, index) => webViewPanel(elem, index))}
    </div>
  );

  const mobileView = () => (
    <ul style={{ listStyle: "none", paddingInline: "12px" }}>
      {educationList.map((edu) => (
        <li key={edu.id}>
          <Typography
            variant="subtitle2"
            style={{ color: theme.palette.text.secondary }}
          >{`${edu.duration.startYear} - ${
            edu.duration?.isStudying ? "cont." : edu.duration?.endYear
          }`}</Typography>
          <Typography
            variant="h5"
            style={{ color: theme.palette.text.secondary }}
          >
            {edu.degreeTitle} <br />
            <Link
              href={edu.siteUrl?.length > 0 ? edu.siteUrl : null}
              style={{ cursor: "pointer", textDecoration: "none" }}
              color="primary"
              target={"_blank"}
            >
              {edu.school}
            </Link>
          </Typography>
          <Typography
            variant="h6"
            style={{ color: theme.palette.text.secondary }}
          >
            {edu.location}
          </Typography>
          <br />
        </li>
      ))}
    </ul>
  );

  const buildView = () => (isSmallMobile ? mobileView() : webView());

  const buildContent = () =>
    educationList.length == 0 ? (
      <TryAgain
        message="Unable to fetch education list!"
        callback={getEducationData}
      />
    ) : (
      buildView()
    );

  return isLoading ? <p>Loading...</p> : buildContent();
}

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
        <Box p={3} minHeight="350px">
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  body: {
    textAlign: "left",
  },
  tabs: {
    borderBottom: (props) =>
      !props.isMobile ? "none" : `1px solid ${theme.palette.secondary.main}`,
    width: "inherit",
    maxWidth: "inherit",
    minWidth: "inherit",
  },
  indicator: {
    backgroundColor: "red",
  },
}));

export default Education;
