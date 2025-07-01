import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/models/User";

export async function POST(req) {
  await connectDB();

  const { userId } = await auth(); // Get Clerk user ID
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { joined } = body;

  if (joined !== true) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // ✅ Add timestamp for when user joined WhatsApp reminders
  await User.findOneAndUpdate(
    { clerkId: userId },
    {
      $set: {
        whatsappJoined: true,
        whatsappJoinedAt: new Date(), // <-- this line is important
      },
    },
    { upsert: true, new: true }
  );

  return NextResponse.json({ success: true });
}
