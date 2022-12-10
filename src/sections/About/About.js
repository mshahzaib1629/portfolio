import React, { useEffect } from "react";
import {
  useTheme,
  Grid,
  Typography,
  makeStyles,
  Box,
  useMediaQuery,
} from "@material-ui/core";
import SectionContainer from "../../containers/SectionContainer";
import Avatar from "../../components/Avatar";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfileThunk } from "../../redux/slices/profileSlice";
import TryAgain from "../../components/TryAgain";

const About = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { profile, isLoading } = useSelector((state) => state.profile);

  async function getProfileData() {
    try {
      await dispatch(fetchProfileThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const buildView = () => (
    <Grid container spacing={0} alignItems="center" style={{ width: "100%" }}>
      {isMobile && (
        <Grid item xs={12} md={5} className={classes.gridItemWrapper}>
          <Box mb={6}>
            <Avatar profilePicture={profile?.imageUrl} />
          </Box>
        </Grid>
      )}
      <Grid
        item
        xs={12}
        md={7}
        className={classes.gridItemWrapper}
        style={{ flexDirection: "column", alignItems: "space-around" }}
      >
        <Box mb={4}>
          <Typography variant="body1" style={{ textAlign: "justify" }}>
            {profile?.about}
          </Typography>
          <br />
          {/* <Skills /> */}
        </Box>
      </Grid>
      {!isMobile && (
        <Grid item xs={12} md={5} className={classes.gridItemWrapper}>
          <Avatar profilePicture={profile?.imageUrl} />
        </Grid>
      )}
    </Grid>
  );

  const buildContent = () => {
    return profile === null ? (
      <TryAgain message="Unable to fetch profile!" callback={getProfileData} />
    ) : (
      buildView()
    );
  };

  return (
    <SectionContainer id="about" title={t("menu_about")} maxWidth="md">
      {isLoading ? <p>Loading...</p> : buildContent()}
    </SectionContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  gridItemWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default About;
