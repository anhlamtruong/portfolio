import { ThemeObjectsProps } from "@/contexts/user_page/ThemeContext";

export const sidebarItemStyles = (theme: ThemeObjectsProps) => ({
  sidebarItem: {
    color: theme.textPrimary,
  },
  sidebarItemHover: {
    color: theme.backgroundPrimary,
    backgroundColor: theme.hoverBackground,
  },
  sidebarItemActive: {
    color: theme.textPrimary,
    backgroundColor: theme.backgroundSecondaryOpacity,
  },
  sidebarItemActiveHover: {
    color: theme.backgroundPrimary,
    backgroundColor: theme.hoverBackground,
  },
});
