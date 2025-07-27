import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initializeAnalytics = () => {
    ReactGA.initialize('G-D4E1WEPBTC');
    
    // Track time spent on page
    trackTimeSpent();
};

// Log page views
export const logPageView = (page) => {
    ReactGA.send({ hitType: 'pageview', page });
};

// Track section views
export const trackSectionView = (sectionId, sectionName) => {
    ReactGA.event({
        category: 'Section',
        action: 'View',
        label: sectionName || sectionId,
        value: Date.now() // Timestamp for when section was viewed
    });
};

// Track time spent on page
const trackTimeSpent = () => {
    // Store the start time when page loads
    const startTime = Date.now();
    
    // When user leaves or closes the tab, send the total time spent
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000); // Time in seconds
        
        ReactGA.event({
            category: 'Engagement',
            action: 'Time Spent',
            label: 'Total',
            value: timeSpent
        });
    });
};

// Track section time spent
export const createSectionTimeTracker = () => {
    const sectionTimes = {};
    const sectionEntryTimes = {};
    
    // Observe sections entering and leaving viewport
    return {
        enterSection: (sectionId) => {
            sectionEntryTimes[sectionId] = Date.now();
        },
        leaveSection: (sectionId, sectionName) => {
            if (sectionEntryTimes[sectionId]) {
                const timeSpent = Math.floor((Date.now() - sectionEntryTimes[sectionId]) / 1000);
                sectionTimes[sectionId] = (sectionTimes[sectionId] || 0) + timeSpent;
                
                ReactGA.event({
                    category: 'Section',
                    action: 'Time Spent',
                    label: sectionName || sectionId,
                    value: timeSpent
                });
                
                delete sectionEntryTimes[sectionId];
            }
        },
        reportAllSectionTimes: () => {
            // Report all section times when leaving the page
            Object.keys(sectionEntryTimes).forEach(sectionId => {
                const timeSpent = Math.floor((Date.now() - sectionEntryTimes[sectionId]) / 1000);
                sectionTimes[sectionId] = (sectionTimes[sectionId] || 0) + timeSpent;
                
                ReactGA.event({
                    category: 'Section',
                    action: 'Time Spent',
                    label: sectionId,
                    value: sectionTimes[sectionId]
                });
            });
        }
    };
};