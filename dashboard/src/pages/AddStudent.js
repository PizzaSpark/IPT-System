import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import React from "react";
import Sidebar from "./Sidebar";
import "./AddStudent.css";
import { useState } from "react";
import axios from 'axios';

function AddStudent() {
    const [initialData, setInitialData] = useState({
        id: "",
        firstname: "",
        lastname: "",
        middlename: "",
        course: "",
        year: "",
    });

    const [student, setStudent] = useState(initialData);

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

        setStudent({
            ...student,
            [e.target.name || e.target.id]: e.target.value,
        });
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:1337/addstudent", student);


            const result = response.data;
            
            if (result.success) {
                setStudent(initialData);
            }
            alert(result.message);
        } catch (error) {
            console.error("Error adding student:", error);
            alert("An error occured. Please try again.");
        }
    };

    return (
        <div className="container">
            <Sidebar />

            <div className="content">
                <h1>Add Student</h1>
                <form className="addstudentform" onSubmit={handleAddStudent}>
                    <TextField
                        id="id"
                        className="id"
                        required
                        inputProps={{
                            maxLength: 8,
                        }}
                        label="ID Number"
                        variant="outlined"
                        value={student.id}
                        onChange={handleChange}
                    />
                    <TextField
                        id="firstname"
                        required
                        label="First name"
                        variant="outlined"
                        value={student.firstname}
                        onChange={handleChange}
                    />
                    <TextField
                        id="lastname"
                        required
                        label="Last Name"
                        variant="outlined"
                        value={student.lastname}
                        onChange={handleChange}
                    />
                    <TextField
                        id="middlename"
                        label="Middle Name"
                        variant="outlined"
                        value={student.middlename}
                        onChange={handleChange}
                    />
                    <TextField
                        id="course"
                        required
                        label="Course"
                        variant="outlined"
                        value={student.course}
                        onChange={handleChange}
                    />

                    <FormControl variant="outlined">
                        <InputLabel>Year</InputLabel>
                        <Select
                            name="year"
                            value={student.year}
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

                    <Button className="addbutton" variant="contained" type="submit">
                        ADD
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default AddStudent;
