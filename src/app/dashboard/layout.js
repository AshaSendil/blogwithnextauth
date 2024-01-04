import React from "react";
import Header from "../components/header/page";
import NextAuthProvider from "../../providers";

const DashboardLayout = ({ children }) => {
  return (
    <NextAuthProvider>
      <div>
        
        <Header />
        {children}
      </div>
    </NextAuthProvider>
  );
};

export default DashboardLayout;
