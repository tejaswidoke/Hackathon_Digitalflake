// src/Dashboard.js


import '../style/Dashboard.css';
import Sidebar from './Sidebar';
import home from "../assets/2.jpg";

const Home = () => {
    return (
        <div className="dashboard" style={{ display: 'grid', placeItems: 'center' }}>
            <Sidebar />
            <div className="content">
                <img src={home} alt="" />
            </div>
        </div>
    );
};

export default Home;
