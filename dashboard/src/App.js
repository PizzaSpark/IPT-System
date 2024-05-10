import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import ViewStudent from "./pages/ViewStudent";
import ViewUsers from "./pages/ViewUsers";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ManageStudent from "./pages/ManageStudent";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/addstudent" element={<AddStudent />} />
                <Route path="/viewstudents" element={<ViewStudent />} />
                <Route path="/viewusers" element={<ViewUsers />} />
                <Route path="/managestudents" element={<ManageStudent />} />
                <Route path="/studentdashboard" element={<StudentDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
