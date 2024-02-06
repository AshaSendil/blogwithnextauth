import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import user from "../../model/user";
import dbConnect from "../../../mongoose/dbconnect";

export async function POST(request: Request) {
  const { password, confirmpassword } = await request.json();

  console.log(password,confirmpassword)

  // Check if password and confirmPassword match
  if (password !== confirmpassword) {
    return new NextResponse("Password and confirm password do not match", {
      status: 400,
    });
  }

  try {
    // Connect to the database
    await dbConnect();

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find the existing user

    const existingUser = await user.findOne();

    if (!existingUser) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }

    // Update the user's password
    existingUser.password = hashedPassword;

    // Save the changes
    await existingUser.save();

    return new NextResponse("Password updated successfully", {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
