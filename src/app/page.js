"use client";
import { useEffect, useState } from "react";
import HeroSection from "./components/heroSection/herosection";
import Dashboard from "./dashboard/page";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return <div>{isClient ? <Dashboard /> : <div>Home page 2</div>}</div>;
}
