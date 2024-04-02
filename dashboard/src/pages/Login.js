import {
    Button,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { React, useState } from "react";
import axios from "axios";
import "./Login.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

function Login() {
    const [initialData, setInitialData] = useState({
        email: "",
        password: "",
    });
    const [user, setUser] = useState(initialData);

    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:1337/login",
                user
            );

            const result = response.data;

            if (result.success) {
                //route to another page
            }
            alert(result.message);
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occured. Please try again.");
        }
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name || e.target.id]: e.target.value,
        });
    };

    return (
        <div className="logincontent">
            <Card className="logincard">
                <CardContent className="logincardcontent">
                    <Typography variant="h5">WELCOME BACK</Typography>

                    <form className="loginform" onSubmit={handleLogin}>
                        <TextField
                            id="email"
                            className="email"
                            required
                            label="Email"
                            variant="outlined"
                            value={user.email}
                            onChange={handleChange}
                        />

                        <TextField
                            id="password"
                            className="password"
                            type={showPassword ? "text" : "password"}
                            required
                            label="Password"
                            variant="outlined"
                            value={user.password}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={
                                                handleTogglePasswordVisibility
                                            }
                                        >
                                            {showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            className="addbutton"
                            variant="contained"
                            type="submit"
                        >
                            SIGN IN
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;