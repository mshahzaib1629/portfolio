import React, { lazy, useEffect } from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { GAPageView } from "./utils/googleAnalytics";
import AllProjects from "./pages/AllProjects";
import AllCertifications from "./pages/AllCertifications";

const MainHome = lazy(() => import("./pages/MainHome"));
const Navbar = lazy(() => import("./components/Navbar"));
const Social = lazy(() => import("./components/Social"));
const Footer = lazy(() => import("./components/Footer"));
const Loader = lazy(() => import("./components/Loader"));

const AppRoutes = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    GAPageView(location.pathname + location.search);
    if (!navigator.onLine) navigate("/404");
  }, [location]);

  return (
    <>
      {/* <Loader /> */}
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
