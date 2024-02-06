"use server";
import { NextResponse } from "next/server";
import dbConnect from "../../../mongoose/dbconnect";
import jwt from "jsonwebtoken";
import user from "../../model/user";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  // Extract the token from the query parameters
  // Create a new URL object from the request URL
  const url = new URL(request.url);

  // Access the searchParams property to get the query parameters
  const queryParams = url.searchParams;
  const token = queryParams.get("token");

  console.log(token, "token");

  try {
    await dbConnect();
    // Verify the JWT using the public key
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    // If verification succeeds, proceed with the logic
    const existingUser = user.findOne({ email: decoded?.email });
    if (existingUser) {
      // Redirect the user from the backend
      return new NextResponse("", {
        status: 302, // 302 Found (temporary redirect)
        headers: {
            'Location': `${process.env.NEXT_PUBLIC_BASE_PATH}/newpassword`
        },
      });
    }

    return new NextResponse(JSON.stringify("test"), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error, "error");
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
