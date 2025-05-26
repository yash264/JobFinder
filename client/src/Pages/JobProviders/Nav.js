import React from "react";
import { Link, useNavigate }  from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export const Nav = () => {

    const navigate = useNavigate()

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("authToken");
        navigate("/");
    }

    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Services</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link" to="../admin/adminDash">DashBoard</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="../admin/createJob">Create a Job</Link>
                        </li>
                    </ul>
                    <div>
                        <button type="button" class="btn btn-outline-danger" onClick={logout} >Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    )
};