const nodemailer = require("nodemailer");
const dotenv = require('dotenv')
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const emailId = process.env.emailId;
const passKey = process.env.passKey;


const registration = async (name, email) => {
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
            subject: "Regarding registration on Job Finder",

            html: `
                <html>
                    <body style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px; color: #333;">
                        <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          
                        <h3 style="text-align: center; color: #1a202c; margin-bottom: 20px;">
                            Welcome to Job Finder !!
                        </h3>
    
                        <div style="text-align: center; margin: 20px 0;">
                            <img
                                src="https://media.licdn.com/dms/image/v2/D4E12AQGsyXeSqLadEw/article-cover_image-shrink_720_1280/B4EZVIFnWRGgAM-/0/1740671186886?e=2147483647&v=beta&t=Mphlll-JGtzPBgBXJrlL7u6r6zw_im2JfkVBaIo0H0s"
                                alt="task icons"
                                style="width: 60%; max-width: 300px; height: auto; border-radius: 8px;"
                                title="task icons"
                            />
                        </div>
          
                        <h4 style="margin-top: 30px;">
                            Dear ${name},
                        </h4>
          
                        <p style="line-height: 1.6; margin-top: 10px;">
                            Thank you for registering with us. We’re excited to have you as part of our community!! If you have any questions or need help getting started, feel free to reach out.
                        </p>
          
                        <p style="line-height: 1.6;">
                            We look forward to helping you get the most out of our services!
                        </p>
          
                        <p style="margin-top: 20px;">Best regards,</p>
          
                        <div style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #e2e8f0; padding-top: 10px;">
                            <p>&copy; 2024 Designed, Developed and Hosted by National Informatics Center.</p>
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

module.exports = { registration };