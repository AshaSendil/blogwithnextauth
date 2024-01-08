import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import writePage from "../model/Write";
import dbConnect from "../../mongoose/dbconnect";

export async function POST(request: Request) {
  const { title, content, imageUrl } = await request.json();

  await dbConnect();


  const newPost = new writePage({
    title,
    content,
    imageUrl,
  });
  console.log(imageUrl,"url")

  try {
    await newPost.save();
    return new NextResponse("Post has been created", {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}

export async function GET(request: Request) {
  try {
    await dbConnect();

    const posts = await writePage.find({}, { _id: 0, __v: 0 });

    return new NextResponse(JSON.stringify(posts), {
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