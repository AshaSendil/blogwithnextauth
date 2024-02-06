import { NextResponse } from "next/server";
import dbConnect from "../../../mongoose/dbconnect";
import user from "../../model/user";
import * as nodemailer from "nodemailer";
import crypto from "crypto";
import AWS from "aws-sdk";
import jwt from 'jsonwebtoken';

// API endpoint for handling forgot password requests
export async function POST(request: Request) {
  const body  = await request.json();
  const {email} = body;
console.log(email,"emailllllllllllllllllllllll")
  await dbConnect();
  function generateResetToken(email:any) {
    // Generate a unique token using jwt
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    console.log(token, "token");
    return token;
}


  // Function to send a password reset email
  function sendPasswordResetEmail(email: string, resetToken: string) {
    // Implement your logic to send an email with the password reset link using nodemailer
    const SENDER_EMAIL = "alert@thinxview.com";
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      region: process.env.AWS_REGION!,
    });
    const transporter = nodemailer.createTransport({
      SES: new AWS.SES({ apiVersion: "2010-12-01" }),
    });

    const mailOptions = {
      from: SENDER_EMAIL,
      to: "aashasendil@gmail.com",
      subject: "Alert from Thinxview",
      html: `<p>Click on the following link to reset your password: ${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth/email-verification?token=${resetToken}</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  }

  try {
    // Find the user with the provided email
    // const existingUser = await user.findOne({ email });

    // if (!existingUser) {
    //   return new NextResponse("User not found", {
    //     status: 404,
    //   });
    // }

    // Generate a unique token for password reset (you can use crypto or any secure method)
    const resetToken = generateResetToken(email);
    
    // Update the user document with the reset token and expiry
    // existingUser.resetToken = resetToken;
    // existingUser.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
    // await existingUser.save();

    // Send a password reset email
    await sendPasswordResetEmail(email, resetToken);

    return new NextResponse("Password reset email sent", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}


export async function GET(request: Request) {
    try {
      await dbConnect();
  
    
  
      return new NextResponse(JSON.stringify('test'), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      return new NextResponse(error.message, {
        status: 500,
      });
    }
  }
  