import { createTheme } from "@material-ui/core";
import typography from "./typography";

const baseTheme = {
    breakpoints: {
        values: {
            xs: 600,
            sm: 700,
            md: 960,
            lg: 1320,
            xl: 1920,
        },
    },
    navbarHeight: "70px",
    mobileNavbarHeight: "55px",
    typography,
    overrides: {
        MuiButton: {
            root: {
                textTransform: "none",
                fontSize: "16px",
            },
            text: {
                letterSpacing: "2px",
                borderRadius: 0,
                "&:hover": {
                    color: "rgb(230,230,230)",
                    backgroundColor: "inherit",
                },
            },
        },
    },
};

const darkTheme = createTheme({
    palette: {
        background: {
            default: "#1A1A1A",
            paper: "#242424"
        },
        primary: {
            main: "#BD3B22",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#373737",
            contrastText: "#FFFFFF",
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#C8C8C8",
            disabled: "#A9A9A9",
        },
        action: {
            disabled: "#464646",
            disabledBackground: "#969696",
        },
    },
    logoColor: "#FFFFFF",
    ...baseTheme
});

const lightTheme = createTheme({
    palette: {
        background: {
            default: "#F4F5F7",
            paper: "#e8e8e8"
        },
        primary: {
            main: "#0A76DB",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#dedede",
            contrastText: "#ffffff",
        },
        text: {
            primary: "#000",
            secondary: "#1e1e1e",
            disabled: "#8f8f8f",
        },
        action: {
            disabled: "#ff4f4f",
            disabledBackground: "#ff4f4f",
        },
    },
    backgroundSecondary: {
        bg : "#4c5f6f",
        text: "#e6e6e6 "
    },
    logoColor:"#6F4C5B",
    ...baseTheme,
});

export { darkTheme, lightTheme };
