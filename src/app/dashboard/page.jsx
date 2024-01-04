import React from "react";
import ContentSection from "../components/contentSection/contentsection";
import HeroSection from "../components/heroSection/herosection";
import DashboardLayout from './layout'
import BlogSection from "../blogsection/page"

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="max-h-screen">
        <HeroSection />
        <BlogSection/>
        <ContentSection />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;