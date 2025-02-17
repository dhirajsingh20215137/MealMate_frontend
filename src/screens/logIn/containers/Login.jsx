import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../auth/index"; 
import { loginUser } from "../api";
import LoginForm from "../components/Login";
import { Snackbar, Alert } from "@mui/material";
import "../../../index.css";

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                email: "",
                password: "",
            },
            snackbar: {
                message: "",
                severity: "info",
                open: false,
            },
            isLoggedIn: false, 
        };
    }

    static contextType = AuthContext; 

    handleChange = (e) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { login } = this.context; 

        try {
            const data = await loginUser(this.state.formData);
            login(data.token, data.user);

            console.log(data.user)

            this.setState({
                snackbar: {
                    message: "Login Successful!",
                    severity: "success",
                    open: true,
                },
                isLoggedIn: true, 
            });
        } catch (error) {
            console.error(error);
            this.setState({
                snackbar: {
                    message: error.message || "Login failed. Please try again.",
                    severity: "error",
                    open: true,
                },
            });
        }
    };

    handleSnackbarClose = () => {
        this.setState({ snackbar: { ...this.state.snackbar, open: false } });
    };

    render() {
        if (this.state.isLoggedIn) {
            return <Navigate to="/meal-library" />;
        }

        return (
            <>
                <Snackbar
                    open={this.state.snackbar.open}
                    autoHideDuration={500}
                    onClose={this.handleSnackbarClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <Alert severity={this.state.snackbar.severity} onClose={this.handleSnackbarClose}>
                        {this.state.snackbar.message}
                    </Alert>
                </Snackbar>

                <LoginForm 
                    email={this.state.formData.email}
                    password={this.state.formData.password}
                    handleChange={this.handleChange} 
                    handleSubmit={this.handleSubmit}
                />
            </>
        );
    }
}

export default LoginContainer;
