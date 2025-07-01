// import { NextResponse } from "next/server";
// import connectDB from "@/db/connectDB";
// import { Todo } from "@/models/Todo";
// import { Resend } from "resend";
// import { currentUser } from "@clerk/nextjs/server";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function GET() {
//   await connectDB();
//   const now = new Date();
//   const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);

//   const dueTodos = await Todo.find({
//     reminder: { $gte: oneMinuteAgo, $lte: now },
//     reminderSent: { $ne: true },
//   });

//   for (const todo of dueTodos) {
//     // If you store email with user, get it via Clerk
//     const userId = todo.userId;
//     const user = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
//       },
//     }).then(res => res.json());

//     const email = user?.email_addresses?.[0]?.email_address;
//     console.log("Sending to:", email);
//     if (!email) continue;

//     await resend.emails.send({
//       from: "reminders@yourdomain.com", // setup in Resend
//       to: email,
//       subject: "⏰ Reminder: " + todo.todo,
//       html: `<p>Hi! You asked to be reminded: <strong>${todo.todo}</strong></p><p>This is your reminder 🕒</p>`,
//     });


//     todo.reminderSent = true;
//     await todo.save();
//   }

//   return NextResponse.json({ sent: dueTodos.length });
// }

// import { NextResponse } from "next/server";
// import connectDB from "@/db/connectDB";
// import { Todo } from "@/models/Todo";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function GET() {
//   await connectDB();
//   const now = new Date();
//   const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);

//   // 1. Find all todos that are due and haven't been sent
//   const dueTodos = await Todo.find({
//     reminder: { $gte: oneMinuteAgo, $lte: now },
//     reminderSent: { $ne: true },
//   });

//   let sentCount = 0;

//   for (const todo of dueTodos) {
//     const userId = todo.userId;

//     // 2. Get user email from Clerk API
//     const userResponse = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
//       },
//     });

//     const user = await userResponse.json();
//     const email = user?.email_addresses?.[0]?.email_address;

//     if (!email) {
//       console.log(`❌ No email found for user ${userId}`);
//       continue;
//     }

//     console.log("📤 Sending to:", email);

//     try {
//       const result = await resend.emails.send({
//         from: "onboarding@resend.de", // ✅ must match your verified Resend domain
//         to: email,
//         subject: `⏰ Reminder: ${todo.todo}`,
//         html: `
//           <p>Hi ${user.first_name || ""},</p>
//           <p>This is your reminder for: <strong>${todo.todo}</strong>.</p>
//           <p>Hope you're on track! ✅</p>
//         `,
//       });

//       console.log("✅ Email sent:", result?.id || result);
//       todo.reminderSent = true;
//       await todo.save();
//       sentCount++;
//     } catch (error) {
//       console.error("❌ Error sending email to", email, error);
//     }
//   }

//   return NextResponse.json({ sent: sentCount });
// }

// import { NextResponse } from "next/server";
// import connectDB from "@/db/connectDB";
// import { Todo } from "@/models/Todo";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function GET() {
//   await connectDB();
//   const now = new Date();
//   const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);

//   const dueTodos = await Todo.find({
//     reminder: { $gte: oneMinuteAgo, $lte: now },
//     reminderSent: { $ne: true },
//   });

//   let sentCount = 0;

//   for (const todo of dueTodos) {
//     const userId = todo.userId;

//     // Fetch user info from Clerk
//     const userResponse = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
//       },
//     });

//     const user = await userResponse.json();
//     const email = user?.email_addresses?.[0]?.email_address;

//     if (!email) {
//       console.log(`❌ No email found for user ${userId}`);
//       continue;
//     }

//     console.log("📤 Sending to:", email);

//     try {
//       const result = await resend.emails.send({
//         from: "onboarding@resend.dev", // ✅ correct domain for testing
//         to: email,
//         subject: `⏰ Reminder: ${todo.todo}`,
//         html: `
//           <p>Hi ${user.first_name || "there"},</p>
//           <p>This is your reminder for: <strong>${todo.todo}</strong>.</p>
//           <p>Hope you're on track! ✅</p>
//         `,
//       });

//       console.log("✅ Email sent:", result?.id || result);
//       todo.reminderSent = true;
//       await todo.save();
//       sentCount++;
//     } catch (error) {
//       console.error("❌ Error sending email to", email, error);
//     }
//   }

//   return NextResponse.json({ sent: sentCount });
// }

// import { NextResponse } from "next/server";
// import connectDB from "@/db/connectDB";
// import { Todo } from "@/models/Todo";
// import { Resend } from "resend";
// import twilio from "twilio";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function GET() {
//   await connectDB();
//   const now = new Date();
//   const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000); // widen for testing

//   // Find reminders within last 10 mins not sent yet
//   const dueTodos = await Todo.find({
//     reminder: { $gte: tenMinutesAgo, $lte: now },
//     reminderSent: { $ne: true },
//   });

//   console.log(`🕵️ Found ${dueTodos.length} todos to remind`);

//   let sentCount = 0;

//   for (const todo of dueTodos) {
//     try {
//       const userId = todo.userId;

//       // Fetch user email from Clerk
//       const userResponse = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
//         },
//       });

//       const user = await userResponse.json();
//       const email = user?.email_addresses?.[0]?.email_address;

//       if (!email) {
//         console.log(`❌ No email found for user ${userId}`);
//         continue;
//       }

//       console.log("📤 Sending to:", email);

//       const result = await resend.emails.send({
//         from: "onboarding@resend.dev", // default Resend sandbox sender
//         to: email,
//         subject: `⏰ Reminder: ${todo.todo}`,
//         html: `
//           <p>Hi ${user.first_name || "there"},</p>
//           <p>This is your reminder for: <strong>${todo.todo}</strong>.</p>
//           <p>Stay on track! ✅</p>
//         `,
//       });

//       console.log("✅ Email sent:", result?.id || JSON.stringify(result));
//       todo.reminderSent = true;
//       await todo.save();
//       sentCount++;

//     } catch (err) {
//       console.error("❌ Failed to send reminder:", err);
//     }
//   }

//   return NextResponse.json({ sent: sentCount, timeWindow: { from: tenMinutesAgo.toISOString(), to: now.toISOString() } });
// }


// import { NextResponse } from "next/server";
// import connectDB from "@/db/connectDB";
// import { Todo } from "@/models/Todo";
// import { Resend } from "resend";
// import twilio from "twilio";

// const resend = new Resend(process.env.RESEND_API_KEY);

// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// export async function GET() {
//   await connectDB();
//   const now = new Date();
//   const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000); // widen for testing

//   const dueTodos = await Todo.find({
//     reminder: { $gte: tenMinutesAgo, $lte: now },
//     reminderSent: { $ne: true },
//   });

//   console.log(`🕵️ Found ${dueTodos.length} todos to remind`);

//   let sentCount = 0;

//   for (const todo of dueTodos) {
//     try {
//       const userId = todo.userId;

//       const userResponse = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
//         },
//       });

//       const user = await userResponse.json();
//       const email = user?.email_addresses?.[0]?.email_address;
//       const phone = user?.phone_numbers?.[0]?.phone_number; // e.g. "+919876543210"

//       // 📨 Send email reminder
//       if (email) {
//         const result = await resend.emails.send({
//           from: "onboarding@resend.dev",
//           to: email,
//           subject: `⏰ Reminder: ${todo.todo}`,
//           html: `
//             <p>Hi ${user.first_name || "there"},</p>
//             <p>This is your reminder for: <strong>${todo.todo}</strong>.</p>
//             <p>Stay on track! ✅</p>
//           `,
//         });
//         console.log("✅ Email sent to:", email, result?.id || JSON.stringify(result));
//       } else {
//         console.log(`⚠️ No email for user ${userId}`);
//       }

//       // 💬 Send WhatsApp reminder
//       if (phone) {
//         try {
//           const message = await twilioClient.messages.create({
//             from: "whatsapp:+14155238886", // Twilio sandbox number
//             to: `whatsapp:${phone}`,
//             body: `🔔 Reminder: ${todo.todo}`,
//           });
//           console.log("✅ WhatsApp sent to:", phone, message.sid);
//         } catch (twilioErr) {
//           console.error("❌ WhatsApp failed:", twilioErr.message);
//         }
//       } else {
//         console.log(`⚠️ No phone number for user ${userId}`);
//       }

//       todo.reminderSent = true;
//       await todo.save();
//       sentCount++;

//     } catch (err) {
//       console.error("❌ Failed to send reminder:", err);
//     }
//   }

//   return NextResponse.json({
//     sent: sentCount,
//     timeWindow: { from: tenMinutesAgo.toISOString(), to: now.toISOString() }
//   });
// }

import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import { Todo } from "@/models/Todo";
import { Resend } from "resend";
import twilio from "twilio";
import { User } from "@/models/User"; ``

const resend = new Resend(process.env.RESEND_API_KEY);
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function GET() {
  await connectDB();
  const now = new Date();
  const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000); // For testing: wider window

  const dueTodos = await Todo.find({
    reminder: { $gte: tenMinutesAgo, $lte: now },
    reminderSent: { $ne: true },
  });

  console.log(`🕵️ Found ${dueTodos.length} todos to remind`);

  let sentCount = 0;

  for (const todo of dueTodos) {
    let reminderSent = false;

    try {
      const userResponse = await fetch(`https://api.clerk.com/v1/users/${todo.userId}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      });

      const user = await userResponse.json();
      const email = user?.email_addresses?.[0]?.email_address;
      const phone = user?.phone_numbers?.[0]?.phone_number;
      const firstName = user?.first_name || "there";

      // 📨 Send email
      if (email) {
        const emailResult = await resend.emails.send({
          from: "onboarding@resend.dev", // Works with sandbox
          to: email,
          subject: `⏰ Reminder: ${todo.todo}`,
          html: `
            <p>Hi ${firstName},</p>
            <p>This is your reminder for: <strong>${todo.todo}</strong>.</p>
            <p>Stay on track! ✅</p>
          `,
        });
        console.log(`📧 Email sent to ${email}`, emailResult?.id || JSON.stringify(emailResult));
        reminderSent = true;
      } else {
        console.log(`⚠️ No email found for user ${todo.userId}`);
      }

      // 💬 Send WhatsApp
      // if (phone) {
      //   try {
      //     const msg = await twilioClient.messages.create({
      //       from: "whatsapp:+14155238886", // Twilio sandbox sender
      //       to: `whatsapp:${phone}`,
      //       body: `🔔 Reminder: ${todo.todo}`,
      //     });
      //     console.log(`📱 WhatsApp sent to ${phone}: ${msg.sid}`);
      //     reminderSent = true;
      //   } catch (twilioErr) {
      //     console.error(`❌ WhatsApp to ${phone} failed:`, twilioErr.message);
      //   }
      // } else {
      //   console.log(`⚠️ No phone for user ${todo.userId}`);
      // }

      const localUser = await User.findOne({ clerkId: todo.userId });

      if (phone && localUser?.whatsappJoined) {
        const TWILIO_WINDOW_MS = 24 * 60 * 60 * 1000;
        const joinedAt = new Date(localUser.whatsappJoinedAt).getTime();
        const now = Date.now();

        if (now - joinedAt > TWILIO_WINDOW_MS) {
          // ❌ Expired — disable reminders
          await User.updateOne(
            { clerkId: todo.userId },
            { $set: { whatsappJoined: false } }
          );
          console.log(`⏳ WhatsApp subscription expired for ${todo.userId}`);
        } else {
          try {
            const msg = await twilioClient.messages.create({
              from: "whatsapp:+14155238886",
              to: `whatsapp:${phone}`,
              body: `🔔 Reminder: ${todo.todo}`,
            });
            console.log(`📱 WhatsApp sent to ${phone}: ${msg.sid}`);
            reminderSent = true;
          } catch (twilioErr) {
            console.error(`❌ WhatsApp to ${phone} failed:`, twilioErr.message);
          }
        }
      } else {
        console.log(`⚠️ WhatsApp not sent to ${todo.userId} — either phone missing or not joined`);
      }



      // ✅ Update reminder status if either was sent
      if (reminderSent) {
        todo.reminderSent = true;
        await todo.save();
        sentCount++;
      }

    } catch (err) {
      console.error("❌ Error processing reminder:", err.message);
    }
  }

  return NextResponse.json({
    sent: sentCount,
    timeWindow: { from: tenMinutesAgo.toISOString(), to: now.toISOString() },
  });
}



