import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Nav } from "./Nav";
import moment from "moment";
import { CgClose } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function CreateJob() {

    const [values, setValues] = useState([])
    const navigate = useNavigate()

    const [role, setRole] = useState([])
    const [eligibility, setEligibility] = useState([])
    const [skills, setSkills] = useState([])
    const [salary, setSalary] = useState([])
    const [lastDate, setLastDate] = useState([])
    const [lastTime, setLastTime] = useState([])
    const [aboutus, setAboutUs] = useState([])

    const fetchUserData = async () => {

        try {
            const response = await axios.get('https://jobfinderserver.onrender.com/api/fetchJob',
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
        fetchUserData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://jobfinderserver.onrender.com/api/jobCreate',
                {
                    role: role,
                    eligibility: eligibility,
                    skills: skills,
                    salary: salary,
                    lastDate: lastDate,
                    lastTime: lastTime,
                    aboutus: aboutus
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );
            if (response.data.message === "job created") {
                fetchUserData();
                toast.success("Job Created Successfully");
            }
            else if (response.data === "role must be unique") {
                toast.error("Role must be Unique");
            }
            else {
                toast.error("Some Error Occured");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const showCandidates = (role) => {
        navigate("../Admin/candidates", { state: { role: role } })
    }

    const deleteJob = async(role) => {

        try {
            const response = await axios.post('https://jobfinderserver.onrender.com/api/deleteJob',
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
            if (response.data.data === "deleted job") {
                fetchUserData();
                toast.success("Job Deleted Successfully");
            }
            else {
                toast.error("Some Error Occured");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Nav />
            <div>
                <h4>Jobs Created
                    <button type="button" class="btn btn-outline-primary" style={{ float: "right" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Create a Job
                    </button>
                </h4>
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Job Details</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form class="row g-3" >
                                        <div class="col-md-6">
                                            <label class="form-label">Role</label>
                                            <input type="text" class="form-control" onChange={(e) => setRole(e.target.value)} />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Eligibility</label>
                                            <input type="text" class="form-control" placeholder="Educational Qualification" onChange={(e) => setEligibility(e.target.value)} />
                                        </div>
                                        <div class="col-md-6">
                                            <label for="inputSkills" class="form-label">Skills Needed</label>
                                            <input type="text" class="form-control" id="inputSkills" onChange={(e) => setSkills(e.target.value)} />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Salary (in Rupees)</label>
                                            <input type="number" class="form-control" onChange={(e) => setSalary(e.target.value)} />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Last Date to Apply</label>
                                            <input type="date" class="form-control" onChange={(e) => setLastDate(e.target.value)} />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Untill Time</label>
                                            <input type="time" class="form-control" onChange={(e) => setLastTime(e.target.value)} />
                                        </div>

                                        <div class="form-floating">
                                            <textarea class="form-control" placeholder="Please give some job descriptions" id="floatingTextarea2" style={{ height: "100px" }} onChange={(e) => setAboutUs(e.target.value)}></textarea>
                                            <label for="floatingTextarea">Brief Intro about Job</label>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal" onClick={handleSubmit} >Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Role Offered</th>
                        <th scope="col">Eligibility</th>
                        <th scope="col">Salary in Rupees</th>
                        <th scope="col">Last Date</th>
                        <th scope="col">Candidates</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        values === null ? "" : values.map((value) => {
                            return <tr>
                                <td>{value.role}</td>
                                <td>{value.eligibility}</td>
                                <td>{" ₹ "+value.salary}</td>
                                <td>{moment(value.lastDate).format('Do MMM YY, h:mm a')}</td>
                                <td><button className="btn btn-outline-success" onClick={() => showCandidates(value.role)}>Click here</button></td>
                                <td><CgClose onClick={() =>deleteJob(value.role)} /></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <ToastContainer />
        </>
    )
}

export default CreateJob;