import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/models/User";

export async function GET() {
  await connectDB();

  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await User.findOne({ clerkId: userId });

  return NextResponse.json({
    whatsappJoined: user?.whatsappJoined || false,
    whatsappJoinedAt: user?.whatsappJoinedAt || null,
  });
}
