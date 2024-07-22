import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, description } = await request.json();

    await connectMongoDB();
    const topic = new Topic({ title, description });
    await topic.save();
    // await Topic.create({ title, description });

    return NextResponse.json(
      { message: "Topic created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create topic" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectMongoDB();
    const topics = await Topic.find();

    return NextResponse.json({ topics });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectMongoDB();
    // const id = request.nextUrl.searchParams.get("id");
    // Parse the request URL
    const url = new URL(request.url);

    // Extract the 'id' query parameter
    const id = url.searchParams.get("id");
    await Topic.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Topic deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete topic" },
      { status: 500 }
    );
  }
}
