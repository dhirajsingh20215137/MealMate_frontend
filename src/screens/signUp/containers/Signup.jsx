import React, { Component } from "react";
import { signup } from "../api";
import SignupForm from "../components/Signup";
import Cookies from "js-cookie";
import { Snackbar, Alert } from "@mui/material";
import { Navigate } from "react-router-dom";
import "../../../index.css";

class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: "",
        password: "",
        confirmPassword: "",
        gender: null,
        weight: "",
        height: "",
        targetedCarbs: "",
        targetedProtein: "",
        targetedFats: "",
      },
      snackbar: {
        message: "",
        severity: "info",
        open: false,
      },
      loading: false,
      redirect: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const {
      email,
      password,
      confirmPassword,
      gender,
      weight,
      height,
      targetedCarbs,
      targetedProtein,
      targetedFats,
    } = this.state.formData;

    if (!email || !password || !confirmPassword) {
      this.showSnackbar("All fields are required", "error");
      this.setState({ loading: false });
      return;
    }

    if (password !== confirmPassword) {
      this.showSnackbar("Passwords do not match", "error");
      this.setState({ loading: false });
      return;
    }

    try {
      const data = await signup({
        email,
        password,
        gender: gender || null,
        weight: parseFloat(weight),
        height: parseFloat(height),
        targetedCarbs: parseFloat(targetedCarbs),
        targetedProtein: parseFloat(targetedProtein),
        targetedFats: parseFloat(targetedFats),
      });

      if (data && data.token) {
        this.showSnackbar(
          "Signup Successful! Redirecting to login...",
          "success"
        );

        setTimeout(() => this.setState({ redirect: true }), 1500);
      } else {
        this.showSnackbar("Signup failed, please try again.", "error");
      }
    } catch (err) {
      this.showSnackbar(err.message || "An unexpected error occurred", "error");
    } finally {
      this.setState({ loading: false });
    }
  };

  showSnackbar = (message, severity) => {
    this.setState({
      snackbar: { message, severity, open: true },
    });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackbar: { ...this.state.snackbar, open: false } });
  };

  render() {
    const { formData, snackbar, loading, redirect } = this.state;

    if (redirect) {
      return <Navigate to="/signin" />;
    }

    return (
      <>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={this.handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={this.handleCloseSnackbar}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        <SignupForm
          {...formData}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          loading={loading}
        />
      </>
    );
  }
}

export default SignupContainer;
