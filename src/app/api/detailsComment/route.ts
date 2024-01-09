import { NextResponse } from "next/server";
import comments from "../model/Comment";
import dbConnect from "../../mongoose/dbconnect";

export async function POST(request: Request) {
  const { comment } = await request.json();

  await dbConnect();

  const newComment = new comments({
    comment,
  });

  try {
    await newComment.save();
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

    let posts: any;
    if (request?.url.includes("?")) {
      posts = await comments.findOne({}, { _id: 0, __v: 0 });
    } else {
      posts = await comments.find({}, { _id: 0, __v: 0 });
    }

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
