import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({ email: "", username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("https://9000.vs.amypo.com/user/register", form);
      alert(res.data);
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="username" placeholder="Username" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

export default Register;
