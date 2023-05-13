import React from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import FullPageContainer from "../../containers/FullPageContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCertificationThunk,
  resetCertificationAction,
  changePageSizeAction,
} from "../../redux/slices/certificationSlice";
import TryAgain from "../../components/TryAgain";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState, useEffect } from "react";
import { Launch } from "@material-ui/icons";
import BackdropLoading from "../../components/BackdropLoading";
import FeaturedTag from "../../components/FeaturedTag";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@mui/material";

const AllCertifications = () => {
  const theme = useTheme();
  const classes = useStyles();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { certificationList, isLoading, totalCertificates, page, pageSize } =
    useSelector((state) => state.certification);

  async function getCertificationData() {
    try {
      dispatch(resetCertificationAction());
      await dispatch(fetchCertificationThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  function handlePageSize() {
    let newPageSize = 12;
    // setting dynamic size for PC screens
    if (window.innerWidth > 960) {
      const screenHeight = window.innerHeight;
      newPageSize = Math.floor(screenHeight * 0.011);
    }
    dispatch(changePageSizeAction(newPageSize));
  }

  useEffect(() => {
    handlePageSize();
    getCertificationData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  function webView() {
    return (
      <>
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
                  Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" className={classes.tableHead}>
                  Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" className={classes.tableHead}>
                  Issued By
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" className={classes.tableHead}>
                  Type
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" className={classes.tableHead}>
                  Link
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificationList?.map((certificate) => (
              <TableRow
                key={certificate.id}
                id={certificate.id}
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
                    {certificate?.date?.month.shortName}{" "}
                    {certificate?.date?.year}
                  </Typography>
                </TableCell>
                <TableCell style={{ width: "40%" }}>
                  <Typography variant="subtitle1" className={classes.tableCell}>
                    {certificate.title} &nbsp;
                    {certificate.isFeatured && <FeaturedTag />}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" className={classes.tableCell}>
                    {certificate.issuedBy}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" className={classes.tableCell}>
                    {certificate.type}
                  </Typography>
                </TableCell>
                <TableCell>
                  {certificate.url && (
                    <a href={certificate.url} target="_blank" rel="noreferrer">
                      <Launch
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
            disabled={(page + 1) * pageSize >= totalCertificates}
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
                  Link
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificationList?.map((certificate) => (
              <TableRow
                key={certificate.id}
                id={certificate.id}
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
                    {certificate?.date?.year}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" className={classes.tableCell}>
                    {certificate.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  {certificate.url && (
                    <a href={certificate.url} target="_blank" rel="noreferrer">
                      <Launch
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
            disabled={(page + 1) * pageSize >= totalCertificates}
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
    dispatch(fetchCertificationThunk(pageDirection));
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
          All Certificates
        </Typography>
      </div>
      {!isLoading && certificationList.length === 0 ? (
        <TryAgain
          message="Unable to fetch certificates!"
          callback={getCertificationData}
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

export default AllCertifications;
