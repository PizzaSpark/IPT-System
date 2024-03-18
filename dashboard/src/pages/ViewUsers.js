import React from "react";
import "./ViewUsers.css";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Modal,
    Box,
    Table,
    TableContainer,
    TextField,
    InputAdornment,
    IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
function ViewUsers() {
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        middlename: "",
        email: "",
        password: "",
    });

    const openModal = (data, isEdit = false) => {
        setSelectedData(data);
        setIsEditMode(isEdit);
        setModalState(true);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const closeModal = () => {
        setModalState(false);
        setShowPassword(false);
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name || e.target.id]: e.target.value,
        });
    };

    useEffect(() => {
        axios
            .get(`http://localhost:1337/viewusers`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [refreshData]);

    const handleAddData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:1337/adduser",
                user
            );

            const result = await response.data;

            if (result.success) {
                setRefreshData(!refreshData);
                setModalState(false);
            }
            alert(result.message);
        } catch (error) {
            console.error("Error adding user:", error);
            alert("An error occured. Please try again.");
        }
    };

    const handleUpdateData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:1337/updateuser",
                selectedData
            );

            const result = response.data;

            if (result.success) {
                alert(result.message);
                setRefreshData(!refreshData);
                setModalState(false);
            } else {
                alert("Failed to update user. Please try again!.");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert("An error occured. Please try again.");
        }
    };

    return (
        <div className="container">
            <Sidebar />

            <div className="content">
                <h1>View Users</h1>

                <Button
                    className="tablebutton"
                    variant="contained"
                    onClick={() => openModal(data, false)}
                >
                    ADD USER
                </Button>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Middle Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>EDIT</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((data) => (
                                <TableRow key={data.email}>
                                    <TableCell>{data.firstname}</TableCell>
                                    <TableCell>{data.lastname}</TableCell>
                                    <TableCell>{data.middlename}</TableCell>
                                    <TableCell>{data.email}</TableCell>

                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            onClick={() =>
                                                openModal(data, true)
                                            }
                                        >
                                            EDIT
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Modal open={modalState} onClose={closeModal}>
                    <Box className="modal">
                        {/* it will only render the typography if not null */}
                        {selectedData && (
                            <form className="modalform" onSubmit={isEditMode ? handleUpdateData : handleAddData}>
                                <TextField
                                    id="firstname"
                                    required
                                    label="first name"
                                    variant="outlined"
                                    value={selectedData.firstname}
                                    onChange={handleChange}
                                />

                                <TextField
                                    id="lastname"
                                    required
                                    label="last name"
                                    variant="outlined"
                                    value={selectedData.lastname}
                                    onChange={handleChange}
                                />

                                <TextField
                                    id="middlename"
                                    required
                                    label="middle name"
                                    variant="outlined"
                                    value={selectedData.middlename}
                                    onChange={handleChange}
                                />

                                <TextField
                                    id="email"
                                    required
                                    disabled={isEditMode}
                                    label="email"
                                    variant="outlined"
                                    value={selectedData.email}
                                    onChange={handleChange}
                                />

                                <TextField
                                    id="password"
                                    required
                                    label="password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    value={selectedData.password}
                                    onChange={handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleTogglePasswordVisibility}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <div className="buttonsmodal">
                                    <Button
                                        className="formbutton"
                                        variant="contained"
                                        type="submit"
                                    >
                                        {isEditMode ? "UPDATE" : "ADD"}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default ViewUsers;
