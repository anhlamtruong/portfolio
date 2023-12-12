import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface VideoBackgroundProps {
  children: React.ReactNode;
  path: string;
  errorText?: string;
}

const debounce = (
  func: (...args: any[]) => void,
  delay: number
): ((...args: any[]) => void) => {
  let inDebounce: NodeJS.Timeout | null;
  return (...args: any[]) => {
    clearTimeout(inDebounce as NodeJS.Timeout);
    inDebounce = setTimeout(() => func(...args), delay);
  };
};

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  children,
  path,
  errorText = "Your browser does not support the video tag.",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const MAX_MOUSE_SPEED = 200; // Maximum mouse speed for 100% (adjust based on testing)
  const MOUSE_THRESHOLD_PERCENTAGE = 20; // Mouse speed percentage to trigger speed increase
  const VIDEO_SPEED_INCREASE_PERCENTAGE = 150; // Video speed increase percentage

  const handleMouseMove = useCallback(() => {
    let lastMove = Date.now();

    return debounce(() => {
      const now = Date.now();
      const speed = Math.min(now - lastMove, MAX_MOUSE_SPEED);
      lastMove = now;

      setMouseSpeed(speed);
    }, 0); // Adjust debounce time as needed
  }, []);

  const resetMouseSpeed = useCallback(() => setMouseSpeed(0), []);

  useEffect(() => {
    const mouseMoveHandler = handleMouseMove();

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("blur", resetMouseSpeed);

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("blur", resetMouseSpeed);
    };
  }, [handleMouseMove, resetMouseSpeed]);

  useEffect(() => {
    if (videoRef.current) {
      // Calculate mouse speed as a percentage
      const speedPercentage = (mouseSpeed / MAX_MOUSE_SPEED) * 100;

      // Increase video speed by 10% if mouse speed is 40% or more of max
      const newPlaybackRate =
        speedPercentage >= MOUSE_THRESHOLD_PERCENTAGE
          ? 1 + VIDEO_SPEED_INCREASE_PERCENTAGE / 100
          : 1; // Default playback rate
      videoRef.current.playbackRate = newPlaybackRate;
    }
  }, [mouseSpeed]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setMouseSpeed(0);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <motion.video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={path} type="video/mp4" />
        {errorText}
      </motion.video>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default VideoBackground;
