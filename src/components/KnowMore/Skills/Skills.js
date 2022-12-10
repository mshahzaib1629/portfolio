import {
  makeStyles,
  useMediaQuery,
  useTheme,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { skills } from "../../../data";
import classes from "./Skills.module.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import { fetchSkillSetThunk } from "../../../redux/slices/skillSetSlice";
import TryAgain from "../../TryAgain";

function Skills() {
  const theme = useTheme();
  const localStyle = useStyles();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expandedCardIndex, setExpandedCardIndex] = useState(0);
  const dispatch = useDispatch();
  const { skillSetList, isLoading } = useSelector((state) => state.skillSet);

  async function getSkillSetData() {
    try {
      await dispatch(fetchSkillSetThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const webView = () => (
    <ul style={{ listStyle: "none" }}>
      {skillSetList.map((skill, index) => {
        return (
          <Accordion
            key={skill.id}
            style={{ marginBottom: "10px" }}
            expanded={index === expandedCardIndex}
            onClick={() => setExpandedCardIndex(index)}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  style={{ color: theme.palette.text.secondary }}
                />
              }
              aria-controls={`${skill.id}-content`}
              id={`${skill.id}-header`}
            >
              <Typography
                variant="h6"
                color={index === expandedCardIndex ? "primary" : ""}
              >
                {skill.skillSetTitle}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "block", minHeight: "14.5em" }}>
              {skill.data.map((skillData, index) => (
                <span>
                  {skillData}{" "}
                  {index != skill.data.length - 1 ? (
                    <>&nbsp;&nbsp; ○ &nbsp;&nbsp;</>
                  ) : (
                    ""
                  )}
                </span>
              ))}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </ul>
  );

  const mobileView = () => (
    <ul style={{ listStyle: "none" }}>
      {skillSetList.map((skill) => {
        return (
          <li key={skill.id}>
            <Typography
              variant="h5"
              color="primary"
              style={{ marginBottom: "5px" }}
            >
              {skill.skillSetTitle}
              <br />
            </Typography>
            <Typography
              variant="subtitle1"
              style={{ color: theme.palette.text.secondary }}
            >
              {skill.data.map((skillData, index) => (
                <>
                  {skillData}{" "}
                  {index != skill.data.length - 1 ? (
                    <>&nbsp;&nbsp; ○ &nbsp;&nbsp;</>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </Typography>
            <br />
          </li>
        );
      })}
    </ul>
  );

  const buildContent = () => {
    return skillSetList.length == 0 ? (
      <TryAgain message="Unable to fetch skills!" callback={getSkillSetData} />
    ) : isSmallMobile ? (
      mobileView()
    ) : (
      webView()
    );
  };

  return isLoading ? <p>Loading...</p> : buildContent();
}

const useStyles = makeStyles((theme) => ({
  body: {
    textAlign: "left",
  },
}));

export default Skills;