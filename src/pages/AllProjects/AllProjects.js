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
  changePageSizeAction,
} from "../../redux/slices/projectSlice";
import TryAgain from "../../components/TryAgain";
import { Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import BackdropLoading from "../../components/BackdropLoading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import {
  ExpandableRow,
  MobileExpandableRow,
} from "../../components/ExpandableRow/ExpandableRow";
import { Button } from "@mui/material";

const AllProjects = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectList, isLoading, totalProjects, page, pageSize } = useSelector(
    (state) => state.project
  );

  async function getProjectData() {
    try {
      dispatch(resetProjectAction());
      await dispatch(fetchProjectThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  function handlePageSize() {
    let newPageSize = 12;
    // setting dynamic size for PC screens
    if (window.innerWidth > 960) {
      const screenHeight = window.innerHeight;
      newPageSize = Math.floor(screenHeight * 0.009);
    }
    dispatch(changePageSizeAction(newPageSize));
  }

  useEffect(() => {
    handlePageSize();
    getProjectData();
  }, []);

  function webView() {
    return (
      <>
        <Table size="medium" aria-label="collapsible table">
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
              <ExpandableRow
                project={project}
                theme={theme}
                classes={classes}
              />
            ))}
          </TableBody>
        </Table>
        <div className={classes.paginationWeb}>
          <Button
            onClick={() => handlePageChange("prev")}
            disabled={page === 0}
            className={classes.paginationButton}
          >
            Previous
          </Button>
          <Button
            onClick={() => handlePageChange("next")}
            disabled={(page + 1) * pageSize >= totalProjects}
            className={classes.paginationButton}
          >
            Next
          </Button>
        </div>
      </>
    );
  }

  function mobileView() {
    return (
      <>
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
              <MobileExpandableRow project={project} />
            ))}
          </TableBody>
        </Table>
        <div className={classes.paginationMobile}>
          <Button
            onClick={() => handlePageChange("prev")}
            disabled={page === 0}
            className={classes.paginationButton}
          >
            Previous
          </Button>
          <Button
            onClick={() => handlePageChange("next")}
            disabled={(page + 1) * pageSize >= totalProjects}
            className={classes.paginationButton}
          >
            Next
          </Button>
        </div>
      </>
    );
  }

  function buildContent() {
    return !isLoading ? (isMobile ? mobileView() : webView()) : null;
  }

  function handlePageChange(pageDirection) {
    dispatch(fetchProjectThunk(pageDirection));
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
  paginationWeb: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "25px",
    gap: "10px",
  },
  paginationMobile: {
    display: "flex",
    justifyContent: "center",
    marginTop: "25px",
    gap: "10px",
  },
  paginationButton: {
    backgroundColor: "rgb(55, 55, 55) !important",
    color: theme.palette.text.secondary + " !important",
    padding: "10px 20px",

    "&:hover": {
      backgroundColor: theme.palette.primary.main + " !important",
    },
    "&:disabled": {
      opacity: 0.5,
    },
  },
}));

export default AllProjects;
