import React, { useState } from "react";

function Login() {
  const [loginData, setLoginData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = () => {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((userData) => {
        setLoginData(userData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">LOGIN FORM</h2>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <h3>USER DETAILS</h3>
          <p>ID: {loginData._id}</p>
          <p>First Name: {loginData.firstName}</p>
          <p>Last Name: {loginData.lastName}</p>
          <p>Email: {loginData.email}</p>
          <p>Password: {loginData.password}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
