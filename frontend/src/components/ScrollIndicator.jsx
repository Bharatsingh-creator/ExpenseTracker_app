import { motion, useScroll } from "framer-motion";


const ScrollIndicator = ({ progress }) => {
  // progress expected to be 0–1
  return (
    <motion.div
      className="absolute top-0 left-0 right-0 h-1 bg-pink-500 origin-left transition-transform duration-200 ease-out"
      style={{
        scaleX: progress,
      }}
    />
  );
};

export default ScrollIndicator;
