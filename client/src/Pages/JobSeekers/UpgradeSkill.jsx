import React from "react";
import { Navbar } from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function UpgradeSkill() {

    return (
        <>
            <Navbar />
            <h3>Upgrade Your Skills</h3>

            <div class="container px-4 text-center">
                <div class="row gx-5">
                    <div class="col">
                        <div class="p-3">
                            <p>This section contains Machine learning which should be completed later on.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UpgradeSkill;