// src/analytics.js
import ReactGA from 'react-ga4';

export const initializeAnalytics = () => {
    ReactGA.initialize('G-N206YWSR2P'); // Replace with your Measurement ID
};

export const logPageView = (page) => {
    ReactGA.send({ hitType: 'pageview', page });
};
