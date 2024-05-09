import { React, useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";

function Dashboard() {
    return (
        <div className="container">
            <Sidebar />
            <div className="content">
                <h1>Welcome to Saint Mary's University</h1>
            </div>
        </div>
    );
}

export default Dashboard;
