import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: email,
    pass: emailPassword,
  },
  port: 465,
});

export const mailOptions = {
  from: email,
  to: email,
};
