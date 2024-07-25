"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface DrawerContextType {
  open: boolean;
  toggleDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <DrawerContext.Provider value={{ open, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

const useDrawer = (): DrawerContextType => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};

export { DrawerProvider, useDrawer };
