import {
  makeStyles,
  useMediaQuery,
  useTheme,
  Typography,
  Link,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import classes from "./Education.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchEducationThunk } from "../../../redux/slices/educationSlice";
import TryAgain from "../../TryAgain";

function Education() {
  const theme = useTheme();
  const localStyle = useStyles();
  const dispatch = useDispatch();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const { educationList, isLoading } = useSelector((state) => state.education);

  async function getEducationData() {
    try {
      await dispatch(fetchEducationThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const webView = () => (
    <div className={localStyle.body}>
      <div className={classes.content}>
        <ul className={classes.timeline}>
          {educationList.map((edu) => (
            <li
              key={edu.id}
              className={classes.event}
              data-date={`${edu.duration?.startYear} - ${
                edu.duration?.isStudying ? "cont." : edu.duration?.endYear
              }`}
            >
              <Typography
                variant="h5"
                style={{ color: theme.palette.text.secondary }}
              >
                {edu.degreeTitle} <br />
                <Link
                  href={edu.siteUrl}
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
      </div>
    </div>
  );

  const mobileView = () => (
    <ul style={{ listStyle: "none" }}>
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
              href={edu.siteUrl}
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

const useStyles = makeStyles((theme) => ({
  body: {
    textAlign: "left",
  },
}));

export default Education;
