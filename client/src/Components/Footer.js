import React from "react";
import { ImLocation, ImEnvelop } from "react-icons/im";

const Footer = () => {
    return (
        <>
            <div class="text-center" style={{color:"white",backgroundColor:"rgba(20, 20, 20, 0.872)"}} >
                <br/>
                <div class="row">
                    <div class="col">
                        <h4>Stay Connected to us</h4>
                    </div>
                    <div class="col">
                    </div>
                    <div class="col-4 " style={{ textAlign: "left" }} >
                        <p><ImEnvelop /> yash.20222068@mnnit.ac.in</p>
                        <p><ImLocation /> National Institute of Technology Allahabad</p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Footer;