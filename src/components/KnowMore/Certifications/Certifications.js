import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  useTheme,
  Button,
  Box,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeaturedCertificationThunk } from "../../../redux/slices/certificationSlice";
import TryAgain from "../../TryAgain";
import { useNavigate } from "react-router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Certifications() {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
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
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Card
                id="view-all"
                isLast={true} // Set isLast prop to true for the "View All" card
              />
            </Grid>
          </Grid>
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

const useStyles = makeStyles((theme) => ({
  galleryContainer: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
    width: "100%",
    margin: "0 auto",
  },
  item: {
    flex: "0 0 auto",
    width: "400px",
    height: "100%",
    margin: "0 8px", // Adjust the margin as needed
  },
  scrollContainer: {
    // overflowX: "scroll",
    "-webkit-overflow-scrolling": "touch",
    scrollSnapType: "x mandatory",
  },
}));

export default Certifications;
