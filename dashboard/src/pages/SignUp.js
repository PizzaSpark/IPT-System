import { React, useState } from "react";
import {
    Button,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import "./SignUp.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function SignUp() {
    //MARK: LOGIC
    const initialData = {
        firstname: "",
        lastname: "",
        middlename: "",
        email: "",
        password: "",
    };
    const [user, setUser] = useState(initialData);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const navigate = useNavigate();
    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    };
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name || e.target.id]: e.target.value,
        });
    };
    const handleRedirectToLogin = async (e) => {
        e.preventDefault();

        navigate("/");
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (user.password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:1337/signup",
                user
            );

            const result = response.data;

            if (result.success) {
                //route to another page
                navigate("/");
            }
            alert(result.message);
        } catch (error) {
            console.error("Error signing up:", error);
            alert("An error occured. Please try again.");
        }
    };
    //MARK: DISPLAY
    return (
        <div className="signupcontent">
            <Card className="signupcard">
                <CardContent className="signupcardcontent">
                    <Typography variant="h5">SIGN UP</Typography>
                    <form className="signupform" onSubmit={handleSignUp}>
                        <TextField
                            id="firstname"
                            className="firstname"
                            required
                            label="First Name"
                            variant="outlined"
                            value={user.firstname}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="lastname"
                            className="lastname"
                            required
                            label="Last Name"
                            variant="outlined"
                            value={user.lastname}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="middlename"
                            className="middlename"
                            required
                            label="Middle Name"
                            variant="outlined"
                            value={user.middlename}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="email"
                            className="email"
                            required
                            label="Email"
                            variant="outlined"
                            value={user.email}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                            InputLabelProps={{
                                shrink: true,
                            }}
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

                        <TextField
                            id="confirmpassword"
                            className="confirmpassword"
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            label="Confirm Password"
                            variant="outlined"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
                                            onClick={
                                                handleToggleConfirmPasswordVisibility
                                            }
                                        >
                                            {showConfirmPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <div className="buttongroup">
                            <Button variant="contained" type="submit">
                                SIGN UP
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleRedirectToLogin}
                            >
                                BACK
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default SignUp;
