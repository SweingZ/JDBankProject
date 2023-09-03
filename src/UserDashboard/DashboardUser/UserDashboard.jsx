import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import "./userdashboard.css";

function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user =  JSON.parse(localStorage.getItem("UserData"));
    console.log(user);

    const apiUrl =
      "http://localhost:8080/user/" + user.user_id; // Replace with your API endpoint

    axios
      .get(apiUrl)
      .then((response) => {
        setUserData(response.data); // Assuming the API returns user data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="dashboard">
        <h1>
          Welcome,{" "}
          <span id="user-name">
            {userData
              ? `${userData.firstName} ${userData.lastName}`
              : "Loading..."}
          </span>
          !
        </h1>
        <div className="user-info">
          <div className="balance">
            <h2>
              <strong>Available Balance</strong>
            </h2>
            <p id="balance-amount">
              {userData
                ? `Rs ${userData.account.balance.toFixed(2)}`
                : "Loading..."}
            </p>
          </div>
          <div className="user-details">
            <div className="user-id">
              <label htmlFor="user-id">
                <strong>User ID</strong>
              </label>
              <p id="user-id">{userData ? userData.user_id : "Loading..."}</p>
            </div>
            <div className="user-fullname">
              <label htmlFor="full-name">
                <strong>Full Name</strong>
              </label>
              <p id="full-name">
                {userData
                  ? `${userData.firstName} ${userData.lastName}`
                  : "Loading..."}
              </p>
            </div>
            <div className="user-email">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <p id="email">{userData ? userData.email : "Loading..."}</p>
            </div>
            <div className="user-phone">
              <label htmlFor="phone-number">
                <strong>Phone Number</strong>
              </label>
              <p id="phone-number">
                {userData ? userData.phoneNumber : "Loading..."}
              </p>
            </div>
            <div className="user-address">
              <label htmlFor="address">
                <strong>Address</strong>
              </label>
              <p id="address">{userData ? userData.address : "Loading..."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
