import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate }  from "react-router-dom";
import { Auth } from "../SvgImage/Auth";
import { Footer } from "../Components/Footer";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Register() {

    const [name, setName] = useState([])
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:4502/api/register',
                {  
                    name:name,
                    email:email,
                    password:password
                }
            );
            console.log(response.data);
            if(response.data==="Email Already Exists"){
                toast.error("Email Already Exists");
            }
            else if(response.data.message==="registered"){
                toast.success("registered");
            }
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        
        const verifyUser = async () => {
            const isTokenValid = await checkToken();
            if (isTokenValid.isValid) {
                navigate("/User/Dashboard"); // Redirect to main page if token is valid
            }
        };

        verifyUser();

    }, []);

    const checkToken = async () => {
        const token = localStorage.getItem('authToken');
        console.log(token);

        if (!token) return false;

        try {

            const response = await axios.post('http://localhost:4502/api/verify-token', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            return { isValid: response.data.valid, data: response.data.data };
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    return (
        <>
            <div class="container px-4 text-center">
                <div class="row gx-5">
                    <div class="col">
                        <div class="p-3">
                            <Auth />
                        </div>
                    </div>
                    <div class="col">
                        <div class="p-3">
                            <h4>Register</h4>
                            <form class="row g-3" onSubmit={handleSubmit} >
                                <div class="col-md-8">
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" class="form-control"  onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div class="col-md-8">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control"  onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div class="col-md-8">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary">Register</button>
                                    <button class="btn btn-outline-secondary" ><Link class="nav-link" to="../User/login">Already Registered</Link></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    )
}

export default Register;