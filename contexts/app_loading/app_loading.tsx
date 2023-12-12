"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextProps {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps>({
  isLoading: true,
  setLoading: () => null,
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
