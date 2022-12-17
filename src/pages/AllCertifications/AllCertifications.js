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
import { fetchCertificationThunk } from "../../redux/slices/certificationSlice";
import TryAgain from "../../components/TryAgain";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { convertArrayToString } from "../../utils/common";
import { useState, useEffect } from "react";
import { Launch } from "@material-ui/icons";
import GitHubIcon from "@mui/icons-material/GitHub";
import BackdropLoading from "../../components/BackdropLoading";
import FeaturedTag from "../../components/FeaturedTag";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";

const AllCertifications = () => {
  const theme = useTheme();
  const classes = useStyles();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { certificationList, isLoading } = useSelector(
    (state) => state.certification
  );
  async function getCertificationData() {
    try {
      await dispatch(fetchCertificationThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    getCertificationData();
  }, []);

  function webView() {
    return (
      <Table size="medium">
        <TableHead>
          <TableRow>
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
            <TableRow key={certificate.id} id={certificate.id}>
              <TableCell>
                <Typography variant="subtitle1" className={classes.yearCell}>
                  {certificate?.date?.month.shortName} {certificate?.date?.year}
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
    );
  }

  function mobileView() {
    return (
      <Table size="medium">
        <TableHead>
          <TableRow>
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
                Link
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {certificationList?.map((certificate) => (
            <TableRow key={certificate.id} id={certificate.id}>
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
    );
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
      {isMobile ? mobileView() : webView()}
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

export default AllCertifications;
