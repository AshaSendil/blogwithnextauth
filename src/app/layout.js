"use client";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "./components/header/page";
import Footer from "./components/footer/page";
import { useEffect, useState } from "react";
import NextAuthProvider from "../providers";
import { ThemeSwitcher } from "./components/togglebutton/ThemeSwitcher";
import { ThemeProvider } from "./theme-provider";
import { Poppins } from "next/font/google";

const inter = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
  params: { session, ...params },
}) {
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeSwitcher />

          <NextAuthProvider>
            <div className="max-h-screen">{children}</div>
            {/* <Footer /> */}
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
