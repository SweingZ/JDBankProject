import React, { useState } from "react";
import "./Register.css";
// import { FaUser, FaLock } from "react-icons/fa6";
// import {FaEnvelope, FaCalendarAlt, FaPhoneAlt} from "react-icons/fa";
// import {FaLocationDot} from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../../Header/Header.jsx";
import Footer from "../../Footer/Footer.jsx";
import axios from "axios";

function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!firstName) {
      newErrors.firstName = "FirstName must be provided";
    } else if (firstName.length < 4 || firstName.length > 15) {
      newErrors.firstName =
        "First name must be greater than 4 and less than 15";
    }

    if (!lastName) {
      newErrors.lastName = "LastName must be provided";
    } else if (lastName.length < 4 || lastName.length > 20) {
      newErrors.lastName = "Last name must be greater than 4 and less than 20";
    }

    if (!email) {
      newErrors.email = "Email should be provided";
    } else if (!email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = "Invalid email format";
    }

    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!dob) {
      newErrors.dob = "DOB should be selected";
    } else {
      const current = new Date();
      const entered = new Date(dob);
      const required = current.getFullYear() - entered.getFullYear();
      if (required < 18) {
        newErrors.dob = "Must be 18";
      }
    }

    if (!address) {
      newErrors.address = "Address Should be given";
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone Number should be given";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navTo = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      //Post data
      const registerData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        address: address,
        phoneNumber: phoneNumber,
        dateOfBirth: dob,
        account: { balance: "1000" },
      };

      axios
        .post("http://localhost:8080/home/register", registerData)
        .then((response) => {
          console.log(response.data)
          localStorage.setItem(
            "UserData",
            JSON.stringify(response.data)
          );
        })
        .then(() => {
          navTo("/Login");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <div className="RegistrationBody">
      <div className="header-container">
        <Header />
      </div>
      <div className="register-form">
        <h1>Register</h1>
        <h2>To be a customer at JD Bank!</h2>
        <br />
        <p>We have a team to guide you</p>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="combine_name">
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                id="firstname"
                placeholder="  Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                id="lastname"
                placeholder="  Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>
          </div>
          <div className="input-container">
            <label> Email</label>
            <input
              type="text"
              id="email"
              placeholder="  jdname@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="input-container">
            <label> Password</label>
            {/*<FaLock className="icon" />*/}
            <input
              type="password"
              id="password"
              placeholder="  Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <div className="input-container">
            <label> Confirm Password</label>
            {/*<FaLock className="icon" />*/}
            <input
              type="password"
              id="confirm_password"
              placeholder="  Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
          <div className="input-container">
            <label> Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </div>
          <div className="input-container">
            <label> Address</label>
            {/*<FaLocationDot className="icon" />*/}
            <input
              type="text"
              id="address"
              placeholder="  Dhankuta-01"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div className="input-container">
            <label> Phone Number</label>
            {/*<FaPhoneAlt className="icon" />*/}
            {/* <FaCalendarAlt className="icon" /> */}
            <input
              type="text"
              id="phoneNumber"
              placeholder="  9842347865"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && (
              <span className="error">{errors.phoneNumber}</span>
            )}
          </div>
          <br />
          <div className="register-button">
            <button>Register</button>
          </div>
        </form>
        <div className="already">
          <p>Already have an account?</p>
          <NavLink to="/Login">Click Here</NavLink>
        </div>
        {/* <nav>
        </nav> */}
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default Registration;
