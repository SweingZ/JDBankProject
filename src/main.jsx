import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import axios from "axios";

//initial localStorage value set to empty string if null
const token_stored = localStorage.getItem("UserToken");
const data_stored = localStorage.getItem("UserData");

if (token_stored == null || data_stored == null) {
    localStorage.setItem("UserToken", JSON.stringify(""));
    localStorage.setItem("UserData", JSON.stringify(""));
}


//axios request interceptor
axios.interceptors.request.use((request) => {

    const localStorageBT_Value = JSON.parse(localStorage.getItem("UserToken"));

    request.headers["Authorization"] = "Bearer " + localStorageBT_Value;
    return request;
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);
