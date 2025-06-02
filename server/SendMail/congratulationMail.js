const nodemailer = require("nodemailer");

const congratulationMail = async(name, email, ferm, role) => {
    try{
        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "yp5094280@gmail.com",
                pass: "nokoctntwjppagot",    //   noko ctnt wjpp agot
            },
        }); 

        const mailOptions = {
            from: {
                name: "Job Finder",
                address: "yp5094280@gmail.com"
            },
            to: email,
            subject: "Regarding Profile Selection on Job Finder ",
            html:
                ` 
                    <html>
                            <h3>Congratulation !! </h3>
                            <div>
                                <img src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png" width="100px"/>
                            </div>
                            <h4> Dear ${name} , your profile has been selected for the ${ferm} for the role of ${role}. Keep it Up !!</h4>
                            <br>
                            <p>If you have any questions or need help getting started, feel free to reach out.</p>
                            <br>
                            <p>We look forward to helping you get the most out of our services!</p>
                            <p>Best regards,</p>
                            <br>
                        <div>
                            <p>&copy; 2024 Designed, Developed and Hosted by National Informatics Center.</p>
                        </div>
                    </html>
                `,
        };
        transport.sendMail(mailOptions, (error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent");
            }
        })
    }
    catch(error){
        console.log(error);
    }
}

module.exports = { congratulationMail };