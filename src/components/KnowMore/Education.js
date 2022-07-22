import {
  makeStyles,
  useMediaQuery,
  useTheme,
  Typography,
  Link,
} from "@material-ui/core";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { educations } from "../../data";
import classes from "./Education.module.css";

function Education() {
  const theme = useTheme();
  const localStyle = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className={localStyle.body}>
      {/* <Timeline
        position="right"
        className={localStyle.body}
      >
        {educations.map((education) => (
          <TimelineItem>
            <TimelineOppositeContent color={theme.palette.text.secondary}>
              {education.duration.start} - {education.duration.end}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography
                variant="h5"
                style={{ color: theme.palette.text.secondary }}
              >
                {education.degreeTitle} <br />
                <Link
                  href={
                    education.links.website ||
                    education.links.facebook ||
                    education.links.instagram
                  }
                  color="primary"
                  target={"_blank"}
                >
                  {education.school}
                </Link>
              </Typography>
              <Typography
                variant="h6"
                style={{ color: theme.palette.text.secondary }}
              >
                {education.location}
              </Typography>
              <br />
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline> */}

      <div className={classes.content}>
        <ul className={classes.timeline}>
          {educations.reverse().map((education) => (
            <li
              className={classes.event}
              data-date={`${education.duration.start} - ${education.duration.end}`}
            >
              <Typography
                variant="h5"
                style={{ color: theme.palette.text.secondary }}
              >
                {education.degreeTitle} <br />
                <Link
                  href={
                    education.links.website ||
                    education.links.facebook ||
                    education.links.instagram
                  }
                  color="primary"
                  target={"_blank"}
                >
                  {education.school}
                </Link>
              </Typography>
              <Typography
                variant="h6"
                style={{ color: theme.palette.text.secondary }}
              >
                {education.location}
              </Typography>
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  body: {
    textAlign: "left",
  },
}));

export default Education;
