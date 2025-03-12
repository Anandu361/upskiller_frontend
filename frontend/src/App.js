import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/login";
import Sidebar from "./components/dashboard/sidebar";
import FAQ from "./components/dashboard/FAQ";
import MyCourses from "./components/dashboard/course";
import Profile from "./components/dashboard/profile";
import MyProgress from "./components/dashboard/progress";
import Achievements from "./components/dashboard/achievements";
import Dashboard from "./components/dashboard/dashboard";

// Layout component for protected routes
const ProtectedLayout = ({ children }) => (
  <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
    <Sidebar />
    <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>{children}</div>
  </div>
);


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          }
        />
        <Route
          path="/FAQ"
          element={
            <ProtectedLayout>
              <FAQ />
            </ProtectedLayout>
          }
        />
        <Route
          path="/course"
          element={
            <ProtectedLayout>
              <MyCourses />
            </ProtectedLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedLayout>
              <Profile />
            </ProtectedLayout>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedLayout>
              <MyProgress />
            </ProtectedLayout>
          }
        />
        <Route
          path="/achievements"
          element={
            <ProtectedLayout>
              <Achievements />
            </ProtectedLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
