import axios from "axios";
import { useContext, useRef } from "react";
import "./LoginComponent.css";
import { useNavigate } from "react-router-dom";

export default function LoginComponent() {
  let emailRef = useRef("");
  let passwordRef = useRef("");
  let roleRef = useRef("");

  function loginHandle() {
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role: roleRef.current.value,
    };

    axios
      .post("http://localhost:8080/home/login", data)
      .then((response) => {
        localStorage.setItem("BearerData", JSON.stringify(response.data));
      })
      .then(() => {
        const navTo = useNavigate();

        if (roleRef.current.value == "ROLE_USER") {
          navTo("/UserDashboard");
        } else if (roleRef.current.value == "ROLE_ADMIN") {
          navTo("/Admin");
        } else if (roleRef.current.value == "ROLE_AGENT") {
          navTo("/Agent");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div className="LoginContainer">
        <h4>You must register to join</h4>
        <p>We have a team to guide you</p>

        <div className="emailDiv">
          <p>Email</p>
          <input
            type="email"
            isRequired
            placeholder="user@gmail.com"
            ref={emailRef}
          />
        </div>
        <div className="passwordDiv">
          <p>Password</p>
          <input
            type="password"
            isRequired
            placeholder="password"
            ref={passwordRef}
          />
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            Forgot Password?
          </a>
        </div>

        <div className="roleDiv">
          <p>Role: </p>
          <select defaultValue="ROLE_USER" ref={roleRef}>
            <option value="ROLE_USER">User</option>
            <option value="ROLE_ADMIN">Admin</option>
            <option value="ROLE_AGENT">Agent</option>
          </select>
        </div>

        <button className="logInButton" onClick={loginHandle}>
          Log in
        </button>
      </div>
    </>
  );
}
