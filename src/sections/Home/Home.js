import React, { useContext, useEffect } from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-scroll";
import HomeContainer from "../../containers/HomeContainer";
import VideoLogo from "../../components/VideoLogo";
import { useTranslation } from "react-i18next";
import loaderContext from "../../contexts/loaderContext";

const Home = () => {
    const classes = useStyles();
    const { isLoading } = useContext(loaderContext);
    const controls = useAnimation();
    const { t } = useTranslation();

    useEffect(() => {
            controls.start((i) => ({
                y: 0,
                opacity: 1,
                transition: { delay: i * 0.1 + 1.2 },
            }));

    }, [controls]);

    return (
        <HomeContainer id="home">
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
                    Muhammad Shahzaib Minhas
                </Typography>
                
                <Typography
                    component={motion.p}
                    animate={controls}
                    custom={2}
                    variant="h2"
                    color="primary"
                    className={classes.subTitle}
                >
                    {t("my_interest")}
                </Typography>
                <Typography
                    component={motion.p}
                    animate={controls}
                    custom={3}
                    variant="body2"
                    color="initial"
                    style={{ marginBottom: "0" }}
                >
                    {t("home_job")}
                </Typography>
                <Typography
                    component={motion.p}
                    animate={controls}
                    custom={4}
                    variant="body1"
                    color="initial"
                    style={{ marginBottom: "30px" }}
                >
                    {t("home_location")}
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
