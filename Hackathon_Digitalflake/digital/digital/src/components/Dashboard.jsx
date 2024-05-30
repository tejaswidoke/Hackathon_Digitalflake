// src/Dashboard.js


import '../style/Dashboard.css';
import Sidebar from './Sidebar';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="content">
                <h1>Welcome to the Dashboard</h1>
                <p>This is the main content area.</p>
            </div>
        </div>
    );
};

export default Dashboard;
