// pages/dashboard.js
"use client";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';  // Correct import for useRouter in App Router

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    // Simulate checking for authentication (you should replace this with real logic)
    const isAuthenticated = true; // Replace this with actual authentication check

    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login page if not authenticated
    }
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
    </div>
  );
};

export default Dashboard;
