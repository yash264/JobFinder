import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Nav } from "./Nav";
import { Footer } from "../../Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Candidates() {

    const location = useLocation()
    const role = location.state.role;

    const [values, setValues] = useState([])

    const fetchAdminData = async () => {
        try {
            const response = await axios.post('https://jobfinderserver.onrender.com/api/fetchCandidates',
                {
                    role: role,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );
            setValues(response.data.message);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAdminData();
    }, [])

    const confirmation = async (name, email, role) => {
        try {
            const response = await axios.post('https://jobfinderserver.onrender.com/api/acceptConfirmation',
                {
                    name: name,
                    email: email,
                    role: role,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );
            if (response.data.message === "accepted") {
                toast.success("Accepted");
                fetchAdminData();
            }
            else {
                toast.error("Some Error Occured");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const [data, setData] = useState([])
    const [message, setMessage] = useState([])

    const fetchProfile = async (name, email, role) => {
        try {
            const response = await axios.post('https://jobfinderserver.onrender.com/api/fetchProfile',
                {
                    name: name,
                    email: email,
                    role: role,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );
            
            setData(response.data.data);
            setMessage(response.data.message);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Nav />
            <div>
                <h3>Candidates Applied</h3>
            </div>


            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Document</th>
                        <th scope="col">View Profile</th>
                        <th scope="col">Accept Application</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        values === null ? "" : values.map((value) => {
                            return <tr>
                                <td>{value.name}</td>
                                <td>{value.email}</td>
                                <td><a href={value.pdfUrl} style={{ textDecoration: "none" }}>{value.document}</a></td>
                                <td><button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#profile" onClick={() => fetchProfile(value.name, value.email, role)}>Click here</button></td>
                                {
                                    value.status === true ?
                                        <td><button className="btn btn-success" >Accepted</button></td>
                                        :
                                        <td><button className="btn btn-outline-success" onClick={() => confirmation(value.name, value.email, role)}>Click here</button></td>
                                }

                                <td>
                                    <div class="modal fade" id="profile" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Candidate Profile</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body" style={{ textAlign: "center" }} >
                                                    <img src={data.imageUrl} alt="Profile Picture" class="profile-pic" style={{ width: "100px" }} />
                                                    <table class="table">
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">Name</th>
                                                                <td>{message.name}</td>
                                                                <th scope="row">Gender</th>
                                                                <td>{message.gender}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Email</th>
                                                                <td>{message.email}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Mobile No.</th>
                                                                <td>
                                                                    {
                                                                        message.personalDetails == null ? "" : message.personalDetails.map((index) => {
                                                                            return <tr>
                                                                                <td>{index.mobile}</td>
                                                                            </tr>
                                                                        })
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Qualification</th>
                                                                <td>
                                                                    {
                                                                        message.personalDetails == null ? "" : message.personalDetails.map((index) => {
                                                                            return <tr>
                                                                                <td>{index.qualification}</td>
                                                                            </tr>
                                                                        })
                                                                    }
                                                                </td>
                                                                <th scope="row">Role</th>
                                                                <td>{data.role}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Location</th>
                                                                <td>
                                                                    {
                                                                        message.personalDetails == null ? "" : message.personalDetails.map((index) => {
                                                                            return <tr>
                                                                                <td>{index.city + ", " + index.state}</td>
                                                                            </tr>
                                                                        })
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">About</th>
                                                                <td>{data.yourself}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        })
                    }
                </tbody>
            </table>
            <ToastContainer />
            <Footer />
        </>
    )
}

export default Candidates;