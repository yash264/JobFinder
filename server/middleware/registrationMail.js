const nodemailer = require("nodemailer");

const registrationMail = async(name, email) => {
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
            subject: "Regarding registration on Job Finder ",
            html:
                ` 
                    <html>
                            <h3>Welcome to Job Finder !! </h3>
                            <div>
                                <img src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png" width="100px"/>
                            </div>
                            <h4> Dear ${name} ,</h4>
                            <br>
                            <p>Thank you for registering with us. We’re excited to have you as part of our community!! . If you have any questions or need help getting started, feel free to reach out.</p>
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

module.exports = { registrationMail };