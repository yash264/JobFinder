import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Notification() {

    const navigate = useNavigate()
    const [values, setValues] = useState([])

    const handleSubmit = async () => {

        try {
            const response = await axios.get('https://jobfinderserver.onrender.com/api/fetchNotification',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );
            
            setValues(response.data.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleSubmit();
    }, []);

    const showApplication = (lastDate, ferm, role) => {
        const scheduled = moment(lastDate).format('Do MMM YYYY, h:mm:ss a');
        const currentTime = moment(Date.now()).format('Do MMM YYYY, h:mm:ss a');

        const ScheduledMoment = moment(scheduled, 'Do MMM YYYY, h:mm:ss a');
        const currentMoment = moment(currentTime, 'Do MMM YYYY, h:mm:ss a');

        if (currentMoment.isBefore(ScheduledMoment)) {
            navigate("../User/applicationWindow", { state: { ferm: ferm, role: role } })
        }
        else if (currentMoment.isAfter(ScheduledMoment)) {
            toast.error("Registrations are Cloased");
        }
    }

    return (
        <>
            <Navbar />
            <h3>Notification</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Name of the Ferm</th>
                        <th scope="col">Role</th>
                        <th scope="col">Eligibitiy</th>
                        <th scope="col">Last Date to Apply</th>
                        <th scope="col">Apply Now</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        values === null ? "" : values.map((value) => {
                            return <tr>
                                <td>{value.ferm}</td>
                                <td>{value.role}</td>
                                <td>{value.eligibility}</td>
                                <td>{moment(value.lastDate).format('Do MMM YY, h:mm a')}</td>
                                <td><button className="btn btn-outline-success" onClick={() => showApplication(value.lastDate, value.ferm, value.role)}>Click here</button></td>
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

export default Notification;