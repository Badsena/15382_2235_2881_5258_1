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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm mt-5">
            <div className="card-body">
              <h2 className="text-center mb-4">Register</h2>
              <div className="form-group">
                <input
                  name="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  onChange={handleChange}
                />
                <input
                  name="username"
                  className="form-control mb-3"
                  placeholder="Username"
                  onChange={handleChange}
                />
                <input
                  name="password"
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-primary btn-block" onClick={handleSubmit}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
