import React, { lazy } from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { Routes, Route } from "react-router-dom";
const MainHome = lazy(() => import("./pages/MainHome"));
const Navbar = lazy(() => import("./components/Navbar"));
const Social = lazy(() => import("./components/Social"));
const Footer = lazy(() => import("./components/Footer"));
const Loader = lazy(() => import("./components/Loader"));

const AppRoutes = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Loader />
      <Navbar />
      {!isMobile && <Social />}
      <Routes>
        <Route exact path="/" element={<MainHome />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
