import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core";

const ExpandableText = ({ text, maxLength }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [showFullText, setShowFullText] = useState(false);
  const diffThreshold = 100;
  const displayText = showFullText
    ? text
    : text.length - maxLength > diffThreshold
    ? text.slice(0, maxLength)
    : text;

  return (
    <>
      {displayText}
      {text.length - maxLength > diffThreshold && (
        <span>
          {!showFullText && <span>...</span>}{" "}
          <span
            onClick={() => {
              if (!showFullText) setShowFullText(true);
              else setShowFullText(false);
            }}
            className={classes.button}
          >
            {!showFullText ? "show more" : "show less"}
          </span>
        </span>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    color: "RGB(9, 113, 217)",
    fontWeight: "normal",
    cursor: "pointer",
  },
}));

export default ExpandableText;
