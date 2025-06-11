import React from "react";
import { ImLocation, ImEnvelop } from "react-icons/im";

const Footer = () => {
    return (
        <>
            <div className="text-white bg-black/90 text-center py-8 px-4">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between">

                    <div className="mb-6 md:mb-0">
                        <h4 className="text-base font-semibold mb-2">
                            © 2024 All rights reserved.
                        </h4>
                    </div>

                    <div className="hidden md:block flex-1"></div>

                    <div className="md:w-1/2 lg:w-1/3 text-left space-y-2">
                        <p className="flex items-center gap-2">
                            <ImEnvelop className="text-lg" />
                            yash.20222068@mnnit.ac.in
                        </p>
                        <p className="flex items-center gap-2">
                            <ImLocation className="text-lg" />
                            National Institute of Technology Allahabad
                        </p>
                    </div>

                </div>
            </div>
        </>
    )
};

export default Footer;