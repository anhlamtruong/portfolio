import React, { useState, FC, ReactNode } from "react";
import { cn } from "@/lib/utils";
interface HoverAnimationWrapperProps {
  children: ReactNode;
  defaultStyle: React.CSSProperties;
  hoverStyle: React.CSSProperties;
  className?: string;
}

export const HoverAnimationWrapper: FC<HoverAnimationWrapperProps> = ({
  children,
  defaultStyle,
  hoverStyle,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const appliedStyle = isHovered ? hoverStyle : defaultStyle;

  return (
    <div
      style={appliedStyle}
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};
