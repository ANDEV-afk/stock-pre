import { Variants } from "framer-motion";

// Enhanced catchy animations
export const bounceIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      duration: 0.6,
    },
  },
};

export const slideInBounce: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      duration: 0.8,
    },
  },
};

export const flipIn: Variants = {
  hidden: {
    opacity: 0,
    rotateY: -90,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      duration: 0.7,
    },
  },
};

export const morphIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    borderRadius: "50%",
  },
  visible: {
    opacity: 1,
    scale: 1,
    borderRadius: "12px",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 15,
      duration: 0.6,
    },
  },
};

export const elasticScale: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

export const glowPulse: Variants = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(6, 182, 212, 0.3)",
      "0 0 60px rgba(6, 182, 212, 0.6)",
      "0 0 20px rgba(6, 182, 212, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const typewriter: Variants = {
  hidden: { width: 0 },
  visible: {
    width: "auto",
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

export const waveSlide: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
    rotateZ: -10,
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    rotateZ: 0,
    transition: {
      delay: i * 0.2,
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  }),
};

export const magneticHover = {
  scale: 1.05,
  rotateZ: 2,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 15,
  },
};

export const liquidAnimation: Variants = {
  hidden: {
    pathLength: 0,
    fill: "rgba(0, 0, 0, 0)",
  },
  visible: {
    pathLength: 1,
    fill: "rgba(6, 182, 212, 1)",
    transition: {
      pathLength: { duration: 2, ease: "easeInOut" },
      fill: { duration: 1, delay: 1 },
    },
  },
};

export const particleFloat: Variants = {
  animate: {
    y: [0, -20, 0],
    x: [0, 10, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const neonGlow: Variants = {
  hidden: {
    opacity: 0,
    textShadow: "0 0 0px rgba(6, 182, 212, 0)",
  },
  visible: {
    opacity: 1,
    textShadow: [
      "0 0 5px rgba(6, 182, 212, 0.8)",
      "0 0 20px rgba(6, 182, 212, 0.6)",
      "0 0 35px rgba(6, 182, 212, 0.4)",
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export const cardFlip: Variants = {
  hidden: {
    rotateY: -180,
    opacity: 0,
  },
  visible: {
    rotateY: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
  hover: {
    rotateY: 5,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export const rippleEffect: Variants = {
  hidden: {
    scale: 0,
    opacity: 1,
  },
  visible: {
    scale: 4,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const smoothBounce: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const fadeSlideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
};

export const staggeredContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

export const parallaxFloat: Variants = {
  animate: {
    y: [0, -15, 0],
    x: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const clockwiseRotate: Variants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const counterclockwiseRotate: Variants = {
  animate: {
    rotate: [0, -360],
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const breathingScale: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const liquidMorph: Variants = {
  animate: {
    borderRadius: ["20% 80% 80% 20%", "80% 20% 20% 80%", "20% 80% 80% 20%"],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Utility functions for enhanced animations
export const createDelayedSpring = (delay: number) => ({
  type: "spring",
  stiffness: 200,
  damping: 20,
  delay,
});

export const createBounceSpring = (stiffness = 300, damping = 20) => ({
  type: "spring",
  stiffness,
  damping,
});

export const createElasticTransition = (duration = 0.8) => ({
  type: "spring",
  stiffness: 400,
  damping: 10,
  duration,
});

// Animation presets for different UI elements
export const buttonPress = {
  whileHover: magneticHover,
  whileTap: { scale: 0.95 },
};

export const cardHover = {
  whileHover: {
    y: -8,
    scale: 1.02,
    transition: createBounceSpring(),
  },
};

export const iconSpin = {
  whileHover: {
    rotate: 180,
    transition: { duration: 0.3 },
  },
};

export const floatingElement = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
