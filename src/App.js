import { useState, useEffect, Suspense } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { darkTheme, lightTheme } from "./assets/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import { useLocation } from "react-router-dom";
import AppRoutes from "./Routes";
import ThemeContext from "./contexts/themeContext";
import LoaderContext from "./contexts/loaderContext";
import Layout from "./portal/layout";
import LoginPage from "./portal/pages/login";
import initializeFirebaseSDKs from "./utils/firebase-setup";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  let [isAuthenticated, setIsAuthenticated] = useState(false);

  function initializeFireAuthListener () {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        signOut(getAuth());
        setIsAuthenticated(false);
      }
    });
  }

  useEffect(() => {
    // if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setIsDarkMode(true);
    // } else {
    //     setIsDarkMode(false);useHistory
    // }
    initializeFirebaseSDKs();
    initializeFireAuthListener();
  }, []);

  const renderPage = () => {
    console.log(location.pathname);
    let elementPage = <AppRoutes />;
    if (isAuthenticated) elementPage = <Layout />;
    else if (location.pathname === "/login") elementPage = <LoginPage />;
    return elementPage;
  };
  return (
    <Suspense fallback={<div></div>}>
      <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
          <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <ScrollToTop />
            {renderPage()}
          </ThemeProvider>
        </LoaderContext.Provider>
      </ThemeContext.Provider>
    </Suspense>
  );
}

export default App;
