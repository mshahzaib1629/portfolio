import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { convertArrayToString } from "../../utils/common";
import { Launch } from "@material-ui/icons";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion } from "framer-motion";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FeaturedTag from "../../components/FeaturedTag";

function ExpandableRow(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { project } = props;
  const [openInfo, setOpenInfo] = React.useState(false);

  const toggleOpenInfo = () => {
    if (project.extendedOverview || project.overview) setOpenInfo(!openInfo);
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        key={project.id}
        id={project.id}
        component={motion.div}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          type: "just",
          stiffness: 100,
          damping: 20,
          when: "beforeChildren",
        }}
      >
        <TableCell>
          <Typography variant="subtitle1" className={classes.yearCell}>
            {project.year}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle1" className={classes.tableCell}>
            {project.title} &nbsp;{" "}
            {(project.extendedOverview || project.overview) && (
              <InfoOutlinedIcon
                style={{
                  color: openInfo
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  cursor: "pointer",
                }}
                fontSize="small"
                onClick={toggleOpenInfo}
              ></InfoOutlinedIcon>
            )}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle1" className={classes.tableCell}>
            {project.workedAt}
          </Typography>
        </TableCell>
        <TableCell style={{ width: "40%" }}>
          <Typography variant="subtitle1" className={classes.tableCell}>
            {convertArrayToString(project.technologies)}
          </Typography>
        </TableCell>
        <TableCell>
          {project.links?.url && (
            <a href={project.links?.url} target="_blank" rel="noreferrer">
              <Launch
                style={{ color: theme.palette.text.secondary }}
                fontSize="small"
              />
            </a>
          )}
          {project.links?.url && project.links?.code && <>&nbsp; &nbsp;</>}
          {project.links?.code && (
            <a href={project.links?.code} target="_blank" rel="noreferrer">
              <GitHubIcon
                style={{ color: theme.palette.text.secondary }}
                fontSize="small"
              />
            </a>
          )}
        </TableCell>
      </TableRow>
      <TableRow style={{ borderWidth: 0 }}>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, width: "100%" }}
          colSpan={24}
        >
          <Collapse in={openInfo} timeout="auto" unmountOnExit>
            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
              <Typography variant="subtitle1" className={classes.extendedCell}>
                {project.extendedOverview
                  ? project.extendedOverview
                  : project.overview}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function MobileExpandableRow(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { project } = props;
  const [openInfo, setOpenInfo] = React.useState(false);

  const toggleOpenInfo = () => {
    if (project.extendedOverview || project.overview) setOpenInfo(!openInfo);
  };

  return (
    <React.Fragment>
      <TableRow
        key={project.id}
        id={project.id}
        component={motion.div}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          type: "just",
          stiffness: 100,
          damping: 20,
          when: "beforeChildren",
        }}
      >
        <TableCell onClick={toggleOpenInfo} style={{ cursor: "pointer" }}>
          <Typography variant="subtitle1" className={classes.yearCell}>
            {project.year}
          </Typography>
        </TableCell>
        <TableCell onClick={toggleOpenInfo} style={{ cursor: "pointer" }}>
          <Typography variant="subtitle1" className={classes.tableCell}>
            {project.title}
          </Typography>
        </TableCell>
        <TableCell>
          {project.links?.url && (
            <a href={project.links?.url} target="_blank" rel="noreferrer">
              <Launch
                style={{ color: theme.palette.text.secondary }}
                fontSize="small"
              />
            </a>
          )}
          {project.links?.url && project.links?.code && <>&nbsp; &nbsp;</>}
          {project.links?.code && (
            <a href={project.links?.code} target="_blank" rel="noreferrer">
              <GitHubIcon
                style={{ color: theme.palette.text.secondary }}
                fontSize="small"
              />
            </a>
          )}
        </TableCell>
      </TableRow>
      <TableRow style={{ borderWidth: 0 }}>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, width: "100%" }}
          colSpan={24}
        >
          <Collapse in={openInfo} timeout="auto" unmountOnExit>
            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
              <Typography variant="subtitle1" className={classes.extendedCell}>
                {project.extendedOverview
                  ? project.extendedOverview
                  : project.overview}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(0, 4),
    whiteSpace: "nowrap",
  },
  tableHead: {
    color: theme.palette.text.secondary,
  },
  yearCell: {
    color: theme.palette.primary.main,
  },
  tableCell: {
    color: theme.palette.text.secondary,
  },
  extendedCell: {
    color: theme.palette.text.secondary,
    textAlign: "justify",
  },
}));

export { ExpandableRow, MobileExpandableRow };
