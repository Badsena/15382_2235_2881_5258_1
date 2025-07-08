import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("https://9000.vs.amypo.com/user/login", form);
      alert(res.data);
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input name="email" placeholder="Email"  onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
} 

export default Login;
