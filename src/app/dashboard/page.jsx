import React from "react";
import ContentSection from "../components/contentSection/contentsection";
import HeroSection from "../components/heroSection/herosection";
import DashboardLayout from './layout'

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="max-h-screen">
        <HeroSection />
        <ContentSection />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;