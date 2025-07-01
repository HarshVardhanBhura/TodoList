// "use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import { Bounce } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { v4 as uuidv4 } from 'uuid';
// import { CopilotKit, useCopilotAction } from "@copilotkit/react-core";
// import { CopilotPopup, CopilotSidebar, useCopilotChatSuggestions } from "@copilotkit/react-ui";
// import "@copilotkit/react-ui/styles.css";
// import { useUser } from "@clerk/nextjs";
// import { Skeleton } from "@/components/ui/skeleton";


// export default function Home() {
//   const [todo, setTodo] = useState("");
//   const [todos, setTodos] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editedText, setEditedText] = useState("");
//   const [filter, setFilter] = useState("All");
//   const { user, isSignedIn } = useUser();
//   const [loaded, setLoaded] = useState(false);

//   const fetchTodos = async () => {
//   if (isSignedIn && user?.id) {
//     const res = await fetch(`/api/todo?userId=${user.id}`);
//     const data = await res.json();
//     setTodos(data);
//   } else {
//     const stored = localStorage.getItem("todos");
//     if (stored) {
//       setTodos(JSON.parse(stored));
//     }
//   }
//   setLoaded(true); // ✅ Mark as done
// };
//   // useEffect(() => {
//   //   let storedTodos = localStorage.getItem("todos");
//   //   if (storedTodos) {
//   //     let parsed = JSON.parse(storedTodos);
//   //     // let withIds = parsed.map(todo => ({
//   //     //   ...todo,
//   //     //   id: todo.id || uuidv4(),
//   //     // }));
//   //     setTodos(parsed);
//   //   }
//   // }, []);

//  useEffect(() => {
//   fetchTodos();
// }, [isSignedIn, user]);

//   // useEffect(() => {
//   //   localStorage.setItem("todos", JSON.stringify(todos));
//   // }, [todos]);

//  useEffect(() => {
//   if (loaded && !isSignedIn) {
//     localStorage.setItem("todos", JSON.stringify(todos));
//   }
// }, [todos, isSignedIn, loaded]);

//   useCopilotAction({
//     name: "addTodo",
//     description: "Add a new todo item",
//     parameters: [
//       { name: "task", type: "string", description: "The name of the task to add" },
//     ],
//     handler: async ({ task }) => {
//       handleAdd(task);
//     },
//   });

//   useCopilotAction({
//     name: "deleteTodo",
//     description: "Delete a todo item",
//     parameters: [
//       { name: "task", type: "string", description: "The name of the task to delete" },
//     ],
//     handler: async ({ task }) => {
//       const match = todos.find(item => item.todo.toLowerCase() === task.toLowerCase());
//       if (match) handleDelete(match.id);
//     },
//   });

//   useCopilotAction({
//     name: "editTodo",
//     description: "Edit a todo item",
//     parameters: [
//       { name: "from", type: "string", description: "Current name of the task" },
//       { name: "to", type: "string", description: "New name of the task" },
//     ],
//     handler: async ({ from, to }) => {
//       const match = todos.find(item => item.todo.toLowerCase() === from.toLowerCase());
//       if (match) {
//         setTodos(todos.map(item =>
//           item.id === match.id ? { ...item, todo: to } : item
//         ));
//       }
//     },
//   });

//   useCopilotAction({
//     name: "bookmarkTodo",
//     description: "Toggle bookmark for a task",
//     parameters: [
//       { name: "task", type: "string", description: "The name of the task to bookmark" },
//     ],
//     handler: async ({ task }) => {
//       const match = todos.find(item => item.todo.toLowerCase() === task.toLowerCase());
//       if (match) handleBookmark(match.id);
//     },
//   });

//   useCopilotChatSuggestions([
//     { name: "Add Task", suggestion: "Add task 'Read a book'" },
//     { name: "Edit Task", suggestion: "Edit 'Read a book' to 'Read two books'" },
//     { name: "Delete Task", suggestion: "Delete task 'Read two books'" },
//     { name: "Bookmark Task", suggestion: "Bookmark task 'Read a book'" },
//   ]);


//   const handleEdit = (id) => {
//     const item = todos.find((item) => item.id === id);
//     setEditingId(id);
//     setEditedText(item.todo);
//   };

// const handleAdd = async (todoname) => {
//   if (!todoname.trim()) return;
//   let exists = todos.some(item => item.todo.toLowerCase() === todoname.toLowerCase());
//   if (exists) return;

//   if (isSignedIn && user?.id) {
//     try {
//       const res = await fetch("/api/todo", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ todo: todoname }) // ✅ remove userId here; backend gets from Clerk
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         console.error("Error adding todo:", data);
//         toast.error(data.error || "Error adding task");
//         return;
//       }

//       console.log("Added:", data);
//       await fetchTodos();
//     } catch (err) {
//       console.error("Add error:", err);
//       toast.error("Add failed");
//     }
//   } else {
//     setTodos([...todos, { id: uuidv4(), todo: todoname, isComplete: false, isBookmarked: false }]);
//   }

//   setTodo("");
// };


// const handleSaveEdit = async (id) => {
//   const trimmedText = editedText.trim();
//   if (!trimmedText) return;

//   const isDuplicate = todos.some((item) =>
//     item.id !== id && item.todo.toLowerCase() === trimmedText.toLowerCase()
//   );
//   if (isDuplicate) return;

//   if (isSignedIn) {
//     await fetch(`/api/todo/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ todo: trimmedText }),
//     });
//     await fetchTodos(); // ✅ reload from DB
//   } else {
//     setTodos(todos.map(item =>
//       item.id === id ? { ...item, todo: trimmedText } : item
//     ));
//   }

//   setEditingId(null);
// };


// const handleDelete = async (id) => {
//   try {
//     if (isSignedIn) {
//       const res = await fetch(`/api/todo/${id}`, { method: "DELETE" });
//       const result = await res.json();
//       if (!res.ok) {
//         console.error("Delete error:", result);
//         toast.error(result.error || "Delete failed");
//         return;
//       }
//       await fetchTodos();
//     } else {
//       setTodos(todos.filter((item) => item.id !== id));
//     }
//   } catch (err) {
//     console.error("Delete failed:", err);
//     toast.error("Delete failed");
//   }
// };


// const handleCheckbox = async (id) => {
//   console.log("Clicked checkbox for id:", id);

//   const updatedTodos = todos.map(item =>
//     item.id === id ? { ...item, isComplete: !item.isComplete } : item
//   );
//   setTodos(updatedTodos);

//   if (isSignedIn) {
//     const toggledItem = updatedTodos.find(item => item.id === id);
//     await fetch(`/api/todo/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ isComplete: toggledItem.isComplete }),
//     });
//     await fetchTodos();
//   }
// };


// const handleBookmark = async (id) => {
//   const updatedTodos = todos.map(item =>
//     item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
//   );
//   setTodos(updatedTodos);

//   if (isSignedIn) {
//     const toggledItem = updatedTodos.find(item => item.id === id);
//     await fetch(`/api/todo/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ isBookmarked: toggledItem.isBookmarked }),
//     });
//     await fetchTodos(); // ✅ reload
//   }
// };



//   const filteredTodos = todos.filter(todo => {
//     if (filter === "All") return true;
//     if (filter === "To-Do") return !todo.isComplete;
//     if (filter === "Completed") return todo.isComplete;
//     if (filter === "Bookmarked") return todo.isBookmarked;
//   });

//   return (
//     <>
//       <CopilotPopup
//         instructions="You are a smart AI that helps manage tasks in a to-do list..."
//         chatTitle="Todo Assistant"
//         defaultOpen={false}
//         clickOutsideToClose={true}
//         placeholder="How can I help with your tasks?"
//         labels={{ title: "Task Copilot", initial: "Ask me to update your tasks!" }}
//         style={{
//           width: "320px",       // adjust width
//           height: "400px",      // adjust height
//           fontSize: "14px",     // optional: make font a bit smaller
//           bottom: "1.5rem",
//           right: "1.5rem",
//           borderRadius: "1rem",
//           zIndex: 1000,
//         }}
//       />
//       <ToastContainer />
//       <div className="relative container mx-auto flex flex-col justify-center items-center gap-7">

// <div className="w-[850px] flex justify-center items-center gap-6">
//   <motion.input
//     onChange={(e) => setTodo(e.target.value)}
//     onKeyDown={(e) => e.key === 'Enter' && handleAdd(todo)}
//     value={todo}
//     initial={{ y: -50, opacity: 0 }}
//     animate={{ y: 0, opacity: 1 }}
//     transition={{ type: "spring", stiffness: 500, damping: 20 }}
//     className="w-[700px] mt-14 p-4 rounded-full bg-white/40"
//     type="text"
//     placeholder="Enter the task you want to add"
//   />
//   <motion.div
//     initial={{ scale: 0 }}
//     animate={{ scale: 1 }}
//     transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
//   >
//     <Button onClick={() => handleAdd(todo)} className="flex justify-start w-[100px] mt-14 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white transition-all">
//       <Image width={20} height={20} src={"/plus-button.svg"} alt="plus" />
//       Save
//     </Button>
//   </motion.div>
// </div>

// <motion.div
//   initial={{ opacity: 0, y: 10 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
//   className="pr-8 text-sm italic text-white/70 tracking-wide font-light text-center"
// >
//   Sign in to access your tasks, favorites, and a smoother workflow!
// </motion.div>

// <motion.div
//   initial={{ opacity: 0, y: 10 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
//   className="flex w-[850px] justify-end gap-3 mt-2"
// >
//   {["All", "To-Do", "Completed", "Bookmarked"].map((type) => (
//     <Button
//       key={type}
//       onClick={() => setFilter(type)}
//       className={`px-5 py-2 rounded-full transition-all ${filter === type
//         ? "bg-indigo-600 text-white"
//         : "bg-white/20 text-white hover:bg-indigo-500 hover:text-white"
//         }`}
//     >
//       {type}
//     </Button>
//   ))}
// </motion.div>

// <AnimatePresence>
//   {filteredTodos.map((item) => (
//     <motion.div
//       key={item.id}
//       layout // optional: enables smooth position transitions
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, x: 100, scale: 0.9 }}
//       // transition={{
//       //   opacity: { duration: 0.2 },
//       //   x: { type: "spring", stiffness: 120, damping: 14 },
//       //   scale: { duration: 0.15 }
//       // }}
//       transition={{
//         duration: 0.30,
//         ease: "easeInOut"
//       }}
//       className="w-[850px] bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-md p-6 flex items-center justify-between"
//     >
//       <div className="flex items-center gap-4">
//         <input onClick={() => handleCheckbox(item.id)} type="checkbox" checked={item.isComplete} className="accent-indigo-500 w-5 h-5" />
//         {editingId === item.id ? (
//           <div className="flex items-center gap-2">
//             <input
//               autoFocus
//               value={editedText}
//               onChange={(e) => setEditedText(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(item.id)}
//               className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white w-[400px] focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//             <button
//               onClick={() => handleSaveEdit(item.id)}
//               className="w-9 h-9 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full transition-all"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.707-4.707a1 1 0 011.414-1.414L8.414 12.586l7.879-7.879a1 1 0 011.414 0z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </div>
//         ) : (
//           <span className={`${item.isComplete ? "line-through" : ""} text-lg font-medium`}>
//             {item.todo}
//           </span>
//         )}
//       </div>
//       <div className="flex items-center gap-3">
//         <button onClick={() => handleBookmark(item.id)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-yellow-100/10 text-white hover:text-yellow-500 transition-all">
//           {!item.isBookmarked ? (
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-white hover:text-yellow-400 transition-colors">
//               <path d="M19 21l-7-5.5L5 21V5a2 2 0 012-2h10a2 2 0 012 2z" />
//             </svg>
//           ) : (
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="white" className="w-6 h-6 text-yellow-300 transition-all drop-shadow-md">
//               <path d="M19 21l-7-5.5L5 21V5a2 2 0 012-2h10a2 2 0 012 2z" />
//             </svg>
//           )}
//         </button>
//         <button onClick={() => handleEdit(item.id)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-blue-100/10 text-blue-500 hover:text-blue-800 transition-all hover:scale-110 hover:shadow-md transition-transform">
//           <Image width={18} height={18} src="/edit.svg" alt="edit" />
//         </button>
//         <button onClick={() => handleDelete(item.id)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-100/10 text-red-500 hover:text-red-700 transition-all hover:scale-110 hover:shadow-md transition-transform">
//           <Image width={18} height={18} src="/delete.svg" alt="delete" />
//         </button>
//       </div>
//     </motion.div>
//   ))}
// </AnimatePresence>
// </div>

//     </>
//   );
// }


// "use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState,useRef } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { v4 as uuidv4 } from 'uuid';
// import { CopilotKit, useCopilotAction } from "@copilotkit/react-core";
// import { CopilotPopup, useCopilotChatSuggestions } from "@copilotkit/react-ui";
// import "@copilotkit/react-ui/styles.css";
// import { SignIn, useUser } from "@clerk/nextjs";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";
// import { Calendar24 } from "@/components/ui/dateTime";
// import React from "react";
// import { imageConfigDefault } from "next/dist/shared/lib/image-config";
// import Link from "next/link";
// import { PricingV2TrunkingCountryInstanceOriginatingCallPrices } from "twilio/lib/rest/pricing/v2/country";
// import * as chrono from "chrono-node";



// export default function Home() {
//   const [todo, setTodo] = useState("");
//   const [todos, setTodos] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editedText, setEditedText] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [loading, setLoading] = useState(true);
//   const { user, isSignedIn } = useUser();
//   const calendarRefs = useRef({});
//   const [showConfirmation, setShowConfirmation] = useState(false);


//   const fetchTodos = async () => {
//     NProgress.start();
//     setLoading(true);
//     if (isSignedIn && user?.id) { 
//       const res = await fetch(`/api/todo?userId=${user.id}`);
//       const data = await res.json();
//       setTodos(data);
//     } else {
//       const stored = localStorage.getItem("todos");
//       if (stored) {
//         setTodos(JSON.parse(stored));
//       } else {
//         setTodos([]);
//       }
//     }
//     setLoading(false);
//     NProgress.done();
//   };

//  useEffect(() => {
//   const checkWhatsAppStatus = async () => {
//     if (!isSignedIn || !user) return;

//     try {
//       const res = await fetch("/api/user/me");
//       const data = await res.json();

//       const whatsappJoined = data?.whatsappJoined;

//       const joinedAt = data?.whatsappJoinedAt;
//       console.log("WhatsApp joined at:", joinedAt);
//       const hasJoined = !!joinedAt;
//       console.log("WhatsApp joined status:", hasJoined, "at", joinedAt);

//       // 👇 Only show if user previously joined AND it's been >24hrs
//       const expired =
//         hasJoined && !whatsappJoined;

//         console.log("WhatsApp setup expired:", expired);

//       if (expired) {
//         toast.warn(
//           ({ closeToast }) => (
//             <div className="text-white">
//               <p className="font-semibold mb-1">⏳ WhatsApp Setup Expired</p>
//               <p className="text-sm mb-3">
//                 Click below to rejoin and continue receiving reminders.
//               </p>

//               <button
//                 onClick={() => {
//                   handleWhatsAppSetup();
//                   closeToast();
//                   window.open(
//                     "https://wa.me/14155238886?text=join%20newspaper-duck",
//                     "_blank"
//                   );
//                 }}
//                 className="w-full text-sm px-4 py-2 rounded bg-green-600 hover:bg-green-700 transition-all"
//               >
//                 🔁 Rejoin Now
//               </button>
//             </div>
//           ),
//           {
//             position: "top-center",
//             autoClose: false,
//             closeOnClick: false,
//             pauseOnHover: true,
//             style: {
//               background: "#1e1e1e",
//               borderRadius: "12px",
//               padding: "16px",
//               width: "360px",
//             },
//           }
//         );
//       }
//     } catch (err) {
//       console.error("Failed to fetch WhatsApp status:", err);
//     }
//   };

//   checkWhatsAppStatus();
// }, [isSignedIn, user]);



//   useEffect(() => {
//     fetchTodos();
//   }, [isSignedIn, user]);

//   useEffect(() => {
//     if (!isSignedIn) {
//       localStorage.setItem("todos", JSON.stringify(todos));
//     }
//   }, [todos, isSignedIn]);

//   useCopilotAction({
//     name: "addTodo",
//     description: "Add a new todo item",
//     parameters: [
//       { name: "task", type: "string", description: "The name of the task to add" },
//     ],
//     handler: async ({ task }) => {
//       handleAdd(task);
//     },
//   });

//   useCopilotAction({
//     name: "deleteTodo",
//     description: "Delete a todo item",
//     parameters: [
//       { name: "task", type: "string", description: "The name of the task to delete" },
//     ],
//     handler: async ({ task }) => {
//       const match = todos.find(item => item.todo.toLowerCase() === task.toLowerCase());
//       if (match) handleDelete(match.id);
//     },
//   });

//   useCopilotAction({
//     name: "editTodo",
//     description: "Edit a todo item",
//     parameters: [
//       { name: "from", type: "string", description: "Current name of the task" },
//       { name: "to", type: "string", description: "New name of the task" },
//     ],
//     handler: async ({ from, to }) => {
//       const match = todos.find(item => item.todo.toLowerCase() === from.toLowerCase());
//       if (match) {
//         setTodos(todos.map(item =>
//           item.id === match.id ? { ...item, todo: to } : item
//         ));
//       }
//     },
//   });

//   useCopilotAction({
//     name: "bookmarkTodo",
//     description: "Toggle bookmark for a task",
//     parameters: [
//       { name: "task", type: "string", description: "The name of the task to bookmark" },
//     ],
//     handler: async ({ task }) => {
//       const match = todos.find(item => item.todo.toLowerCase() === task.toLowerCase());
//       if (match) handleBookmark(match.id);
//     },
//   });


// useCopilotAction({
//   name: "setReminder",
//   description: "Set a reminder for a to-do item",
//   parameters: [
//     { name: "task", type: "string", description: "The name of the task" },
//     { name: "reminderTime", type: "string", description: "When to set the reminder (e.g., 'in 2 minutes', 'tomorrow at 9am')" },
//   ],
//   handler: async ({ task, reminderTime }) => {
//     const match = todos.find(
//       (item) => item.todo.toLowerCase() === task.toLowerCase()
//     );

//     if (!match) {
//       toast.error(`Task "${task}" not found`);
//       return;
//     }

//     const parsedDate = chrono.parseDate(reminderTime);

//     if (!parsedDate || parsedDate <= new Date()) {
//       toast.error("Please provide a future time for the reminder");
//       return;
//     }

//     const res = await fetch(`/api/todo/${match.id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ reminder: parsedDate }),
//     });

//     if (res.ok) {
//       toast.success(`Reminder set for "${task}" at ${parsedDate.toLocaleString("en-IN")}`);
//       fetchTodos();
//     } else {
//       toast.error("Failed to set reminder");
//     }
//   },
// });


// useCopilotAction({
//   name: "markTodoComplete",
//   description: "Mark a todo item as completed or not completed",
//   parameters: [
//     {
//       name: "task",
//       type: "string",
//       description: "The name of the task to mark as completed/incomplete",
//     },
//     {
//       name: "completed",
//       type: "boolean",
//       description: "Whether the task is completed or not",
//     },
//   ],
//   handler: async ({ task, completed }) => {
//     const match = todos.find(
//       (item) => item.todo.toLowerCase() === task.toLowerCase()
//     );
//     if (!match) return toast.error("Task not found");

//     setTodos((prev) =>
//       prev.map((item) =>
//         item.id === match.id ? { ...item, isComplete: completed } : item
//       )
//     );

//     if (isSignedIn) {
//       const res = await fetch(`/api/todo/${match.id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ isComplete: completed }),
//       });

//       if (!res.ok) {
//         toast.error("Failed to update completion status");
//       } else {
//         fetchTodos();
//       }
//     }
//   },
// });


//   useCopilotChatSuggestions([
//   { name: "Add Task", suggestion: "Add task 'Read a book'" },
//   { name: "Edit Task", suggestion: "Edit 'Read a book' to 'Read two books'" },
//   { name: "Delete Task", suggestion: "Delete task 'Read two books'" },
//   { name: "Bookmark Task", suggestion: "Bookmark task 'Read a book'" },
//   { name: "Mark Complete", suggestion: "Mark task 'Read a book' as completed" },
//   { name: "Set Reminder", suggestion: "Set a reminder for 'Read a book' at 7 PM today" }
// ]);


//  const handleConfirmYes = async () => {
//   const res = await fetch("/api/user/whatsapp-joined", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json", // ✅ Required
//     },
//     body: JSON.stringify({ joined: true }),
//   });

//   if (res.ok) {
//     toast.success("✅ WhatsApp reminders enabled!", {
//       position: "top-center",
//     });
//     setShowConfirmation(false);
//   } else {
//     toast.error("❌ Failed to enable WhatsApp reminders.", {
//       position: "top-center",
//     });
//   }
// };



// const handleWhatsAppSetup = () => {
//   // Custom toast content
//   toast(
//     ({ closeToast }) => (
//       <div className="text-white">
//         <p className="font-bold mb-1">✅ WhatsApp Setup Almost Done</p>
//         <p className="text-sm mb-2">
//           Please send the message in your Twilio WhatsApp chat to enable reminders.
//         </p>
//         <p className="text-xs text-yellow-400 bg-yellow-900 p-2 rounded mb-2">
//           ⚠️ Subscription expires in 24 hours unless confirmed — reminders will stop after that.
//         </p>
//         <div className="flex gap-3 justify-end">
//           <button
//             onClick={async () => {
//           await handleConfirmYes();
//           closeToast();
//         }}
//             className="text-sm px-3 py-1 rounded bg-green-600 hover:bg-green-700"
//           >
//             ✅ Yes, I’ve Done It
//           </button>
//           <button
//             onClick={closeToast}
//             className="text-sm px-3 py-1 rounded bg-red-500 hover:bg-red-600"
//           >
//             ❌ Not Yet
//           </button>
//         </div>
//       </div>
//     ),
//     {
//       autoClose: false,
//       closeOnClick: false,
//       pauseOnHover: true,
//       style: {
//         background: "#1e1e1e",
//         borderRadius: "12px",
//         padding: "16px",
//         width: "360px",
//       },
//     }
//   );
// };


//   const handleEdit = (id) => {
//     const item = todos.find((item) => item.id === id);
//     setEditingId(id);
//     setEditedText(item.todo);
//   };

//   const handleAdd = async (todoname) => {
//     if (!todoname.trim()) return;
//     let exists = todos.some(item => item.todo.toLowerCase() === todoname.toLowerCase());
//     if (exists) return;

//     if (isSignedIn && user?.id) {
//       try {
//         const res = await fetch("/api/todo", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ todo: todoname })
//         });

//         const data = await res.json();
//         if (!res.ok) {
//           console.error("Error adding todo:", data);
//           toast.error(data.error || "Error adding task");
//           return;
//         }

//         await fetchTodos();
//       } catch (err) {
//         console.error("Add error:", err);
//         toast.error("Add failed");
//       }
//     } else {
//       setTodos([...todos, { id: uuidv4(), todo: todoname, isComplete: false, isBookmarked: false }]);
//     }

//     setTodo("");
//   };

//   const handleSaveEdit = async (id) => {
//     const trimmedText = editedText.trim();
//     if (!trimmedText) return;

//     const isDuplicate = todos.some((item) =>
//       item.id !== id && item.todo.toLowerCase() === trimmedText.toLowerCase()
//     );
//     if (isDuplicate) return;

//     if (isSignedIn) {
//       await fetch(`/api/todo/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ todo: trimmedText }),
//       });
//       await fetchTodos();
//     } else {
//       setTodos(todos.map(item =>
//         item.id === id ? { ...item, todo: trimmedText } : item
//       ));
//     }

//     setEditingId(null);
//   };

//   const handleDelete = async (id) => {
//     try {
//       if (isSignedIn) {
//         const res = await fetch(`/api/todo/${id}`, { method: "DELETE" });
//         const result = await res.json();
//         if (!res.ok) {
//           console.error("Delete error:", result);
//           toast.error(result.error || "Delete failed");
//           return;
//         }
//         await fetchTodos();
//       } else {
//         setTodos(todos.filter((item) => item.id !== id));
//       }
//     } catch (err) {
//       console.error("Delete failed:", err);
//       toast.error("Delete failed");
//     }
//   };

//   const handleCheckbox = async (id) => {
//     const updatedTodos = todos.map(item =>
//       item.id === id ? { ...item, isComplete: !item.isComplete } : item
//     );
//     setTodos(updatedTodos);

//     if (isSignedIn) {
//       const toggledItem = updatedTodos.find(item => item.id === id);
//       await fetch(`/api/todo/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ isComplete: toggledItem.isComplete }),
//       });
//       await fetchTodos();
//     }
//   };

//   const handleBookmark = async (id) => {
//     const updatedTodos = todos.map(item =>
//       item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
//     );
//     setTodos(updatedTodos);

//     if (isSignedIn) {
//       const toggledItem = updatedTodos.find(item => item.id === id);
//       await fetch(`/api/todo/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ isBookmarked: toggledItem.isBookmarked }),
//       });
//       await fetchTodos();
//     }
//   };

//   const filteredTodos = todos.filter(todo => {
//     if (filter === "All") return true;
//     if (filter === "To-Do") return !todo.isComplete;
//     if (filter === "Completed") return todo.isComplete;
//     if (filter === "Bookmarked") return todo.isBookmarked;
//   });

//   return (
//     <>
//       <CopilotPopup
//         instructions="You are a smart AI that helps manage tasks in a to-do list..."
//         chatTitle="Todo Assistant"
//         defaultOpen={false}
//         clickOutsideToClose={true}
//         maxSuggestions={6}
//         placeholder="How can I help with your tasks?"
//         labels={{ title: "Task Copilot", initial: "Ask me to update your tasks!" }}
//         style={{
//           width: "320px",
//           height: "400px",
//           fontSize: "14px",
//           bottom: "1.5rem",
//           right: "1.5rem",
//           borderRadius: "1rem",
//           zIndex: 1000,
//         }}
//       />
//       <ToastContainer />
//       <div className="relative container mx-auto flex flex-col justify-center items-center gap-7">

//         <div className="w-[850px] flex justify-center items-center gap-6">
//           <motion.input
//             onChange={(e) => setTodo(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleAdd(todo)}
//             value={todo}
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 500, damping: 20 }}
//             className="w-[700px] mt-14 p-4 rounded-full bg-white/40"
//             type="text"
//             placeholder="Enter the task you want to add"
//           />
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
//           >
//             <Button onClick={() => handleAdd(todo)} className="flex justify-start w-[100px] mt-14 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white transition-all">
//               <Image width={20} height={20} src={"/plus-button.svg"} alt="plus" />
//               Save
//             </Button>
//           </motion.div>
//         </div>

//         {!isSignedIn && <> <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
//           className="pr-8 text-sm italic text-white/70 tracking-wide font-light text-center"
//         >
//           Sign in to access your tasks, favorites, and a smoother workflow!
//         </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
//             className="flex w-[850px] justify-end gap-3 mt-2"
//           >
//             {["All", "To-Do", "Completed", "Bookmarked"].map((type) => (
//               <Button
//                 key={type}
//                 onClick={() => setFilter(type)}
//                 className={`px-5 py-2 rounded-full transition-all ${filter === type
//                   ? "bg-indigo-600 text-white"
//                   : "bg-white/20 text-white hover:bg-indigo-500 hover:text-white"
//                   }`}
//               >
//                 {type}
//               </Button>
//             ))}
//           </motion.div>

//           <AnimatePresence>

//             {loading ? (
//               Array(4).fill(0).map((_, i) => (
//                 <Skeleton key={i} className="w-[850px] h-20 rounded-xl bg-white/10" />
//               ))
//             ) : filteredTodos.length==0? (

//                 <div>
//               <img src="empty.svg" alt="" />
//               <div className="text-center">Empty...</div>
//               </div>

//             ):(filteredTodos.map((item) => (
//                 <motion.div
//                   key={item.id}
//                   layout // optional: enables smooth position transitions
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, x: 100, scale: 0.9 }}
//                   // transition={{
//                   //   opacity: { duration: 0.2 },
//                   //   x: { type: "spring", stiffness: 120, damping: 14 },
//                   //   scale: { duration: 0.15 }
//                   // }}
//                   transition={{
//                     duration: 0.30,
//                     ease: "easeInOut"
//                   }}
//                   className="w-[850px] bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-md p-6 flex items-center justify-between"
//                 >
//                   <div className="flex items-center gap-4">
//                     <input onClick={() => handleCheckbox(item.id)} type="checkbox" checked={item.isComplete} className="accent-indigo-500 w-5 h-5" />
//                     {editingId === item.id ? (
//                       <div className="flex items-center gap-2">
//                         <input
//                           autoFocus
//                           value={editedText}
//                           onChange={(e) => setEditedText(e.target.value)}
//                           onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(item.id)}
//                           className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white w-[400px] focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                         />
//                         <button
//                           onClick={() => handleSaveEdit(item.id)}
//                           className="w-9 h-9 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full transition-all"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.707-4.707a1 1 0 011.414-1.414L8.414 12.586l7.879-7.879a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                         </button>
//                       </div>
//                     ) : (
//                       <span className={`${item.isComplete ? "line-through" : ""} text-lg font-medium`}>
//                         {item.todo}
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <button onClick={() => handleBookmark(item.id)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-yellow-100/10 text-white hover:text-yellow-500 transition-all">
//                       {!item.isBookmarked ? (
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-white hover:text-yellow-400 transition-colors">
//                           <path d="M19 21l-7-5.5L5 21V5a2 2 0 012-2h10a2 2 0 012 2z" />
//                         </svg>
//                       ) : (
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="white" className="w-6 h-6 text-yellow-300 transition-all drop-shadow-md">
//                           <path d="M19 21l-7-5.5L5 21V5a2 2 0 012-2h10a2 2 0 012 2z" />
//                         </svg>
//                       )}
//                     </button>
//                     <button onClick={() => handleEdit(item.id)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-blue-100/10 text-blue-500 hover:text-blue-800 transition-all hover:scale-110 hover:shadow-md transition-transform">
//                       <Image width={18} height={18} src="/edit.svg" alt="edit" />
//                     </button>
//                     <button onClick={() => handleDelete(item.id)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-100/10 text-red-500 hover:text-red-700 transition-all hover:scale-110 hover:shadow-md transition-transform">
//                       <Image width={18} height={18} src="/delete.svg" alt="delete" />
//                     </button>
//                   </div>
//                 </motion.div>
//               ))
//             )}
//           </AnimatePresence>
//         </>
//         }

//         {isSignedIn && <>
//           <div className="mt-3 mb-2 overall w-[850px] flex items-center">
//             <div className="w-[850px] flex justify-start">


//               <a   target="_blank" rel="noopener noreferrer" href={"https://wa.me/14155238886?text=join%20newspaper-duck"} >
//               <Button onClick={handleWhatsAppSetup}  className={` bg-indigo-500 hover:bg-indigo-600 rounded-full text-white transition-all cursor-pointer`}>Set Up Whatsapp Reminders</Button>
//               </a>



//             </div>

//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
//               className="flex w-[850px] justify-end gap-3 "
//             >
//               {["All", "To-Do", "Completed", "Bookmarked"].map((type) => (
//                 <Button
//                   key={type}
//                   onClick={() => setFilter(type)}
//                   className={`px-5 py-2 rounded-full transition-all ${filter === type
//                     ? "bg-indigo-600 text-white"
//                     : "bg-white/20 text-white hover:bg-indigo-500 hover:text-white"
//                     }`}
//                 >
//                   {type}
//                 </Button>
//               ))}
//             </motion.div>

//           </div>

//           <AnimatePresence>

//             {loading ? (
//               Array(4).fill(0).map((_, i) => (
//                 <Skeleton key={i} className="w-[850px] h-20 rounded-xl bg-white/10" />
//               ))
//             ) : filteredTodos.length==0?(

//               <div>
//               <img src="empty.svg" alt="" />
//               <div className="text-center">Empty...</div>
//               </div>


//              ):(filteredTodos.map((item) => (
//                 <motion.div
//                   key={item.id}
//                   layout // optional: enables smooth position transitions
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, x: 100, scale: 0.9 }}
//                   // transition={{
//                   //   opacity: { duration: 0.2 },
//                   //   x: { type: "spring", stiffness: 120, damping: 14 },
//                   //   scale: { duration: 0.15 }
//                   // }}
//                   transition={{
//                     duration: 0.30,
//                     ease: "easeInOut"
//                   }}
//                   className="w-[850px] bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-md p-6 flex items-center justify-between"
//                 >
//                   <div className="flex items-center gap-4">
//                     <input onClick={() => handleCheckbox(item.id)} type="checkbox" checked={item.isComplete} className="accent-indigo-500 w-5 h-5" />
//                     {editingId === item.id ? (
//                       <div className="flex items-center gap-2">
//                         <input
//                           autoFocus
//                           value={editedText}
//                           onChange={(e) => setEditedText(e.target.value)}
//                           onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(item.id)}
//                           className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white w-[400px] focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                         />
//                         <button
//                           onClick={() => handleSaveEdit(item.id)}
//                           className="w-9 h-9 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full transition-all"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.707-4.707a1 1 0 011.414-1.414L8.414 12.586l7.879-7.879a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                         </button>
//                       </div>
//                     ) : (
//                       <span className={`${item.isComplete ? "line-through" : ""} text-lg font-medium`}>
//                         {item.todo}
//                       </span>
//                     )}
//                   </div>

//                   <div className="flex flex-col ">

//                     <div className="mb-4 flex justify-end items-center gap-3">
//                       <button onClick={() => handleBookmark(item.id)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-yellow-100/10 text-white hover:text-yellow-500 transition-all">
//                         {!item.isBookmarked ? (
//                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-white hover:text-yellow-400 transition-colors">
//                             <path d="M19 21l-7-5.5L5 21V5a2 2 0 012-2h10a2 2 0 012 2z" />
//                           </svg>
//                         ) : (
//                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="white" className="w-6 h-6 text-yellow-300 transition-all drop-shadow-md">
//                             <path d="M19 21l-7-5.5L5 21V5a2 2 0 012-2h10a2 2 0 012 2z" />
//                           </svg>
//                         )}
//                       </button>
//                       <button onClick={() => handleEdit(item.id)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-blue-100/10 text-blue-500 hover:text-blue-800 transition-all hover:scale-110 hover:shadow-md transition-transform">
//                         <Image width={18} height={18} src="/edit.svg" alt="edit" />
//                       </button>
//                       <button onClick={() => handleDelete(item.id)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-100/10 text-red-500 hover:text-red-700 transition-all hover:scale-110 hover:shadow-md transition-transform">
//                         <Image width={18} height={18} src="/delete.svg" alt="delete" />
//                       </button>
//                     </div>

//                     <div className="flex flex-col gap-1">
//   <div className="flex items-end gap-3">
//     <Calendar24 ref={(calendarRefs.current[item.id] ??= React.createRef())} />
//     <Button
//       className="h-10 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-sm"
//       onClick={async () => {
//        const reminder = calendarRefs.current[item.id]?.current?.getReminderDate();
// if (!reminder) return toast.error("Select date and time");

// // ✅ Check if the selected reminder is in the future
// const now = new Date();
// if (new Date(reminder) <= now) {
//   return toast.error("Reminder must be set to a future date and time");
// }

//         const res = await fetch(`/api/todo/${item.id}`, {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ reminder }),
//         });

//         if (!res.ok) {
//           toast.error("Failed to set reminder");
//         } else {
//           toast.success("Reminder set!");
//           fetchTodos();
//         }
//       }}
//     >
//       Set
//     </Button>
//   </div>

//  { console.log(`item reminder is: ${item.reminder}`)}

//  {item.reminder && (
//     <p className="text-sm text-white/70 mt-1 px-1 italic">
//       Reminder set for:{" "}
//       {new Date(item.reminder).toLocaleString("en-IN", {
//         dateStyle: "medium",
//         timeStyle: "short",
//       })}
//     </p>
//   )}

// </div>


//                   </div>






//                 </motion.div>
//               ))
//             )}
//           </AnimatePresence>


//         </>}

//       </div>
//     </>
//   );
// }

"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { CopilotKit, useCopilotAction } from "@copilotkit/react-core";
import { CopilotPopup, useCopilotChatSuggestions } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { useUser } from "@clerk/nextjs";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Calendar24 } from "@/components/ui/dateTime";
import React from "react";
import * as chrono from "chrono-node";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const { user, isSignedIn } = useUser();
  const calendarRefs = useRef({});
  const [showConfirmation, setShowConfirmation] = useState(false);


  const fetchTodos = async () => {
    NProgress.start();
    setLoading(true);
    if (isSignedIn && user?.id) {
      const res = await fetch(`/api/todo?userId=${user.id}`);
      const data = await res.json();
      setTodos(data);
    } else {
      const stored = localStorage.getItem("todos");
      if (stored) {
        setTodos(JSON.parse(stored));
      } else {
        setTodos([]);
      }
    }
    setLoading(false);
    NProgress.done();
  };

  useEffect(() => {
    const checkWhatsAppStatus = async () => {
      if (!isSignedIn || !user) return;

      try {
        const res = await fetch("/api/user/me");
        const data = await res.json();

        const whatsappJoined = data?.whatsappJoined;
        const joinedAt = data?.whatsappJoinedAt;
        const hasJoined = !!joinedAt;

        const expired = hasJoined && !whatsappJoined;

        if (expired) {
          toast.warn(
            ({ closeToast }) => (
              <div className="text-white">
                <p className="font-semibold mb-1">⏳ WhatsApp Setup Expired</p>
                <p className="text-sm mb-3">
                  Click below to rejoin and continue receiving reminders.
                </p>
                <button
                  onClick={() => {
                    handleWhatsAppSetup();
                    closeToast();
                    window.open(
                      "https://wa.me/14155238886?text=join%20newspaper-duck",
                      "_blank"
                    );
                  }}
                  className="w-full text-sm px-4 py-2 rounded bg-green-600 hover:bg-green-700 transition-all"
                >
                  🔁 Rejoin Now
                </button>
              </div>
            ),
            {
              position: "top-center",
              autoClose: false,
              closeOnClick: false,
              pauseOnHover: true,
              style: {
                background: "#1e1e1e",
                borderRadius: "12px",
                padding: "16px",
                width: "360px",
              },
            }
          );
        }
      } catch (err) {
        console.error("Failed to fetch WhatsApp status:", err);
      }
    };

    checkWhatsAppStatus();
  }, [isSignedIn, user]);

  useEffect(() => {
    fetchTodos();
  }, [isSignedIn, user]);

  useEffect(() => {
    if (!isSignedIn) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isSignedIn]);

  useCopilotAction({
    name: "addTodo",
    description: "Add a new todo item",
    parameters: [
      { name: "task", type: "string", description: "The name of the task to add" },
    ],
    handler: async ({ task }) => {
      handleAdd(task);
    },
  });

  useCopilotAction({
    name: "deleteTodo",
    description: "Delete a todo item",
    parameters: [
      { name: "task", type: "string", description: "The name of the task to delete" },
    ],
    handler: async ({ task }) => {
      const match = todos.find(item => item.todo.toLowerCase() === task.toLowerCase());
      if (match) handleDelete(match.id);
    },
  });

  useCopilotAction({
    name: "editTodo",
    description: "Edit a todo item",
    parameters: [
      { name: "from", type: "string", description: "Current name of the task" },
      { name: "to", type: "string", description: "New name of the task" },
    ],
    handler: async ({ from, to }) => {
      const match = todos.find(item => item.todo.toLowerCase() === from.toLowerCase());
      if (match) {
        setTodos(todos.map(item =>
          item.id === match.id ? { ...item, todo: to } : item
        ));
      }
    },
  });

  useCopilotAction({
    name: "bookmarkTodo",
    description: "Toggle bookmark for a task",
    parameters: [
      { name: "task", type: "string", description: "The name of the task to bookmark" },
    ],
    handler: async ({ task }) => {
      const match = todos.find(item => item.todo.toLowerCase() === task.toLowerCase());
      if (match) handleBookmark(match.id);
    },
  });

  useCopilotAction({
    name: "setReminder",
    description: "Set a reminder for a to-do item",
    parameters: [
      { name: "task", type: "string", description: "The name of the task" },
      { name: "reminderTime", type: "string", description: "When to set the reminder (e.g., 'in 2 minutes', 'tomorrow at 9am')" },
    ],
    handler: async ({ task, reminderTime }) => {
      const match = todos.find(
        (item) => item.todo.toLowerCase() === task.toLowerCase()
      );

      if (!match) {
        toast.error(`Task "${task}" not found`);
        return;
      }

      const parsedDate = chrono.parseDate(reminderTime);

      if (!parsedDate || parsedDate <= new Date()) {
        toast.error("Please provide a future time for the reminder");
        return;
      }

      const res = await fetch(`/api/todo/${match.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reminder: parsedDate }),
      });

      if (res.ok) {
        toast.success(`Reminder set for "${task}" at ${parsedDate.toLocaleString("en-IN")}`);
        fetchTodos();
      } else {
        toast.error("Failed to set reminder");
      }
    },
  });

  useCopilotAction({
    name: "markTodoComplete",
    description: "Mark a todo item as completed or not completed",
    parameters: [
      {
        name: "task",
        type: "string",
        description: "The name of the task to mark as completed/incomplete",
      },
      {
        name: "completed",
        type: "boolean",
        description: "Whether the task is completed or not",
      },
    ],
    handler: async ({ task, completed }) => {
      const match = todos.find(
        (item) => item.todo.toLowerCase() === task.toLowerCase()
      );
      if (!match) return toast.error("Task not found");

      setTodos((prev) =>
        prev.map((item) =>
          item.id === match.id ? { ...item, isComplete: completed } : item
        )
      );

      if (isSignedIn) {
        const res = await fetch(`/api/todo/${match.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isComplete: completed }),
        });

        if (!res.ok) {
          toast.error("Failed to update completion status");
        } else {
          fetchTodos();
        }
      }
    },
  });

  useCopilotChatSuggestions([
    { name: "Add Task", suggestion: "Add task 'Read a book'" },
    { name: "Edit Task", suggestion: "Edit 'Read a book' to 'Read two books'" },
    { name: "Delete Task", suggestion: "Delete task 'Read two books'" },
    { name: "Bookmark Task", suggestion: "Bookmark task 'Read a book'" },
    { name: "Mark Complete", suggestion: "Mark task 'Read a book' as completed" },
    { name: "Set Reminder", suggestion: "Set a reminder for 'Read a book' at 7 PM today" }
  ]);

  const handleConfirmYes = async () => {
    const res = await fetch("/api/user/whatsapp-joined", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ joined: true }),
    });

    if (res.ok) {
      toast.success("✅ WhatsApp reminders enabled!", {
        position: "top-center",
      });
      setShowConfirmation(false);
    } else {
      toast.error("❌ Failed to enable WhatsApp reminders.", {
        position: "top-center",
      });
    }
  };

  const handleWhatsAppSetup = () => {
    toast(
      ({ closeToast }) => (
        <div className="text-white">
          <p className="font-bold mb-1">✅ WhatsApp Setup Almost Done</p>
          <p className="text-sm mb-2">
            Please send the message in your Twilio WhatsApp chat to enable reminders.
          </p>
          <p className="text-xs text-yellow-400 bg-yellow-900 p-2 rounded mb-2">
            ⚠️ Subscription expires in 24 hours unless confirmed — reminders will stop after that.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={async () => {
                await handleConfirmYes();
                closeToast();
              }}
              className="text-sm px-3 py-1 rounded bg-green-600 hover:bg-green-700"
            >
              ✅ Yes, I’ve Done It
            </button>
            <button
              onClick={closeToast}
              className="text-sm px-3 py-1 rounded bg-red-500 hover:bg-red-600"
            >
              ❌ Not Yet
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        pauseOnHover: true,
        style: {
          background: "#1e1e1e",
          borderRadius: "12px",
          padding: "16px",
          width: "360px",
        },
      }
    );
  };

  const handleEdit = (id) => {
    const item = todos.find((item) => item.id === id);
    setEditingId(id);
    setEditedText(item.todo);
  };

  const handleAdd = async (todoname) => {
    if (!todoname.trim()) return;
    let exists = todos.some(item => item.todo.toLowerCase() === todoname.toLowerCase());
    if (exists) return;

    if (isSignedIn && user?.id) {
      try {
        const res = await fetch("/api/todo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ todo: todoname })
        });

        const data = await res.json();
        if (!res.ok) {
          console.error("Error adding todo:", data);
          toast.error(data.error || "Error adding task");
          return;
        }

        await fetchTodos();
      } catch (err) {
        console.error("Add error:", err);
        toast.error("Add failed");
      }
    } else {
      setTodos([...todos, { id: uuidv4(), todo: todoname, isComplete: false, isBookmarked: false }]);
    }

    setTodo("");
  };

  const handleSaveEdit = async (id) => {
    const trimmedText = editedText.trim();
    if (!trimmedText) return;

    const isDuplicate = todos.some((item) =>
      item.id !== id && item.todo.toLowerCase() === trimmedText.toLowerCase()
    );
    if (isDuplicate) return;

    if (isSignedIn) {
      await fetch(`/api/todo/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: trimmedText }),
      });
      await fetchTodos();
    } else {
      setTodos(todos.map(item =>
        item.id === id ? { ...item, todo: trimmedText } : item
      ));
    }

    setEditingId(null);
  };

  const handleDelete = async (id) => {
    try {
      if (isSignedIn) {
        const res = await fetch(`/api/todo/${id}`, { method: "DELETE" });
        const result = await res.json();
        if (!res.ok) {
          console.error("Delete error:", result);
          toast.error(result.error || "Delete failed");
          return;
        }
        await fetchTodos();
      } else {
        setTodos(todos.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Delete failed");
    }
  };

  const handleCheckbox = async (id) => {
    const updatedTodos = todos.map(item =>
      item.id === id ? { ...item, isComplete: !item.isComplete } : item
    );
    setTodos(updatedTodos);

    if (isSignedIn) {
      const toggledItem = updatedTodos.find(item => item.id === id);
      await fetch(`/api/todo/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isComplete: toggledItem.isComplete }),
      });
      await fetchTodos();
    }
  };

  const handleBookmark = async (id) => {
    const updatedTodos = todos.map(item =>
      item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
    );
    setTodos(updatedTodos);

    if (isSignedIn) {
      const toggledItem = updatedTodos.find(item => item.id === id);
      await fetch(`/api/todo/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBookmarked: toggledItem.isBookmarked }),
      });
      await fetchTodos();
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "All") return true;
    if (filter === "To-Do") return !todo.isComplete;
    if (filter === "Completed") return todo.isComplete;
    if (filter === "Bookmarked") return todo.isBookmarked;
  });

  return (
    <>
      <CopilotPopup
        instructions="You are a smart AI that helps manage tasks in a to-do list..."
        chatTitle="Todo Assistant"
        defaultOpen={false}
        clickOutsideToClose={true}
        maxSuggestions={6}
        placeholder="How can I help with your tasks?"
        labels={{ title: "Task Copilot", initial: "Ask me to update your tasks!" }}
        style={{
          width: "90vw",         // 👈 Responsive width
          maxWidth: "320px",     // 👈 Prevent too wide on desktop
          height: "60vh",        // 👈 Responsive height
          maxHeight: "450px",    // 👈 Limit max height
          fontSize: "14px",
          bottom: "1rem",
          right: "1rem",
          borderRadius: "1rem",
          zIndex: 1000,
          overflow: "hidden",    // 👈 Ensure scrollbar doesn't break layout
        }}
      />
      <ToastContainer />
      <div className="relative container mx-auto flex flex-col justify-center items-center gap-7 px-4">
        <div className="w-full max-w-[850px] flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-14">
          <motion.input
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd(todo)}
            value={todo}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="w-full p-4 rounded-full bg-white/40 placeholder-gray-200"
            type="text"
            placeholder="What's on your mind today?"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            className="w-full sm:w-auto"
          >
            <Button onClick={() => handleAdd(todo)} className="flex justify-center w-full sm:w-[100px] bg-indigo-500 hover:bg-indigo-600 rounded-full text-white transition-all">
              <Image width={20} height={20} src={"/plus-button.svg"} alt="plus" />
              Save
            </Button>
          </motion.div>
        </div>

        {!isSignedIn && <> <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
          className="text-sm italic text-white/70 tracking-wide font-light text-center"
        >
          Sign in to access your tasks, favorites, and a smoother workflow!
        </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
            className="w-full max-w-[850px] flex flex-wrap justify-center sm:justify-end gap-3 mt-2"
          >
            {["All", "To-Do", "Completed", "Bookmarked"].map((type) => (
              <Button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-5 py-2 rounded-full transition-all ${filter === type
                  ? "bg-indigo-600 text-white"
                  : "bg-white/20 text-white hover:bg-indigo-500 hover:text-white"
                  }`}
              >
                {type}
              </Button>
            ))}
          </motion.div>

          <AnimatePresence>
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <Skeleton key={i} className="w-full max-w-[850px] h-20 rounded-xl bg-white/10" />
              ))
            ) : filteredTodos.length === 0 ? (
              <div className='flex flex-col items-center justify-center mt-10'>
                <img src="empty.svg" alt="No tasks" className='w-40 h-40' />
                <p className="text-center text-white/60 mt-4">No tasks here. Add one to get started!</p>
              </div>
            ) : (filteredTodos.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100, scale: 0.9 }}
                transition={{
                  duration: 0.30,
                  ease: "easeInOut"
                }}
                className="w-full max-w-[850px] bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-md p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full">
                  <input onClick={() => handleCheckbox(item.id)} type="checkbox" checked={item.isComplete} className="accent-indigo-500 w-5 h-5 flex-shrink-0" />
                  {editingId === item.id ? (
                    <div className="flex items-center gap-2 w-full">
                      <input
                        autoFocus
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(item.id)}
                        className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                      <button
                        onClick={() => handleSaveEdit(item.id)}
                        className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.707-4.707a1 1 0 011.414-1.414L8.414 12.586l7.879-7.879a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <span className={`${item.isComplete ? "line-through text-white/50" : "text-white"} text-lg font-medium break-all`}>
                      {item.todo}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 self-end md:self-center">
                  <button onClick={() => handleBookmark(item.id)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-yellow-100/10 text-white hover:text-yellow-500 transition-all">
                    {!item.isBookmarked ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-white hover:text-yellow-400 transition-colors">
                        <path d="M19 21l-7-5.5L5 21V5a2 2 0 012-2h10a2 2 0 012 2z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="white" className="w-6 h-6 text-yellow-300 transition-all drop-shadow-md">
                        <path d="M19 21l-7-5.5L5 21V5a2 2 0 012-2h10a2 2 0 012 2z" />
                      </svg>
                    )}
                  </button>
                  <button onClick={() => handleEdit(item.id)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-blue-100/10 text-blue-500 hover:text-blue-800 transition-all hover:scale-110 hover:shadow-md transition-transform">
                    <Image width={18} height={18} src="/edit.svg" alt="edit" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-100/10 text-red-500 hover:text-red-700 transition-all hover:scale-110 hover:shadow-md transition-transform">
                    <Image width={18} height={18} src="/delete.svg" alt="delete" />
                  </button>
                </div>
              </motion.div>
            ))
            )}
          </AnimatePresence>
        </>}

        {isSignedIn && <>
          <div className="mt-3 mb-2 w-full max-w-[850px] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-auto">
              <a target="_blank" rel="noopener noreferrer" href={"https://wa.me/14155238886?text=join%20newspaper-duck"} >
                <Button onClick={handleWhatsAppSetup} className={`w-full bg-indigo-500 hover:bg-indigo-600 rounded-full text-white transition-all cursor-pointer`}>Set Up Whatsapp Reminders</Button>
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
              className="flex flex-wrap justify-center md:justify-end gap-3"
            >
              {["All", "To-Do", "Completed", "Bookmarked"].map((type) => (
                <Button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-5 py-2 rounded-full transition-all ${filter === type
                    ? "bg-indigo-600 text-white"
                    : "bg-white/20 text-white hover:bg-indigo-500 hover:text-white"
                    }`}
                >
                  {type}
                </Button>
              ))}
            </motion.div>
          </div>

          <AnimatePresence>
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <Skeleton key={i} className="w-full max-w-[850px] h-28 rounded-xl bg-white/10" />
              ))
            ) : filteredTodos.length === 0 ? (
              <div className='flex flex-col items-center justify-center mt-10'>
                <img src="empty.svg" alt="No tasks" className='w-40 h-40' />
                <p className="text-center text-white/60 mt-4">No tasks here. Add one to get started!</p>
              </div>
            ) : (filteredTodos.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100, scale: 0.9 }}
                transition={{
                  duration: 0.30,
                  ease: "easeInOut"
                }}
                className="w-full max-w-[850px] bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-md p-4 flex flex-col justify-between gap-4"
              >
                <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full">
                    <input onClick={() => handleCheckbox(item.id)} type="checkbox" checked={item.isComplete} className="accent-indigo-500 w-5 h-5 flex-shrink-0" />
                    {editingId === item.id ? (
                      <div className="flex items-center gap-2 w-full">
                        <input
                          autoFocus
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(item.id)}
                          className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <button
                          onClick={() => handleSaveEdit(item.id)}
                          className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.707-4.707a1 1 0 011.414-1.414L8.414 12.586l7.879-7.879a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <span className={`${item.isComplete ? "line-through text-white/50" : "text-white"} text-lg font-medium break-all`}>
                        {item.todo}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-end gap-3 self-end lg:self-center">
                    <button onClick={() => handleBookmark(item.id)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-yellow-100/10 text-white hover:text-yellow-500 transition-all">
                      {!item.isBookmarked ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-white hover:text-yellow-400 transition-colors">
                          <path d="M19 21l-7-5.5L5 21V5a2 2 0 012-2h10a2 2 0 012 2z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="white" className="w-6 h-6 text-yellow-300 transition-all drop-shadow-md">
                          <path d="M19 21l-7-5.5L5 21V5a2 2 0 012-2h10a2 2 0 012 2z" />
                        </svg>
                      )}
                    </button>
                    <button onClick={() => handleEdit(item.id)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-blue-100/10 text-blue-500 hover:text-blue-800 transition-all hover:scale-110 hover:shadow-md transition-transform">
                      <Image width={18} height={18} src="/edit.svg" alt="edit" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-100/10 text-red-500 hover:text-red-700 transition-all hover:scale-110 hover:shadow-md transition-transform">
                      <Image width={18} height={18} src="/delete.svg" alt="delete" />
                    </button>
                  </div>
                </div>

                <div className="w-full border-t border-white/10 pt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-end gap-3">
                      <Calendar24 ref={(calendarRefs.current[item.id] ??= React.createRef())} />
                      <Button
                        className="h-10 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-sm"
                        onClick={async () => {
                          const reminder = calendarRefs.current[item.id]?.current?.getReminderDate();
                          if (!reminder) return toast.error("Select date and time");

                          const now = new Date();
                          if (new Date(reminder) <= now) {
                            return toast.error("Reminder must be set to a future date and time");
                          }

                          const res = await fetch(`/api/todo/${item.id}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ reminder }),
                          });

                          if (!res.ok) {
                            toast.error("Failed to set reminder");
                          } else {
                            toast.success("Reminder set!");
                            fetchTodos();
                          }
                        }}
                      >
                        Set
                      </Button>
                    </div>
                  </div>
                  {item.reminder && (
                    <p className="text-sm text-white/70 mt-1 px-1 italic text-left sm:text-right">
                      Reminder:{" "}
                      {new Date(item.reminder).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  )}
                </div>
              </motion.div>
            ))
            )}
          </AnimatePresence>
        </>}
      </div>
    </>
  );
}



