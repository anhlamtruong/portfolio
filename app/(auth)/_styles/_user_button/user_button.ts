import { ThemeObjectsProps } from "@/contexts/user_page/ThemeContext";

export const userProfileContainerStyles = (theme: ThemeObjectsProps) => ({
  userProfileContainerStyles: {
    color: theme.textPrimary,
    backgroundColor: theme.backgroundPrimary,
  },
  userProfileContainerButtonStyles: {
    color: theme.backgroundPrimary,
    backgroundColor: theme.textPrimary,
  },
});
