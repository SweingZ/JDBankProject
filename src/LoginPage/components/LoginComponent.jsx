import axios from "axios";
import {useRef} from "react";
import "./LoginComponent.css";
import {NavLink, useNavigate} from "react-router-dom";

export default function LoginComponent() {
    let emailRef = useRef("");
    let passwordRef = useRef("");
    let roleRef = useRef("");
    const navTo = useNavigate();

    function loginHandle() {
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            role: roleRef.current.value,
        };

        axios
            .post("http://localhost:8080/home/login", data)
            .then((response) => {
                console.log("Login Response")
                console.log(response)
                if (response) {
                    localStorage.setItem(
                        "UserToken",
                        JSON.stringify(response.data.accessToken)
                    );
                    localStorage.setItem("UserData", JSON.stringify(response.data.person));
                }
            })
            .then(() => {
                if (roleRef.current.value == "ROLE_USER") {
                    navTo("/User");
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
                </div>

                <div className="roleDiv">
                    <select defaultValue="ROLE_USER" ref={roleRef}>
                        <option value="ROLE_USER">User</option>
                        <option value="ROLE_ADMIN">Admin</option>
                        <option value="ROLE_AGENT">Agent</option>
                    </select>
                </div>

                <button className="logInButton" onClick={loginHandle}>
                    Log In
                </button>

                <button className="SignUpButton" onClick={() => navTo("/Registration")}>
                    Sign Up
                </button>
            </div>
        </>
    );
}
