import React from "react";
import "./Sidebar.css";
import { Home, PersonAddAlt1, ViewList } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Sidebar({ role = "user" }) {
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();

        localStorage.removeItem("role");
        localStorage.removeItem("studentId");

        navigate("/");
    };

    const LinkOrText = role === "user" ? Link : "div";

    return (
        <div className="sidebar">
            <div className="items">
                <LinkOrText to="/dashboard">
                    <div className="tilecontent">
                        <Home />
                        <p>HOME</p>
                    </div>
                </LinkOrText>

                <LinkOrText to="/addstudent">
                    <div className="tilecontent">
                        <PersonAddAlt1 />
                        <p>ADD STUDENT</p>
                    </div>
                </LinkOrText>

                <LinkOrText to="/viewstudents">
                    <div className="tilecontent">
                        <ViewList />
                        <p>VIEW STUDENTS</p>
                    </div>
                </LinkOrText>

                <LinkOrText to="/viewusers">
                    <div className="tilecontent">
                        <ViewList />
                        <p>VIEW USERS</p>
                    </div>
                </LinkOrText>

                <LinkOrText to="/managestudents">
                    <div className="tilecontent">
                        <ViewList />
                        <p>MANAGE STUDENTS</p>
                    </div>
                </LinkOrText>

                <div className="logout">
                    <Button variant="contained" onClick={handleLogout}>
                        LOGOUT
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
