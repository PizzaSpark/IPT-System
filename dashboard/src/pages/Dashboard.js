import React from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";

function Dashboard() {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dcontent">
                <h1>Welcome to Saint Mary's University</h1>
            </div>
        </div>
    );
}

export default Dashboard;
