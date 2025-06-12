const nodemailer = require("nodemailer");
const dotenv = require('dotenv')
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const emailId = process.env.emailId;
const passKey = process.env.passKey;


const congratulation = async (name, email, ferm, role) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: emailId,
                pass: passKey,
            },
        });

        const mailOptions = {
            from: {
                name: "Job Finder",
                address: emailId,
            },
            to: email,
            subject: "Regarding Profile Selection on Job Finder",
            html: `
                <html>
                    <body style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px; color: #333;">
                        <div style="max-width: 600px; margin: auto; background: white; padding: 25px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
                            <h3 style="text-align: center; color: #28a745; font-size: 24px; margin-bottom: 20px;">
                                ✨ Congratulations !!
                            </h3>
          
                            <div style="text-align: center; margin: 20px 0;">
                                <img
                                    src="https://media.licdn.com/dms/image/v2/D4E12AQGsyXeSqLadEw/article-cover_image-shrink_720_1280/B4EZVIFnWRGgAM-/0/1740671186886?e=2147483647&v=beta&t=Mphlll-JGtzPBgBXJrlL7u6r6zw_im2JfkVBaIo0H0s"
                                    alt="task icons"
                                    style="width: 60%; max-width: 300px; height: auto; border-radius: 8px;"
                                    title="task icons"
                                />
                            </div>
          
                            <p style="font-size: 16px; line-height: 1.6; text-align: center; margin-bottom: 25px;">
                                Dear <strong style="color: #1a202c;">
                                    ${name}</strong>,
                                <br/>
                                Your profile has been selected for 
                                    <strong style="color: #4a4e69;">
                                        ${ferm}
                                    </strong> 
                                    for the role of 
                                    <strong style="color: #2a9d8f;">
                                        ${role}
                                    </strong>.
                                <br/><br/>
                                <em style="color: #10b981;">
                                    Keep it up!!
                                </em>
                            </p>
          
                            <p style="font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
                                If you have any questions or need help getting started, feel free to reach out.
                            </p>
          
                            <p style="font-size: 14px; line-height: 1.6;">
                                We look forward to helping you get the most out of our services!
                            </p>
          
                            <p style="margin-top: 20px;">Best regards,</p>
          
                            <div style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #e5e7eb; padding-top: 10px; text-align: center;">
                                <p>
                                    &copy; 2024 Designed, Developed and Hosted by National Informatics Center.
                                </p>
                            </div>
                        </div>
                    </body>
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
    catch (error) {
        console.log(error);
    }
}

module.exports = { congratulation };