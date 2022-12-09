import {
  Grid,
  makeStyles,
  useTheme,
  useMediaQuery,
  Button,
  Box,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "./Card";
import { certificates } from "../../../data";
import { useSelector } from "react-redux";

function Certifications() {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const { certificationList, isLoading } = useSelector(
    (state) => state.certification
  );

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
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
              title={item.title}
              issuedBy={item.issuedBy}
              type={item.type}
              date={item.date}
              imageUrl={item.imageUrl}
              url={item.url}
            />
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          className={classes.loadBtn}
          onClick={() => {}}
          variant="contained"
          color="primary"
        >
          {t("project_load_btn")}
        </Button>
      </Box>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  galleryContainer: {
    overflow: "visible",
    width: "100%",
    margin: "0 auto",
  },
  item: {
    overflow: "visible",
  },
  loadBtn: {
    width: "200px",
  },
}));

export default Certifications;
