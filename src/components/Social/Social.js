import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import { LinkedIn, GitHub, Email, WhatsApp } from "@material-ui/icons";
import IconBtn from "../IconBtn";
import DarkModeSwitcher from "../DarkModeSwitcher";
import loaderContext from "../../contexts/loaderContext";
import { useSelector } from "react-redux";
import { GASendEvent } from "../../utils/googleAnalytics";

const Social = ({ mobile }) => {
  const classes = useStyles();
  const { isLoading } = useContext(loaderContext);
  const controls = useAnimation();
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.8 + i * 0.1,
      },
    }));
  }, [controls]);

  const socialMediaList = [
    {
      icon: GitHub,
      link: profile?.social?.github,
      name: "GitHub",
    },
    {
      icon: WhatsApp,
      link: `https://wa.me/${profile?.social?.whatsApp}?text=Hi%20${profile?.nickname}!%0AI%27m%20`,
      name: "WhatsApp",
    },
    {
      icon: LinkedIn,
      link: profile?.social?.linkedIn,
      name: "LinkedIn",
    },
    {
      icon: Email,
      link: "mailto:" + profile?.social?.email,
      name: "Email",
    },
  ];
  if (mobile) {
    return (
      <div className={classes.mobileWrapper}>
        {socialMediaList.map((social, index) => (
          <a
            key={index}
            href={social.link}
            target={"_blank"}
            rel="noreferrer"
            onClick={() => {
              GASendEvent(`NavigatedTo${social.name}`);
            }}
          >
            <IconBtn icon={social.icon} m={1} />
          </a>
        ))}
      </div>
    );
  } else {
    return (
      <motion.div className={classes.wrapper}>
        {socialMediaList.map((social, index) => (
          <motion.div
            key={index}
            animate={controls}
            custom={0}
            className={classes.socialIcon}
          >
            <a
              href={social.link}
              target={"_blank"}
              rel="noreferrer"
              onClick={() => {
                GASendEvent(`NavigatedTo${social.name}`);
              }}
            >
              <IconBtn icon={social.icon} m={1} />
            </a>
          </motion.div>
        ))}
        {/* <motion.div animate={controls} custom={4} className={classes.socialIcon}>
                    <DarkModeSwitcher />
                </motion.div> */}
      </motion.div>
    );
  }
};

const useStyles = makeStyles((theme) => ({
  socialIcon: {
    marginBottom: "5px",
    "&:hover": {
      marginBottom: "10px",
    },
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    position: "fixed",
    bottom: 0,
    right: 0,
    padding: theme.spacing(2),
    zIndex: 100,
  },
  mobileWrapper: {
    display: "flex",
  },
}));

export default Social;
