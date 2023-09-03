import React, { useState, useEffect } from "react";
import logo from "../SideBar/Logo.png";
import "./editprofile.css";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import placeholder from "./placeholder.jpg";

function EditProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for success popup

  const handleSubmit = (event) => {
    event.preventDefault();

    // Filter out null or empty values from the formData
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(
        ([key, value]) => value !== null && value !== ""
      )
    );
    const user =  JSON.parse(localStorage.getItem("UserData"));
    const apiUrl =
      "http://localhost:8080/user/" + user.user_id; // Replace with your API endpoint

    axios
      .put(apiUrl, filteredData)
      .then((response) => {
        console.log("User data updated successfully:", response.data);
        // Optionally, you can show a success message to the user.
        setShowSuccessPopup(true); // Show the success popup
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        // Optionally, you can show an error message to the user.
      });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      // Create a FormData object to send the image file to the server
      const formData = new FormData();
      formData.append("avatar", file);

      const user =  JSON.parse(localStorage.getItem("UserData"));
      // Send the image to the server using Axios
      const apiUrl =
        "http://localhost:8080/user/upload/" + user.user_id; // Replace with your API endpoint for image upload

      axios
        .post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Avatar image updated successfully:", response.data);

          // Set the uploadedImage state with the new avatar image URL
          setUploadedImage(response.data.avatarImageUrl);
        })
        .catch((error) => {
          console.error("Error uploading avatar image:", error);
          // Optionally, you can show an error message to the user.
        });
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <div>
      <SideBar />
      <div className="edit_profile">
        <div className="top">
          <h1>Make Changes to your Profile</h1>
        </div>
        <div className="content">
          <form className="update_form" onSubmit={handleSubmit}>
            <div className="edit_section">
              <h3>Edit Profile</h3>
              <div className="input_fields">
                <label>First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <label>Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <label>Email Address</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <label>Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  placeholder="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
                <label>Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <label>Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="buttons">
                <button className="save_change" type="submit">
                  Save Changes
                </button>
                <button className="discard_change">Discard Changes</button>
              </div>
            </div>
          </form>
          <div className="image_change">
            <img src={placeholder} alt="" />
            <h2>Upload New Profile Avatar</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="upload-input" // Added class for styling
            />
            <button className="upload">Upload</button>
          </div>
          <p>Please do not update the existing email</p>
        </div>
      </div>
      {showSuccessPopup && (
        <div className="success-popup">
          <p>Profile updated successfully!</p>
          <button onClick={() => setShowSuccessPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
