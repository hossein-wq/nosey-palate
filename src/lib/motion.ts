export const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const CINEMATIC_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const SPRING_LUXURY = { type: "spring" as const, stiffness: 100, damping: 30 };

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease: LUXURY_EASE },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1, ease: LUXURY_EASE },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.12 } },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const scaleReveal = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1.4, ease: CINEMATIC_EASE },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1.1, ease: LUXURY_EASE },
};

export const slideInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1.1, ease: LUXURY_EASE },
};

export const viewportOnce = { once: true, margin: "-80px" as const };
