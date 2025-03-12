import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import "./login.css";
import { FaUserGraduate, FaLock, FaEnvelope, FaCalendarAlt } from "react-icons/fa";


const Login = () => {
  const [action, setAction] = useState(""); // Tracks login/register toggle
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    age: "",
    gender: "",
    email: "",
    study_preference: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false); // Tracks loading state

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const registerLink = () => setAction("active");
  const loginLink = () => setAction("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Login Request Payload:", loginData);
      const response = await axiosInstance.post("login/", {
        username: loginData.username,
        password: loginData.password,
      });
      alert("Login successful!");
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } catch (error) {
      alert(
        error.response?.data?.detail ||
        error.response?.data?.error ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!registerData.username || !registerData.email || !registerData.password) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      console.log("Register Request Payload:", registerData);
      const response = await axiosInstance.post("register/", registerData);
      alert("Registration successful! You can now log in.");
      loginLink();
    } catch (error) {
      alert(
        error.response?.data?.detail ||
        error.response?.data?.error ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`wrapper ${action}`}>
      {/* Login Form */}
      <div className="form-box login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleLoginChange}
              required
            />
            <FaUserGraduate className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/reset-password">Forgot password?</a>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={registerLink}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Registration Form */}
      <div className="form-box register">
        <form onSubmit={handleRegister}>
          <h1>Registration</h1>
          {/* Username */}
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={registerData.username}
              onChange={handleRegisterChange}
              required
            />
            <FaUserGraduate className="icon" />
          </div>

          {/* Age */}
          <div className="input-box">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={registerData.age}
              onChange={handleRegisterChange}
              required
            />
            <FaCalendarAlt className="icon" />
          </div>

          {/* Gender */}
          <div className="input-box">
            <select
              name="gender"
              value={registerData.gender}
              onChange={handleRegisterChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Email */}
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
            />
            <FaEnvelope className="icon" />
          </div>

          {/* Study Preference */}
          <div className="input-box">
            <p>Study Preference:</p>
            <label>
              <input
                type="radio"
                name="studyPreference"
                value="Visual"
                checked={registerData.studyPreference === "Visual"}
                onChange={handleRegisterChange}
                required
              />{" "}
              Visual
            </label>
            <label>
              <input
                type="radio"
                name="studyPreference"
                value="Text"
                checked={registerData.studyPreference === "Text"}
                onChange={handleRegisterChange}
                required
              />{" "}
              Text
            </label>
            <label>
              <input
                type="radio"
                name="studyPreference"
                value="Kinematics"
                checked={registerData.studyPreference === "Kinematics"}
                onChange={handleRegisterChange}
                required
              />{" "}
              Kinematics
            </label>
          </div>

          {/* Password */}
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
            />
            <FaLock className="icon" />
          </div>

          {/* Confirm Password */}
          <div className="input-box">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              required
            />
            <FaLock className="icon" />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <div className="register-link">
            <p>
              Already have an account?{" "}
              <a href="#" onClick={loginLink}>
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
