import React, { useState, FC, ReactNode } from "react";

interface HoverAnimationWrapperProps {
  children: ReactNode;
  defaultStyle: React.CSSProperties;
  hoverStyle: React.CSSProperties;
}

export const HoverAnimationWrapper: FC<HoverAnimationWrapperProps> = ({
  children,
  defaultStyle,
  hoverStyle,
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};
