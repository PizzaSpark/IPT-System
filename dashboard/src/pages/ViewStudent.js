import React from "react";
import "./ViewStudent.css";
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
    Typography,
    Box,
    Table,
    TableContainer,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";
import useAuthenticationCheck from '../auth/useAuthenticationCheck';

function ViewStudent() {
    //MARK: LOGIC
    const [students, setStudents] = useState([]);
    const [modalState, setModalState] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [refreshData, setRefreshData] = useState(false);
    //for modal
    useAuthenticationCheck();
    const handleOpen = (studentO) => {
        setCurrentStudent(studentO);
        setModalState(true);
        console.log(studentO);
    };

    const handleClose = () => {
        setModalState(false);
    };

    const handleChange = (e) => {
        if (e.target.id == "id") {
            const value = Number(e.target.value);
            if (!Number.isInteger(value)) {
                return;
            }
        } else if (
            ["firstname", "lastname", "middlename", "course"].includes(
                e.target.id
            )
        ) {
            const patternName = /^[a-zA-Z .-]+$/;
            if (!patternName.test(e.target.value) && e.target.value !== "") {
                return;
            }
        }

        setCurrentStudent({
            ...currentStudent,
            //e.target.name gets the name of the textfields and uses that for getting the value
            [e.target.name || e.target.id]: e.target.value,
        });
    };

    useEffect(() => {
        // Make an asynchronous GET request using axios
        axios
            .get(`http://localhost:1337/viewstudents`)
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.error("Error fetching student data:", error);
            });
    }, [refreshData]);

    const handleUpdateStudent = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:1337/updatestudent", currentStudent);

            const result = response.data;

            if (result.success) {
                alert(result.message);
                setRefreshData(!refreshData);
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
                <div className="titlerefresh">
                    <h1>View Students</h1>
                    <Refresh onClick={() => setRefreshData(!refreshData)} />
                </div>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell>firstname</TableCell>
                                <TableCell>lastname</TableCell>
                                <TableCell>middlename</TableCell>
                                <TableCell>course</TableCell>
                                <TableCell>year</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
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
                                            onClick={() => handleOpen(student)}
                                        >
                                            EDIT
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/*MARK: MODAL */}
                <Modal
                    open={modalState}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="modal">
                        {/* it will only render the typography if not null */}
                        {currentStudent && (
                            <form
                                onSubmit={handleUpdateStudent}
                                className="editfields"
                            >
                                <TextField
                                    id="id"
                                    disabled
                                    className="id"
                                    required
                                    inputProps={{
                                        maxLength: 8,
                                    }}
                                    label="ID Number"
                                    variant="outlined"
                                    value={currentStudent.id}
                                    onChange={handleChange}
                                />
                                <TextField
                                    id="firstname"
                                    required
                                    label="First name"
                                    variant="outlined"
                                    value={currentStudent.firstname}
                                    onChange={handleChange}
                                />
                                <TextField
                                    id="lastname"
                                    required
                                    label="Last Name"
                                    variant="outlined"
                                    value={currentStudent.lastname}
                                    onChange={handleChange}
                                />
                                <TextField
                                    id="middlename"
                                    label="Middle Name"
                                    variant="outlined"
                                    value={currentStudent.middlename}
                                    onChange={handleChange}
                                />
                                <TextField
                                    id="course"
                                    required
                                    label="Course"
                                    variant="outlined"
                                    value={currentStudent.course}
                                    onChange={handleChange}
                                />

                                <FormControl variant="outlined">
                                    <InputLabel>Year</InputLabel>
                                    <Select
                                        name="year"
                                        value={currentStudent.year}
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

                                <div className="buttonsmodal">
                                    <Button
                                        variant="contained"
                                        onClick={handleClose}
                                    >
                                        CLOSE
                                    </Button>
                                    <Button variant="contained" type="submit">
                                        UPDATE
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

export default ViewStudent;
