import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate }  from "react-router-dom";
import { Ferm } from "../../SvgImage/Ferm";
import { Footer } from "../../Components/Footer";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function AdminReg() {

    const [ferm, setFerm] = useState([])
    const [gmail, setGmail] = useState([])
    const [password, setPassword] = useState([])
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:4502/api/adminRegister',
                {  
                    ferm:ferm,
                    gmail:gmail,
                    password:password
                }
            );
            console.log(response.data);
            if(response.data.message==="registered"){
                toast.success("Registered Successfully");
            }
            else if(response.data==="Email Already Exists"){
                toast.error("Email Already Exists");
            }
            else{
                toast.error("Some Error Occured");
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
                navigate("/Admin/adminDash"); // Redirect to main page if token is valid
            }
        };

        verifyUser();

    }, []);

    const checkToken = async () => {
        const token = localStorage.getItem('authToken');
        console.log(token);

        if (!token) return false;

        try {

            const response = await axios.post('http://localhost:4502/api/verifyToken', {}, {
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
                            <h4>Admin Register</h4>
                            <form class="row g-3" onSubmit={handleSubmit} >
                                <div class="col-md-8">
                                    <label for="name" class="form-label">Name of the Ferm</label>
                                    <input type="text" class="form-control"  onChange={(e) => setFerm(e.target.value)} />
                                </div>
                                <div class="col-md-8">
                                    <label for="email" class="form-label">Organization Email</label>
                                    <input type="email" class="form-control"  onChange={(e) => setGmail(e.target.value)} />
                                </div>
                                <div class="col-md-8">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary">Register</button>
                                    <button class="btn btn-outline-secondary" ><Link class="nav-link" to="../Admin/adminLog">Already Registered</Link></button>
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

export default AdminReg;