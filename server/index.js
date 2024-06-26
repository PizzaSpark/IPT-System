const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Student = require("./models/student.model");
const path = require("path");
app.use(cors());
app.use(bodyParser.json());

const port = 1337;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

//MARK: OLD STUDENT
//add
app.post("/addstudent", (req, res) => {
    const studentData = req.body;

    let existingData = [];

    const filePath = path.join(__dirname, "students.json");

    try {
        if (fs.existsSync(filePath)) {
            existingData = JSON.parse(fs.readFileSync(filePath));
        } else {
            fs.writeFileSync(filePath, JSON.stringify([]));
            existingData = [];
        }
    } catch (error) {
        console.error("Error reading student data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

    const studentIndex = existingData.findIndex(
        (student) => student.id === studentData.id
    );

    if (studentIndex !== -1) {
        res.json({
            success: false,
            message: "Student ID already exists for a student",
        });
    } else {
        existingData.push(studentData);

        fs.writeFileSync(
            "students.json",
            JSON.stringify(existingData, null, 2)
        );

        res.json({ success: true, message: "Student added successfully!" });
    }
});

//update
app.post("/updatestudent", async (req, res) => {
    const studentData = req.body;

    let existingData = [];
    try {
        existingData = JSON.parse(fs.readFileSync("students.json"));
    } catch (error) {
        console.error("Error reading student data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

    const studentIndex = existingData.findIndex(
        (student) => student.id === studentData.id
    );

    if (studentIndex !== -1) {
        existingData[studentIndex] = studentData;

        fs.writeFileSync(
            "students.json",
            JSON.stringify(existingData, null, 2)
        );

        res.json({ success: true, message: "Student updated successfully!" });
    } else {
        res.json({ success: false, message: "Student not found" });
    }
});

//read
app.get("/viewstudents", (req, res) => {
    try {
        const filePath = path.join(__dirname, "students.json");

        try {
            if (fs.existsSync(filePath)) {
                existingData = JSON.parse(fs.readFileSync(filePath));
            } else {
                fs.writeFileSync(filePath, JSON.stringify([]));
                existingData = [];
            }
        } catch (error) {
            console.error("Error reading student data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }

        const studentData = JSON.parse(fs.readFileSync("students.json"));
        res.json(studentData);
    } catch (error) {
        console.error("Error reading student data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//delete
app.post("/deletestudent", async (req, res) => {
    const newData = req.body;

    let existingData = [];
    try {
        existingData = JSON.parse(fs.readFileSync("databank.json"));
    } catch (error) {
        console.error("Error reading student data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

    const dataIndex = existingData.findIndex((data) => data.id === newData.id);

    if (dataIndex !== -1) {
        existingData.splice(dataIndex, 1);

        fs.writeFileSync(
            "databank.json",
            JSON.stringify(existingData, null, 2)
        );

        res.json({ success: true, message: "Student deleted successfully!" });
    } else {
        res.json({ success: false, message: "Student not found" });
    }
});

mongoose
    .connect("mongodb://localhost:27017/ipt")
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection error", err));

//MARK: MANAGE USERS
//add user
app.post("/adduser", async (req, res) => {
    const incomingData = req.body;

    try {
        const user = new User(incomingData);
        await user.save();
        res.json({ success: true, message: "User added successfully!" });
    } catch (error) {
        console.error("Error adding User:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//read users
app.get("/viewusers", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error("Error reading student data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//update user
app.post("/updateuser", async (req, res) => {
    const incomingData = req.body;

    try {
        const user = await User.findOne({ email: incomingData.email });
        if (!user) {
            res.json({ success: false, message: "User not found" });
        } else {
            Object.assign(user, incomingData);
            await user.save();
            res.json({ success: true, message: "User updated successfully!" });
        }
    } catch (error) {
        console.error("Error updating User:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//MARK: AUTH
//login user
app.post("/login", async (req, res) => {
    const incomingData = req.body;
    try {
        const user = await User.findOne({ email: incomingData.identifier });
        const student = await Student.findOne({ id: incomingData.identifier });

        const account = user || student;
        const role = user ? "user" : "student";
        if (!account) {
            return res.json({ message: "User not found" });
        }

        if (incomingData.password !== account.password) {
            return res.json({ message: "Invalid password" });
        }

        res.json({
            success: true,
            message: "Logged in successfully",
            role: role,
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//signup
app.post("/signup", async (req, res) => {
    const incomingData = req.body;

    try {
        const user = new User(incomingData);
        await user.save();
        res.json({ success: true, message: "User signed up successfully!" });
    } catch (error) {
        console.error("Error adding User:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//MARK: MANAGE STUDENTS
//add student
app.post("/addstudentmongo", async (req, res) => {
    const incomingData = req.body;

    try {
        const user = new Student(incomingData);
        await user.save();
        res.json({ success: true, message: "Student added successfully!" });
    } catch (error) {
        console.error("Error adding User:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//read students
app.get("/viewstudentsmongo", async (req, res) => {
    try {
        const users = await Student.find({});
        res.json(users);
    } catch (error) {
        console.error("Error reading student data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//update student
app.post("/updatestudentmongo", async (req, res) => {
    const incomingData = req.body;

    try {
        const user = await Student.findOne({ id: incomingData.id });
        if (!user) {
            res.json({ success: false, message: "Student not found" });
        } else {
            Object.assign(user, incomingData);
            await user.save();
            res.json({
                success: true,
                message: "Student updated successfully!",
            });
        }
    } catch (error) {
        console.error("Error updating User:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/studentinfo", async (req, res) => {
    const incomingData = req.body;

    try {
        const student = await Student.findOne({ id: incomingData.id });
        if (!student) {
            res.status(404).json({
                success: false,
                message: "Student not found",
            });
        } else {
            res.json(student);
        }
    } catch (error) {
        console.error("Error getting student data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
