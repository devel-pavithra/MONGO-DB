import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const schema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  acceptTerms: yup.bool().oneOf([true], "Accept Ts & Cs is required"),
});

function App() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((res) => {
        console.log("User Data:", res.data);
        setUsers(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/users", data);
      console.log("Registration successful", response.data);
      document.getElementById("registration-form").reset();
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const deleteuser = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:8080/users/deleteuser/${id}`)
      .then((response) => {
        console.log("DELETED SUCESSFULLY:", response.data);
      })
      .catch((error) => {
        console.log("DELETED RESOURCES:", error);
      });
  };

  return (
    <div className="container">
      <h3>REGISTER FORM</h3>
      <form onSubmit={handleSubmit(onSubmit)} id="registration-form">
        <div className="mb-3 border p-3 rounded">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            name="firstName"
            type="text"
            autoFocus
            {...register("firstName")}
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.firstName?.message}</div>
        </div>
        <div className="mb-3 border p-3 rounded">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            name="lastName"
            type="text"
            {...register("lastName")}
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.lastName?.message}</div>
        </div>
        <div className="mb-3 border p-3 rounded">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            name="email"
            type="text"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        <div className="mb-3 border p-3 rounded">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <div className="mb-3 border p-3 rounded">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">
            {errors.confirmPassword?.message}
          </div>
        </div>
        <div className="form-check mb-3 border p-3 rounded">
          <input
            type="checkbox"
            className="form-check-input"
            id="acceptTerms"
            {...register("acceptTerms")}
          />
          <label className="form-check-label" htmlFor="acceptTerms">
            Accept Terms & Conditions
          </label>
        </div>
        <button type="submit" className="btn btn-success">
          Register
        </button>
      </form>
      <br />
      <div className="user-list">
        <h3>CARDS SECTIONS</h3>
        <div className="row">
          {users.map((user, index) => (
            <div className="col-4" key={index}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">
                    {user.firstName} {user.lastName}
                  </h5>
                  <p className="card-text">Email: {user.email}</p>
                  <button
                    className="
                 btn btn-success"
                    onClick={() => deleteuser(user._id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;