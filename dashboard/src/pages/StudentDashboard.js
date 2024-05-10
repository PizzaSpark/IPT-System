import React from "react";

export default function StudentDashboard() {
    const initialData = {
        id: "",
        firstname: "",
        lastname: "",
        middlename: "",
        course: "",
        year: "",
        password: "",
    };
    const [studentData, setStudentData] = useState(initialData);

    useEffect(() => {
        fetchStudentData();
    }, []);

    const fetchStudentData = async () => {
        const studentId = localStorage.getItem("studentId");
        const response = await axios.post("http://localhost:1337/studentinfo", {
            id: studentId,
        });
        setStudentData(response.data);
    };

    return (
        <div>
            <div className="container">
                <Sidebar />
                <div className="content">
                    <h1>YOUR STUDENT INFO</h1>
                    {studentData && (
                        <div>
                            <p>ID: {studentData.id}</p>
                            <p>First Name: {studentData.firstname}</p>
                            <p>Last Name: {studentData.lastname}</p>
                            <p>Middle Name: {studentData.middlename}</p>
                            <p>Course: {studentData.course}</p>
                            <p>Year: {studentData.year}</p>
                            <p>Password: {studentData.password}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
