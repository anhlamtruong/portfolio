import { useLoading } from "@/contexts/app_loading/app_loading";
import React from "react";

const LoadingComponent: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center">
      {/* Loading spinner or message */}
      <p className="text-white">Loading...</p>
    </div>
  );
};

export default LoadingComponent;
