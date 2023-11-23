import Post from "@/database/post-model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { body, userId } = await req.json();
    const post = await Post.create({ body, user: userId });

    return NextResponse.json(post);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}

export async function GET(req:Request) {
  try{
    await connectToDatabase();
    const {searchParams} = new URL(req.url)
    const limit = searchParams.get("limit")

    // const posts = await Post.find({}).populate()
  }catch (error){
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
