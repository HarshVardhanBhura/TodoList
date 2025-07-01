import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/db/connectDB";
import { Todo } from "@/models/Todo";

// PATCH - Update a todo
export async function PATCH(req, { params }) {
  await connectDB();
  const { userId } = await auth();
  const { id } = await  params;
  const body = await req.json();

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const todo = await Todo.findById(id);
  if (!todo) return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  if (todo.userId !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const updatedTodo = await Todo.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json({
    id: updatedTodo._id.toString(), // ✅ Ensure id is included
    todo: updatedTodo.todo,
    isComplete: updatedTodo.isComplete,
    isBookmarked: updatedTodo.isBookmarked,
  });
}

// DELETE - Delete a todo
export async function DELETE(req, { params }) {
  await connectDB();
  const { userId } = await  auth();
  const { id } = await params;

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const todo = await Todo.findById(id);
  if (!todo) return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  if (todo.userId !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await Todo.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}