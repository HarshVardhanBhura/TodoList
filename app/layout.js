import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {ClerkProvider} from '@clerk/nextjs'
import { CopilotKit } from "@copilotkit/react-core";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"], 
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
     

  return (
    // <html lang="en">
    //   <body
    //     className={` ${geistSans.variable} ${geistMono.variable} antialiased`}
    //   >

    // <div className="text-white absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
    // <Navbar/>
    // {children}
    // </div>
    //   </body>
    // </html>
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
           <CopilotKit publicApiKey="ck_pub_329679f5b3866960c84a3e57b7b09173">
          <div className=" overflow-x-hidden overflow-y-auto text-white absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">

            <div className="sticky top-0 z-50 backdrop-blur-md ">
           <ToastContainer position="top-right" />
            <Navbar />
            </div>
            {children}
          </div>
          </CopilotKit>
        </body>
      </html>
    </ClerkProvider>
  );
}

{/* <div className="sticky top-0 z-50 backdrop-blur-md bg-neutral-950/80 border-b border-white/10"> can see if this looks better for */}