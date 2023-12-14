import React from "react";
import { motion } from "framer-motion";
import { HoverAnimationWrapper } from "@/components/animation/theme_hover_component_wrapper";
import { useStyles } from "@/hooks/useStyles";

interface NavigationCardProps {
  title: string;
  isHovered: boolean;
  isAnyCardHovered: boolean; // New prop
}

const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  isHovered,
  isAnyCardHovered,
}) => {
  // Define the hover animation for the card
  const hoverAnimation = isHovered
    ? { scale: 1.1, y: -10, x: -16, opacity: 1 }
    : isAnyCardHovered
    ? { scale: 0.9, y: 10, x: 10, opacity: 0.7 }
    : { scale: 1, y: 0, opacity: 0.8 };
  const styles = useStyles();

  return (
    <motion.div
      style={isHovered ? styles.sidebarItemActive : styles.container}
      animate={hoverAnimation}
      transition={{ type: "spring", stiffness: 300 }}
      className=" pt-4 pb-4 pr-32 pl-32  m-2 mb-4 rounded-xl shadow-md duration-75 cursor-pointer"
    >
      {title}
    </motion.div>
  );
};

export default NavigationCard;
