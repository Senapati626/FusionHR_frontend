import React from 'react';
import dashboardStyles from '../styles/Dashboard.module.css'

const Earnings = () => {
    return (
        <div className={dashboardStyles.dashboard_container}>
            <div className={dashboardStyles.dashboard_header}>
                <p>Referral Earnings</p>
            </div>
        </div>
    );
};

export default Earnings;