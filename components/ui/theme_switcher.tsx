"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme, Theme } from "../../contexts/user_page/ThemeContext";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, themeColors } = useTheme();
  const { backgroundPrimary, textPrimary, hoverBorder, hoverBackground } =
    themeColors[theme];
  const [isOpen, setIsOpen] = useState(false);
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as Theme);
    setIsOpen(false);
  };
  const containerStyle = useMemo(() => {
    return {
      backgroundColor: backgroundPrimary,
      color: textPrimary,
      outline: "1px solid transparent",
      transition:
        "background-color 200ms ease, border-color 200ms ease, border-width 200ms ease",
    };
  }, [backgroundPrimary, textPrimary]);
  const handleMouseEnter = (
    event: React.MouseEvent<
      HTMLUListElement | HTMLLIElement | HTMLButtonElement
    >
  ) => {
    event.currentTarget.style.outlineColor = hoverBorder;
    event.currentTarget.style.backgroundColor = hoverBackground;
  };

  const handleMouseLeave = (
    event: React.MouseEvent<
      HTMLUListElement | HTMLLIElement | HTMLButtonElement
    >
  ) => {
    event.currentTarget.style.backgroundColor = backgroundPrimary;
    event.currentTarget.style.outlineColor = "transparent";
  };

  const dropdownVariants = {
    open: {
      opacity: 1,
      scaleY: 1,
      height: "auto",
      transition: {
        opacity: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        scaleY: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      },
    },
    closed: {
      opacity: 0,
      scaleY: 0,
      height: 0,
      transition: {
        opacity: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
        scaleY: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
      },
    },
  };

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="relative font-medium inline-block rounded  text-lg align-middle"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={containerStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`p-2 rounded  transition ease-in-out 
        focus:ring-2 focus:ring-offset-2 focus:outline-none`}
      >
        Theme Mode
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial="closed"
            animate="open"
            exit="closed"
            style={containerStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            variants={dropdownVariants}
            className={` origin-top absolute rounded z-10 mt-2  border shadow`}
          >
            <li
              style={containerStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`px-4 py-2 cursor-pointer  }`}
              onClick={() => handleThemeChange("light")}
            >
              Light
            </li>
            <li
              style={containerStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`px-4 py-2 cursor-pointer `}
              onClick={() => handleThemeChange("dark")}
            >
              Dark
            </li>
            <li
              style={containerStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`px-4 py-2 cursor-pointer `}
              onClick={() => handleThemeChange("ocean-blue")}
            >
              Ocean Blue
            </li>
            <li
              style={containerStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`px-4 py-2 cursor-pointer `}
              onClick={() => handleThemeChange("tokyo-night")}
            >
              Tokyo Night
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
