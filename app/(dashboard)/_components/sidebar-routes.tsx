"use client";

import { Layout, Compass } from "lucide-react";
import SidebarItem from "./sidebar-item";
import ThemeSwitcher from "@/components/ui/theme_switcher";
import { useStyles } from "@/hooks/useStyles";
import { useMemo } from "react";
const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/browse",
  },
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
];

const SidebarRoutes = () => {
  const routes = guestRoutes;
  const styles = useStyles();
  return (
    <div style={styles.backgroundPrimary} className="flex flex-col w-full ">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
      <div>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default SidebarRoutes;
