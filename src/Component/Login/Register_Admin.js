import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import "./Register.scss"

const Register_Admin = () => {
  const navigate = useNavigate(); // Hook để chuyển hướng
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    roleName: "Client",
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    phone: "",
    address: "",
    email: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/; // Username validation
    if (!usernameRegex.test(formData.username)) {
      toast.error(
        "Username must be 3-15 characters long and contain only letters and numbers."
      );
      return;
    }

    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        formData
      );
      console.log(response.data);
      toast.success("Registration successful!");

      // Chuyển hướng sang trang đăng nhập
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
      }}
    >
      <div className="mask gradient-custom-3"></div>
      <MDBCard className="m-5" style={{ width: 1000 }}>
        <MDBCardBody className="px-5">
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Cột trái */}
              <div className="col-md-6">
                {/* Username */}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Username"
                  size="lg"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />

                {/* Password */}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  size="lg"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                {/* Confirm Password */}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Confirm Password"
                  size="lg"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />

                {/* Gender */}
                <select
                  className="form-select mb-4"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                {/* Birth Date */}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Birth Date"
                  size="lg"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Cột phải */}
              <div className="col-md-6">
                {/* First Name */}
                <MDBInput
                  wrapperClass="mb-4"
                  label="First Name"
                  size="lg"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />

                {/* Last Name */}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Last Name"
                  size="lg"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />

                {/* Phone */}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Phone"
                  size="lg"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                {/* Address */}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Address"
                  size="lg"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />

                {/* Email */}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  size="lg"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Role Dropdown */}
            <select
              className="form-select mb-4"
              name="roleName"
              value={formData.roleName}
              onChange={handleChange}
              required
            >
              <option value="Personal_Trainer">Personal Trainer</option>
              <option value="Fitness_Manager">Fitness Manager</option>
              <option value="Owner">Owner</option>
              <option value="Client">Client</option>
            </select>

            {/* Terms Checkbox */}
            <div className="d-flex flex-row justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="I agree all statements in Terms of service"
                required
              />
            </div>

            <MDBBtn
              className="mb-4 w-100 gradient-custom-4"
              size="lg"
              type="submit"
            >
              Register
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Register_Admin;
