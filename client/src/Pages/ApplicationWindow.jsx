import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function ApplicationWindow() {

    const location = useLocation()
    const ferm = location.state.ferm;
    const role = location.state.role;

    const [data, setData] = useState([])
    const [message, setMessage] = useState([])

    const showDetails = async () => {

        try {
            const response = await axios.post('http://localhost:4502/api/application',
                {
                    ferm: ferm,
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

    useEffect(() => {
        showDetails();
    }, []);

    const [document, setDocument] = useState('')
    const [imageUrl, setImageUrl] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');
    const [yourself, setYourself] = useState('')
    const [uploadingPic, setUploadingPic] = useState(false)
    const [uploadingPdf, setUploadingPdf] = useState(false)

    const cloud_name = 'dcinkczc2';
    const upload_preset = 'JobFinder';

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingPic(true);
        const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", upload_preset);

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setImageUrl(data.secure_url);

        } catch (error) {
            console.error(error);
        } finally {
            setUploadingPic(false);
        }
    };

    const handlePdfUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingPdf(true);
        const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", upload_preset);

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setPdfUrl(data.secure_url);

        } catch (error) {
            console.error(error);
        } finally {
            setUploadingPdf(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4502/api/submitForm',
                {
                    ferm:ferm,
                    role:role,
                    imageUrl:imageUrl,
                    document:document,
                    pdfUrl:pdfUrl,
                    yourself:yourself,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );
            console.log(response.data);
            if (response.data.message === "application submitted") {
                toast.success("Application Submitted Successfully");
            }
            else if(response.data === "application already submitted"){
                toast.error("Application Already Submitted");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar />
            <h3>Application Window</h3>

            <div class="container px-4 text-center">
                <div class="row gx-5">
                    <div class="col">
                        <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
                            <h4>{data.ferm}</h4>
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <th scope="row">Role</th>
                                        <td>{message.role}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Eligibility</th>
                                        <td>{message.eligibility}</td>
                                        <th scope="row">Skills Needed</th>
                                        <td>{message.skills}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Email</th>
                                        <td>{data.gmail}</td>
                                        <th scope="row">Mobile No.</th>
                                        <td>
                                            {
                                                data.adminDetails == null ? "" : data.adminDetails.map((index) => {
                                                    return <tr>
                                                        <td>{index.phone}</td>
                                                    </tr>
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Location</th>
                                        {
                                            data.adminDetails == null ? "" : data.adminDetails.map((index) => {
                                                return <tr>
                                                    <td>{index.city + ", " + index.state}</td>
                                                </tr>
                                            })
                                        }
                                    </tr>
                                    <tr>
                                        <th scope="row">Last Date to Apply</th>
                                        <td>{moment(message.lastDate).format('Do MMM YY, h:mm a')}</td>
                                        <th scope="row">Salary</th>
                                        <td>{message.salary}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Description</th>
                                        <td>{message.aboutUs}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="col">
                        <div class="p-3">
                            <h4>Application Form</h4>
                            <form class="row g-3">
                                <div className="mb-3">
                                    <img src={imageUrl} alt="Profile Picture" class="profile-pic" style={{ width: "100px" }} />
                                    <br /><br />
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handleImageUpload}
                                        disabled={uploadingPic}
                                    />
                                    {uploadingPic && <div className="spinner-border text-primary mt-2" role="status">
                                        <span className="visually-hidden">Uploading...</span>
                                    </div>}
                                </div>
                                <div class="col-md-8">
                                    <label class="form-label">Any Document</label>
                                    <input type="email" class="form-control" placeholder="Name of the Document" onChange={(e) => setDocument(e.target.value)} />
                                </div>
                                <div class="input-group mb-3">
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handlePdfUpload}
                                        disabled={uploadingPdf}
                                    />
                                    {uploadingPdf && <div className="spinner-border text-primary mt-2" role="status">
                                        <span className="visually-hidden">Uploading...</span>
                                    </div>}
                                </div>
                                <div class="form-floating">
                                    <textarea class="form-control" style={{ height: "100px" }} onChange={(e) => setYourself(e.target.value)} ></textarea>
                                    <label for="floatingTextarea">Brief Intro about YourSelf</label>
                                </div>

                                <div class="col-md-6">
                                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        Submit
                                    </button>
                                </div>

                                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Confirmation</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                Are you Sure want to Submit ?
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal" onClick={handleSubmit} >Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
            <Footer />
        </>
    )
}

export default ApplicationWindow;