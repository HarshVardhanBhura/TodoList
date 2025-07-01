// import React from 'react'
// import Image from 'next/image'
// import { Button } from "@/components/ui/button"
// import Link from 'next/link'
// import {
//     ClerkProvider,
//     SignInButton,
//     SignUpButton,
//     SignedIn,
//     SignedOut,
//     UserButton,
// } from '@clerk/nextjs'


// const Navbar = () => {
//     return (
//         <>
//             <div className='flex min-w-screen justify-between items-center p-7  shadow-[0_8px_6px_-6px_rgba(148,163,184,0.15)] '>
//                 <Image width={100} height={100} src={`/td.gif`} alt='Todo image'></Image>
//                 {/* <Link href={"/login"}>
//           <Button className="mr-14 bg-indigo-500 hover:bg-indigo-600 text-white transition-all" >Sign Up</Button>
//           </Link> */}
//                 <header className="flex justify-end items-center p-4 gap-4 h-16">
//                     <SignedOut>
//                         <SignInButton>
//                             <button className="bg-indigo-500 hover:bg-indigo-600 text-white transition-all rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
//                                 Sign In
//                             </button>
//                         </SignInButton>

//                         <SignUpButton>
//                             <button className="bg-indigo-500 hover:bg-indigo-600 text-white transition-all rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
//                                 Sign Up
//                             </button>
//                         </SignUpButton>
//                     </SignedOut>
//                     <SignedIn>
//                         <UserButton />
//                     </SignedIn>
//                 </header>

//             </div>
//         </>
//     )
// }

// export default Navbar

// "use client";
// import React from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import {
//   ClerkProvider,
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// import { motion } from "framer-motion";

// const Navbar = () => {
//   return (
//     <motion.div
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ type: "spring", stiffness: 300, damping: 25 }}
//       className="flex min-w-screen justify-between items-center p-7 shadow-[0_8px_6px_-6px_rgba(148,163,184,0.15)]"
//     >
//       <Image width={100} height={100} src={`/td.gif`} alt="Todo image" />
//       <header className="flex justify-end items-center p-4 gap-4 h-16">
//         <SignedOut>
//           <SignInButton>
//             <button className="bg-indigo-500 hover:bg-indigo-600 text-white transition-all rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
//               Sign In
//             </button>
//           </SignInButton>
//           <SignUpButton>
//             <button className="bg-indigo-500 hover:bg-indigo-600 text-white transition-all rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
//               Sign Up
//             </button>
//           </SignUpButton>
//         </SignedOut>
//         <SignedIn>
//           <UserButton />
//         </SignedIn>
//       </header>
//     </motion.div>
//   );
// };

// export default Navbar;

//WITH RESPONSIVENESS
"use client";
import React from "react";
import Image from "next/image";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { motion } from "framer-motion";
import TypedTitle from "./TypedTiltle";

const Navbar = () => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="flex flex-wrap justify-between items-center px-4 py-5 sm:p-7 shadow-[0_8px_6px_-6px_rgba(148,163,184,0.15)]"
    >
      <div className="flex items-center mb-4 sm:mb-0">
        <Image className="ml-2" width={100} height={100} src={`/logo.gif`} alt="Todo image" />
        <TypedTitle/>
      </div>

      <header className="flex flex-wrap justify-end items-center gap-3 sm:gap-4">
        <SignedOut>
          <SignInButton>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white transition-all rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white transition-all rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </motion.div>
  );
};

export default Navbar;

