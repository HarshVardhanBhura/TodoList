//we only POST a new todo or GET all todos here
import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import { Todo } from "@/models/Todo";
import { auth } from "@clerk/nextjs/server";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  const todos = await Todo.find({ userId });

  const mapped = todos.map((t) => ({
    id: t._id.toString(), // ✅ this is what your frontend expects
    todo: t.todo,
    isComplete: t.isComplete,
    isBookmarked: t.isBookmarked,
    reminder: t.reminder ?? null,
  }));

  return NextResponse.json(mapped);
}


export async function POST(req) {
  await connectDB();
  const { userId } = await auth();
  console.log("AUTH USER ID from Clerk:", userId);

  const body = await req.json();
  

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const todo = await Todo.create({
    userId,
    todo: body.todo,
    isComplete: false,
    isBookmarked: false,
  });

  return NextResponse.json({
    id: todo._id.toString(),
    todo: todo.todo,
    isComplete: todo.isComplete,
    isBookmarked: todo.isBookmarked,
  });
}
