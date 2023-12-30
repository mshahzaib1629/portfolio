import ReactGA from "react-ga4";

export const initGA = (measurementId) => {
  ReactGA.initialize(measurementId, {});
};

export const GAPageView = (page) => {
  ReactGA.send({ hitType: "pageview", page });
};

export const GASendEvent = (value, name) => {
  const options = {
    category: "Click",
    action: value,
    label: name ? name : value,
  };
  ReactGA.event(options);
};

export const injectGA = () => {
  if (typeof window == "undefined") {
    return;
  }
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", process.env.REACT_APP_MEASUREMENT_ID);
};
