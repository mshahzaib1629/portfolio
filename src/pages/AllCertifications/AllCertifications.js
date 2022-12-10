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
import { makeStyles, Typography } from "@material-ui/core";
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
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>issuedBy</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {certificationList?.map((certificate) => (
            <TableRow key={certificate.id} id={certificate.id}>
              <TableCell>
                {certificate?.date?.month.shortName} {certificate?.date?.year}
              </TableCell>
              <TableCell style={{ width: "40%" }}>
                {certificate.title} {certificate.isFeatured && <FeaturedTag />}
              </TableCell>
              <TableCell>{certificate.issuedBy}</TableCell>
              <TableCell>{certificate.type}</TableCell>
              <TableCell>
                {certificate.url && (
                  <a href={certificate.url} target="_blank" rel="noreferrer">
                    <Launch fontSize="small" />
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
          {certificationList?.map((project) => (
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
          All Certificates
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

export default AllCertifications;
