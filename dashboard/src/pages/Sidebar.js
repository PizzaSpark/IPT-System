import React from "react";
import "./Sidebar.css";
import { Add, Home, Info } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="items">
                    <Link to="/">
                        <div className="tilecontent">
                            <Home />
                            <p>HOME</p>
                        </div>
                    </Link>

                    <Link to="/addstudent">
                        <div className="tilecontent">
                            <Add />
                            <p>ADD STUDENT</p>
                        </div>
                    </Link>

                    <Link to="/viewstudents">
                        <div className="tilecontent">
                            <Info />
                            <p>VIEW STUDENTS</p>
                        </div>
                    </Link>

                    <Link to="/viewusers">
                        <div className="tilecontent">
                            <Info />
                            <p>VIEW USERS</p>
                        </div>
                    </Link>
            </div>
        </div>
    );
}

export default Sidebar;
