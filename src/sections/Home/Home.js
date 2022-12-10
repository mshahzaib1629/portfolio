import React, { useContext, useEffect } from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-scroll";
import HomeContainer from "../../containers/HomeContainer";
import { useTranslation } from "react-i18next";
import loaderContext from "../../contexts/loaderContext";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfileThunk } from "../../redux/slices/profileSlice";
import { fetchExperienceThunk } from "../../redux/slices/experienceSlice";
import {
  fetchFeaturedProjectThunk,
  fetchProjectThunk,
} from "../../redux/slices/projectSlice";
import { fetchEducationThunk } from "../../redux/slices/educationSlice";
import { fetchFeaturedCertificationThunk } from "../../redux/slices/certificationSlice";
import { fetchSkillSetThunk } from "../../redux/slices/skillSetSlice";
import TryAgain from "../../components/TryAgain";

const Home = () => {
  const classes = useStyles();
  const { appLoading } = useContext(loaderContext);
  const controls = useAnimation();
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

  async function getExperienceData() {
    try {
      await dispatch(fetchExperienceThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function getProjectsData() {
    try {
      await dispatch(fetchFeaturedProjectThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function getEducationData() {
    try {
      await dispatch(fetchEducationThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function getCertificationData() {
    try {
      await dispatch(fetchFeaturedCertificationThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function getSkillsetData() {
    try {
      await dispatch(fetchSkillSetThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function getPortfolioData() {
    try {
      if (profile == null) {
        await getProfileData();
      }
      await getExperienceData();
      await getProjectsData();
      await getEducationData();
      await getCertificationData();
      await getSkillsetData();
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    getPortfolioData();
  }, []);

  useEffect(() => {
    if (!appLoading) {
      controls.start((i) => ({
        y: 0,
        opacity: 1,
        transition: { delay: i * 0.1 + 1.2 },
      }));
    } else {
      controls.start({ opacity: 0, y: 5 });
    }
  }, [appLoading, controls]);

  const buildView = () => (
    <div>
      <Typography
        component={motion.div}
        animate={controls}
        custom={0}
        color="primary"
        variant="h5"
        style={{ marginBottom: "0px" }}
      >
        {t("home_welcome")}
        <motion.div
          style={{ display: "inline-block" }}
          animate={{ rotate: [50, 90, 50] }}
          transition={{ repeat: Infinity, duration: 1.4, repeatDelay: 0.7 }}
        >
          👋
        </motion.div>
        , {t("home_i")}
      </Typography>
      <Typography
        component={motion.div}
        animate={controls}
        custom={0}
        color="text"
        variant="h5"
        className={classes.nameHeading}
      >
        {profile?.name}
      </Typography>

      <Typography
        component={motion.p}
        animate={controls}
        custom={2}
        variant="h2"
        color="primary"
        className={classes.subTitle}
      >
        {profile?.headline}
      </Typography>
      <Typography
        component={motion.p}
        animate={controls}
        custom={3}
        variant="body2"
        color="initial"
        style={{ marginBottom: "0" }}
      >
        {profile?.shortIntro}
      </Typography>
      <Typography
        component={motion.p}
        animate={controls}
        custom={4}
        variant="body1"
        color="initial"
        style={{ marginBottom: "30px" }}
      >
        Based in {profile?.location}
      </Typography>
      <motion.div animate={controls} custom={5}>
        <Button
          component={Link}
          spy
          smooth
          offset={0}
          duration={500}
          to="contact"
          variant="outlined"
          color="primary"
          size="large"
        >
          {t("home_contact_btn")}
        </Button>
      </motion.div>
    </div>
  );

  const buildContent = () =>
    profile == null ? (
      <TryAgain message="Something went wrong!" callback={getProfileData} />
    ) : (
      buildView()
    );

  return (
    <HomeContainer id="home">
      {isLoading ? <p>Loading...</p> : buildContent()}
    </HomeContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  nameHeading: {
    marginBottom: "0px",
    fontSize: "65px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "45px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "35px",
    },
  },
  subTitle: {
    marginBottom: "16px",
    fontSize: "45px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "25px",
    },
  },
}));

export default Home;
