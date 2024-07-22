import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";

export async function PUT(request, { params }) {
  try {
    const { title, description } = await request.json();

    await connectMongoDB();

    const existingTopic = await Topic.findById(params.id);
    existingTopic.title = title;
    existingTopic.description = description;

    await existingTopic.save();

    return NextResponse.json(
      { message: "Topic updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update topic" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    await connectMongoDB();

    // Usage: Topic.findById(params.id)
    // Purpose: Specifically designed to find a document by its _id.
    // Simpler: Directly takes the _id as an argument, making it more straightforward for this use case.
    // Performance: Slightly optimized for finding documents by _id.
    const topic = await Topic.findById(params.id);

    //Usage: Topic.findOne({ _id: params.id })
    // Purpose: More general-purpose, can find a document based on any field or combination of fields.
    // Flexibility: Allows for more complex queries beyond just the _id.
    // const topic = await Topic.findOne({ _id: params.id });

    return NextResponse.json({ topic }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch topic" },
      { status: 500 }
    );
  }
}
