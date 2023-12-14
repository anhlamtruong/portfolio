import { motion } from "framer-motion";
import React from "react";

const withSmoothEffect = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WithSmoothEffectComponent = (props: P) => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, stiffness: 300, type: "spring" }}
    >
      <Component {...props} />
    </motion.div>
  );

  // Setting the display name for the component
  const displayName = Component.displayName || Component.name || "Component";
  WithSmoothEffectComponent.displayName = `WithSmoothEffect(${displayName})`;

  return WithSmoothEffectComponent;
};

export default withSmoothEffect;
