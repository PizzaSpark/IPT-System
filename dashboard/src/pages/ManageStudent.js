import React from "react";
import "./ManageStudent.css";
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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function ManageStudent() {
    const [dataList, setDataList] = useState([]);
    const [refreshDataList, setRefreshDataList] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    //MARK: INIT
    const initialData = {
        id: "",
        firstname: "",
        lastname: "",
        middlename: "",
        course: "",
        year: "",
        password: "",
    };

    const [currentData, setCurrentData] = useState(initialData);

    const openModal = (data, isEdit = false) => {
        setCurrentData(data);
        setIsEditMode(isEdit);
        setModalState(true);
    };

    const closeModal = () => {
        setModalState(false);
    };

    const handleChange = (e) => {
        setCurrentData({
            ...currentData,
            [e.target.name || e.target.id]: e.target.value,
        });
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:1337/viewstudentsmongo`)
            .then((response) => {
                setDataList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [refreshDataList]);

    const handleAddData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:1337/addstudentmongo",
                currentData
            );

            const result = await response.data;

            if (result.success) {
                setRefreshDataList(!refreshDataList);
                setModalState(false);
            }
            alert(result.message);
        } catch (error) {
            console.error("Error adding student:", error);
            alert("An error occured. Please try again.");
        }
    };

    const handleUpdateData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:1337/updatestudentmongo",
                currentData
            );

            const result = response.data;

            if (result.success) {
                alert(result.message);
                setRefreshDataList(!refreshDataList);
                setModalState(false);
            } else {
                alert("Failed to update student. Please try again!.");
            }
        } catch (error) {
            console.error("Error updating student:", error);
            alert("An error occured. Please try again.");
        }
    };

    //MARK: DISPLAY
    return (
        <div className="container">
            <Sidebar />

            <div className="content">
                <h1>Manage Students</h1>

                <Button
                    className="tablebutton"
                    variant="contained"
                    onClick={() => openModal(initialData, false)}
                >
                    ADD STUDENT
                </Button>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Middle Name</TableCell>
                                <TableCell>Course</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>EDIT</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataList.map((student) => (
                                <TableRow key={student.id}>
                                <TableCell>{student.id}</TableCell>
                                    <TableCell>{student.firstname}</TableCell>
                                    <TableCell>{student.lastname}</TableCell>
                                    <TableCell>{student.middlename}</TableCell>
                                    <TableCell>{student.course}</TableCell>
                                    <TableCell>{student.year}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            onClick={() =>
                                                openModal(student, true)
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

                {/* MARK: MODAL */}
                <Modal open={modalState} onClose={closeModal}>
                    <Box className="modal">
                        {/* it will only render the typography if not null */}
                        {currentData && (
                            <form
                                className="modalform"
                                onSubmit={
                                    isEditMode
                                        ? handleUpdateData
                                        : handleAddData
                                }
                            >
                                <TextField
                                    id="id"
                                    required
                                    label="ID"
                                    disabled={isEditMode}
                                    variant="outlined"
                                    value={currentData.id}
                                    onChange={handleChange}
                                />

                                <TextField
                                    id="firstname"
                                    required
                                    label="First Name"
                                    variant="outlined"
                                    value={currentData.firstname}
                                    onChange={handleChange}
                                />

                                <TextField
                                    id="lastname"
                                    required
                                    label="Last Name"
                                    variant="outlined"
                                    value={currentData.lastname}
                                    onChange={handleChange}
                                />

                                <TextField
                                    id="middlename"
                                    required
                                    label="Middle Name"
                                    variant="outlined"
                                    value={currentData.middlename}
                                    onChange={handleChange}
                                />

                                <TextField
                                    id="course"
                                    required
                                    label="Course"
                                    variant="outlined"
                                    value={currentData.course}
                                    onChange={handleChange}
                                />

                                <FormControl variant="outlined">
                                    <InputLabel>Year</InputLabel>
                                    <Select
                                        name="year"
                                        value={currentData.year}
                                        onChange={handleChange}
                                        label="year"
                                    >
                                        <MenuItem value="1">1</MenuItem>
                                        <MenuItem value="2">2</MenuItem>
                                        <MenuItem value="3">3</MenuItem>
                                        <MenuItem value="4">4</MenuItem>
                                        <MenuItem value="5">5</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField
                                    id="password"
                                    required
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    value={currentData.password}
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

export default ManageStudent;
