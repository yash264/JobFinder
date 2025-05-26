import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate }  from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import { Ferm } from "../../SvgImage/Ferm";
import { Footer } from "../../Components/Footer";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function AdminLog() {

    const [gmail, setGmail] = useState([])
    const [password, setPassword] = useState([])
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const response = await axios.post('https://jobfinderserver.onrender.com/api/adminLogin',
                { 
                    gmail:gmail,
                    password:password
                }
            );
            if(response.data.message==="Incorrect Password"){
                toast.error("Incorrect Password");
            }
            else if(response.data.message==="Please Register"){
                toast.error("Please Register");
            }
            else if(response.data.message==="success"){
                localStorage.setItem('authToken', response.data.token);
                navigate("/Admin/adminDash");
            }
            setLoading(false);
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <div class="container px-4 text-center">
                <div class="row gx-5">
                    <div class="col">
                        <div class="p-3">
                            <h4>Admin Login</h4>
                            <form class="row g-3" onSubmit={handleSubmit} >
                                <div class="col-md-8">
                                    <label for="email" class="form-label">Organization Email</label>
                                    <input type="email" class="form-control" placeholder="Enter your Email Id" onChange={(e) => setGmail(e.target.value)} />
                                </div>
                                <div class="col-md-8">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                {
                                    loading && 
                                        <div className="spinner-border text-primary mt-2" role="status">
                                        </div>
                                }

                                <div class="col-12">
                                    <button type="submit" class="btn btn-outline-primary">Login</button>
                                    <button class="btn btn-outline-secondary" ><Link class="nav-link" to="../Admin/adminReg">New User</Link></button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col">
                        <div class="p-3">
                            <Ferm />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    )
}

export default AdminLog;