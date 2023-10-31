"use client";

import { useStyles } from "@/hooks/useStyles";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";
const Sidebar = () => {
  const styles = useStyles();
  return (
    <div
      style={styles.backgroundPrimary}
      className="h-full border-r flex flex-col overflow-auto shadow-sm"
    >
      <div className="p-6">
        <Logo></Logo>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes></SidebarRoutes>
      </div>
    </div>
  );
};

export default Sidebar;
