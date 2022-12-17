import React, { lazy } from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { Routes, Route } from "react-router-dom";

import AllProjects from "./pages/AllProjects";
const MainHome = lazy(() => import("./pages/MainHome"));
const Navbar = lazy(() => import("./components/Navbar"));
const Social = lazy(() => import("./components/Social"));
const Footer = lazy(() => import("./components/Footer"));
const Loader = lazy(() => import("./components/Loader"));
const AllCertifications = import("./pages/AllCertifications");
// TODO: make AllCertifcations as casual import after testing dff b/w projects & certifications loading

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
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/certificates" element={<AllCertifications />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
