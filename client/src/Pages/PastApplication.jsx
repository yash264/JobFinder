import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function PastApplication() {

    const [values, setValues] = useState([])

    const handleSubmit = async () => {

        try {
            const response = await axios.get('https://jobFinderserver.onrender.com/api/fetchPastApplication',
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
        handleSubmit();
    }, []);


    return (
        <>
            <Navbar />
            <h3>Past Application</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Name of the Ferm</th>
                        <th scope="col">Role</th>
                        <th scope="col">Photo Uploaded</th>
                        <th scope="col">Document</th>
                        <th scope="col">Current Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        values === null ? "" : values.map((value) => {
                            return <tr>
                                <td>{value.ferm}</td>
                                <td>{value.role}</td>
                                <td><img src={value.imageUrl} alt="Profile Picture" class="profile-pic" style={{ width: "100px" }} /></td>
                                <td><a style={{ textDecoration: "none" }} href={value.pdfUrl} >{value.document}</a></td>
                                {
                                    value.status === true ?
                                        <td><button className="btn btn-success" >Accepted</button></td> 
                                        :    
                                        <td><button className="btn btn-outline-secondary" >Pending ...</button></td>
                                }
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

export default PastApplication;