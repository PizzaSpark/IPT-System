import React from "react";
import "./Sidebar.css";
import { Home, PersonAddAlt1, ViewList } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="items">
                    <Link to="/dashboard">
                        <div className="tilecontent">
                            <Home />
                            <p>HOME</p>
                        </div>
                    </Link>

                    <Link to="/addstudent">
                        <div className="tilecontent">
                            <PersonAddAlt1 />
                            <p>ADD STUDENT</p>
                        </div>
                    </Link>

                    <Link to="/viewstudents">
                        <div className="tilecontent">
                            <ViewList />
                            <p>VIEW STUDENTS</p>
                        </div>
                    </Link>

                    <Link to="/viewusers">
                        <div className="tilecontent">
                            <ViewList />
                            <p>VIEW USERS</p>
                        </div>
                    </Link>

                    <Link to="/managestudents">
                        <div className="tilecontent">
                            <ViewList />
                            <p>MANAGE STUDENTS</p>
                        </div>
                    </Link>
            </div>
        </div>
    );
}

export default Sidebar;
