import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Nav } from "./Nav";
import { Footer } from "../../Components/Footer";
import { Profile } from "../../SvgImage/Profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminDash() {

    const [ferm, setFerm] = useState('')
    const [gmail, setGmail] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get('https://jobfinderserver.onrender.com/api/fetchAdmin',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('authToken')}`
                        }
                    }
                );
               
                setFerm(response.data.message.ferm);
                setGmail(response.data.message.gmail);
                setPhone(response.data.message.adminDetails[0].phone);
                setCity(response.data.message.adminDetails[0].city);
                setState(response.data.message.adminDetails[0].state);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchAdminData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://jobfinderserver.onrender.com/api/updateAdmin',
                {
                    ferm: ferm,
                    gmail: gmail,
                    phone: phone,
                    city: city,
                    state: state,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );
            if (response.data.data === "updated") {
                toast.success("Updated Successfully");
            }
            else {
                toast.error("Some Error Occurred");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Nav />
            <h3>Admin Corner</h3>
            
            <div class="container px-4 text-center">
                <div class="row gx-5">
                    <div class="col">
                        <div class="p-3">
                            <Profile />
                        </div>
                    </div>
                    <div class="col">
                        <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
                            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#updateModal">
                                Update
                            </button>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Ferm Name</th>
                                        <td>{ferm == null ? "" : ferm}</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="col">Email</th>
                                        <td>{gmail == null ? "" : gmail}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Mobile No.</th>
                                        <td>{phone == null ? "" : phone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Location</th>
                                        <td>{city == null || state == null ? "" : city +  ", " + state}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title fs-5" id="exampleModalLabel">Update Details</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">Ferm Name</label>
                                    <input type="text" class="form-control" onChange={(e) => setFerm(e.target.value)} placeholder="Enter your Ferm Name" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputEmail" class="form-label">Email</label>
                                    <input type="email" class="form-control" onChange={(e) => setGmail(e.target.value)} placeholder="Enter your Email" />
                                </div>
                                <div class="col-6">
                                    <label for="inputMobile" class="form-label">Mobile No.</label>
                                    <input type="number" class="form-control" onChange={(e) => setPhone(e.target.value)} placeholder="Enter Mobile Number" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputCity" class="form-label">City</label>
                                    <input type="text" class="form-control" onChange={(e) => setCity(e.target.value)} id="inputCity" placeholder="Enter your City" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputState" class="form-label">State</label>
                                    <select id="inputState" onChange={(e) => setState(e.target.value)} class="form-select">
                                        <option selected>Choose...</option>
                                        <option onChange={(e) => setState(e.target.value)}>Uttar Pradesh</option>
                                        <option onChange={(e) => setState(e.target.value)} >Madhya Pradesh</option>
                                        <option onChange={(e) => setState(e.target.value)}>New Delhi</option>
                                        <option onChange={(e) => setState(e.target.value)}>Maharastra</option>
                                        <option onChange={(e) => setState(e.target.value)} >Haryana</option>
                                        <option onChange={(e) => setState(e.target.value)} >Rajasthan</option>
                                        <option onChange={(e) => setState(e.target.value)}>Gujrat</option>
                                        <option onChange={(e) => setState(e.target.value)} >Uttarakhand</option>
                                        <option onChange={(e) => setState(e.target.value)}>Other's</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Footer />
        </>
    )
}

export default AdminDash;