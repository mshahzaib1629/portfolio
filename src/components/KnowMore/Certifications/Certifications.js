import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  useTheme,
  Button,
  Box,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeaturedCertificationThunk } from "../../../redux/slices/certificationSlice";
import TryAgain from "../../TryAgain";
import { useNavigate } from "react-router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Certifications() {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const classes = useStyles(isMobile)();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { certificationList, isLoading } = useSelector(
    (state) => state.certification
  );

  async function getCertificationData() {
    try {
      await dispatch(fetchFeaturedCertificationThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const viewContent = () => {
    return (
      <>
        <div className={classes.scrollContainer}>
          <Grid container spacing={4} className={classes.galleryContainer}>
            {certificationList.map((item, k) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                key={item.id}
                classes={{ item: classes.item }}
              >
                <Card
                  id={item.id}
                  index={k}
                  title={item.title}
                  issuedBy={item.issuedBy}
                  type={item.type}
                  date={item.date}
                  imageUrl={item.imageUrl}
                  url={item.url}
                  isLast={false}
                />
              </Grid>
            ))}

            {!isMobile && (
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Card
                  id="view-all"
                  isLast={true} // Set isLast prop to true for the "View All" card
                />
              </Grid>
            )}
          </Grid>

          {isMobile && (
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                className={classes.loadBtn}
                onClick={() => {
                  navigate("/certificates");
                }}
                variant="outlined"
                color="primary"
              >
                View All &nbsp; <ArrowForwardIosIcon />
              </Button>
            </Box>
          )}
        </div>
      </>
    );
  };

  const buildContent = () =>
    certificationList.length === 0 ? (
      <TryAgain
        message="Unable to fetch certificates!"
        callback={getCertificationData}
      />
    ) : (
      viewContent()
    );

  return isLoading ? <p>Loading...</p> : buildContent();
}

const useStyles = (isMobile) =>
  makeStyles((theme) => ({
    galleryContainer: isMobile
      ? {
          overflow: "visible",
          width: "100%",
          margin: "0 auto",
        }
      : {
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "auto",
          width: "100%",
          margin: "0 auto",
        },
    item: isMobile
      ? {
          overflow: "visible",
        }
      : {
          flex: "0 0 auto",
          width: "400px",
          height: "100%",
          margin: "0 8px",
        },
    scrollContainer: {
      // overflowX: "scroll",
      "-webkit-overflow-scrolling": "touch",
      scrollSnapType: "x mandatory",
    },
    loadBtn: {
      width: "200px",
      fontSize: "20px",
      marginBottom: "8px",
    },
  }));

export default Certifications;
