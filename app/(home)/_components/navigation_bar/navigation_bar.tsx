import React, { useState, useMemo } from "react";
import NavigationCard from "./navigation_card";
import withSmoothEffect from "@/components/animation/smooth_effect";
import { useStyles } from "@/hooks/useStyles";
import { HoverAnimationWrapper } from "@/components/animation/theme_hover_component_wrapper";

const NavigationSidebar: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const titles = ["Card 1", "Card 2", "Card 3", "Card 4", "Card 5", "Card 6"];

  const SmoothNavCard = useMemo(() => withSmoothEffect(NavigationCard), []);

  return (
    <div className="h-full items-center text-center content-center fixed right-0 top-32">
      {titles.map((title) => (
        <div
          className=" flex justify-center flex-col items-center self-center gap-10"
          key={title}
          onMouseEnter={() => setHoveredCard(title)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <SmoothNavCard
            title={title}
            isHovered={hoveredCard === title}
            isAnyCardHovered={hoveredCard !== null} // New prop indicating if any card is hovered
          />
        </div>
      ))}
    </div>
  );
};

export default NavigationSidebar;
