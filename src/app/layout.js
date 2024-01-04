"use client";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "./components/header/page";
import Footer from "./components/footer/page";
import { useEffect, useState } from "react";
import NextAuthProvider from "../providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params: { session, ...params },
}) {
  // const [isUrl, setIsUrl] = useState(false);

  // useEffect(() => {
  //   // Get the current URL
  //   const currentUrl = window?.location?.href;

  //   if (currentUrl) {
  //     // Split the URL by '/' and get the last segment
  //     const urlSegments = currentUrl.split("/");
  //     const lastSegment = urlSegments[urlSegments.length - 1];

  //     console.log(lastSegment === "login", "lastSegment");
  //     setIsUrl(lastSegment === "login");


  //   }
  // }, []);

  

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="max-h-screen">{children}</div>
          {/* <Footer /> */}
        </NextAuthProvider>
      </body>
    </html>
  );
}
