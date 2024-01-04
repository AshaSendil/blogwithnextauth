import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import user from "../../model/user";
import dbConnect from "../../../mongoose/dbconnect";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new user({
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}

export async function GET(request: Request) {
  // TODO: nedded to be hanlded
  return NextResponse.json({ message: "Hello World" });
}
