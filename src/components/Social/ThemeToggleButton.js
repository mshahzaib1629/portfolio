import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { WbSunny, Brightness2 } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    toggleButton: {
      position: 'relative',
      width: 40,
      height: 40,
      padding: 8,
      backgroundColor: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    iconWrapper: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      position: 'absolute',
      width: '50%',
      height: '100%',
      transition: 'all 0.3s ease',
      fontSize: 30,
    },
    sunIcon: {
      left: 4,
      color: props => (props.isDarkMode ? '#666' : '#ffd700') + " !important",
    },
    moonIcon: {
      right: 4,
      color: props => (props.isDarkMode ? '#fff' : '#666') + " !important",
    }
  }));


const ThemeToggle = ({ isDarkMode, onToggle }) => {
  const classes = useStyles({ isDarkMode });

  return (
    <IconButton 
      className={classes.toggleButton}
      onClick={onToggle}
      aria-label="toggle theme"
    >
      <div className={classes.iconWrapper}>
        <WbSunny className={`${classes.icon} ${classes.sunIcon}`} />
        <Brightness2 className={`${classes.icon} ${classes.moonIcon}`} />
      </div>
    </IconButton>
  );
};

export default ThemeToggle