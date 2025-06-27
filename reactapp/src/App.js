import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>User Authentication</h1>
        <nav style={{ marginBottom: "15px" }}>
          <Link to="/register" style={{ marginRight: "15px" }}>Register</Link>
          <Link to="/login">Login</Link>
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
