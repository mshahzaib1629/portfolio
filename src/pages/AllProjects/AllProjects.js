import React from "react";
import Projects from "../../sections/Projects";
import { useMediaQuery, useTheme } from "@material-ui/core";
import FullPageContainer from "../../containers/FullPageContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectThunk } from "../../redux/slices/projectSlice";
import TryAgain from "../../components/TryAgain";
import { makeStyles, Typography } from "@material-ui/core";
import { convertArrayToString } from "../../utils/common";
import { useState, useEffect } from "react";
import { Launch } from "@material-ui/icons";
import GitHubIcon from "@mui/icons-material/GitHub";
import BackdropLoading from "../../components/BackdropLoading";
import FeaturedTag from "../../components/FeaturedTag";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";

const AllProjects = () => {
  const theme = useTheme();
  const classes = useStyles();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectList, isLoading } = useSelector((state) => state.project);
  async function getProjectData() {
    try {
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
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Worked At</TableCell>
            <TableCell>Built With</TableCell>
            <TableCell>Links</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectList?.map((project) => (
            <TableRow key={project.id} id={project.id}>
              <TableCell>{project.year}</TableCell>
              <TableCell>
                {project.title} {project.isFeatured && <FeaturedTag />}
              </TableCell>
              <TableCell>{project.workedAt}</TableCell>
              <TableCell style={{ width: "40%" }}>
                {convertArrayToString(project.technologies)}
              </TableCell>
              <TableCell>
                {project.links?.url && (
                  <a href={project.links?.url} target="_blank" rel="noreferrer">
                    <Launch fontSize="small" />
                  </a>
                )}
                &nbsp; &nbsp;
                {project.links?.code && (
                  <a
                    href={project.links?.code}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon fontSize="small" />
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
            <TableCell>Year</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Links</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectList?.map((project) => (
            <TableRow key={project.id} id={project.id}>
              <TableCell>{project.year}</TableCell>
              <TableCell>{project.title}</TableCell>
              <TableCell>
                {project.links?.url && (
                  <a href={project.links?.url} target="_blank" rel="noreferrer">
                    <Launch fontSize="small" />
                  </a>
                )}
                &nbsp; &nbsp;
                {project.links?.code && (
                  <a
                    href={project.links?.code}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon fontSize="small" />
                  </a>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <FullPageContainer>
      <BackdropLoading isLoading={isLoading} />
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <ArrowBackIcon
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <Typography variant="h4" color="initial" className={classes.title}>
          All Projects
        </Typography>
      </div>
      {isMobile ? mobileView() : webView()}
    </FullPageContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(0, 4),
    whiteSpace: "nowrap",
  },
}));

export default AllProjects;
