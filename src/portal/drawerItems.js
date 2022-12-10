import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import { protectedRoutes } from "../utils/routes";

const navStyle = ({ isActive }) => {
  return {
    textDecoration: "none",
    color: isActive ? "red" : "black",
    background: "#61fb69"
  };
};

export function mainListItems() {
  const routeItems = protectedRoutes.map((route) => {
    const IconComponent = route.navIcon;
    return (
      <NavLink to={route.path} key={route.path} style={navStyle}>
        <ListItemButton >
          <ListItemIcon>
            <IconComponent />
          </ListItemIcon>
          <ListItemText primary={route.title} />
        </ListItemButton>
      </NavLink>
    );
  });

  return <React.Fragment>{routeItems}</React.Fragment>;
}
