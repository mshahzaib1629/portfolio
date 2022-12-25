import React from "react";
import Projects from "../../sections/Projects";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FullPageContainer from "../../containers/FullPageContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProjectThunk,
  resetProjectAction,
} from "../../redux/slices/projectSlice";
import TryAgain from "../../components/TryAgain";
import { Typography } from "@material-ui/core";
import { convertArrayToString } from "../../utils/common";
import { useState, useEffect } from "react";
import { Launch } from "@material-ui/icons";
import GitHubIcon from "@mui/icons-material/GitHub";
import BackdropLoading from "../../components/BackdropLoading";
import FeaturedTag from "../../components/FeaturedTag";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const AllProjects = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectList, isLoading } = useSelector((state) => state.project);

  async function getProjectData() {
    try {
      dispatch(resetProjectAction());
      await dispatch(fetchProjectThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    getProjectData();
  }, []);

  function webView() {
    return (
      <Table size="medium">
        <TableHead>
          <TableRow
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.08,
              type: "just",
              stiffness: 100,
              damping: 20,
              when: "beforeChildren",
            }}
          >
            <TableCell>
              <Typography variant="h6" className={classes.tableHead}>
                Year
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" className={classes.tableHead}>
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" className={classes.tableHead}>
                Built At
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" className={classes.tableHead}>
                Built With
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" className={classes.tableHead}>
                Links
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectList?.map((project) => (
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
              <TableCell>
                <Typography variant="subtitle1" className={classes.yearCell}>
                  {project.year}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" className={classes.tableCell}>
                  {project.title} &nbsp; {project.isFeatured && <FeaturedTag />}
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
                {project.links?.url && project.links?.code && (
                  <>&nbsp; &nbsp;</>
                )}
                {project.links?.code && (
                  <a
                    href={project.links?.code}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon
                      style={{ color: theme.palette.text.secondary }}
                      fontSize="small"
                    />
                  </a>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  function mobileView() {
    return (
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6" className={classes.tableHead}>
                Year
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" className={classes.tableHead}>
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" className={classes.tableHead}>
                Links
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectList?.map((project) => (
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
              <TableCell>
                <Typography variant="subtitle1" className={classes.yearCell}>
                  {project.year}
                </Typography>
              </TableCell>
              <TableCell>
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
                {project.links?.url && project.links?.code && (
                  <>&nbsp; &nbsp;</>
                )}
                {project.links?.code && (
                  <a
                    href={project.links?.code}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon
                      style={{ color: theme.palette.text.secondary }}
                      fontSize="small"
                    />
                  </a>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  function buildContent() {
    return !isLoading ? (isMobile ? mobileView() : webView()) : null;
  }

  return (
    <FullPageContainer>
      <BackdropLoading isLoading={isLoading} />
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <ArrowBackIcon
          style={{ cursor: "pointer", color: theme.palette.text.secondary }}
          onClick={() => navigate("/")}
        />
        <Typography variant="h4" color="initial" className={classes.title}>
          All Projects
        </Typography>
      </div>
      {!isLoading && projectList.length === 0 ? (
        <TryAgain
          message="Unable to fetch projects!"
          callback={getProjectData}
        />
      ) : (
        buildContent()
      )}
    </FullPageContainer>
  );
};

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
}));

export default AllProjects;
