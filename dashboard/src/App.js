import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import ViewStudent from "./pages/ViewStudent";
import ViewUsers from "./pages/ViewUsers";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/addstudent" element= {<AddStudent />} />
                <Route path="/viewstudents" element= {<ViewStudent />} />
                <Route path="/viewusers" element= {<ViewUsers />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
