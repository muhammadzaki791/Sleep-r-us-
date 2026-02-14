'use client';

import { motion } from 'framer-motion';

// Fade in animation
export const FadeIn = ({ children, delay = 0, duration = 0.5 }: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
};

// Slide in from left animation
export const SlideInLeft = ({ children, delay = 0, duration = 0.5 }: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
};

// Slide in from right animation
export const SlideInRight = ({ children, delay = 0, duration = 0.5 }: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
};

// Scale in animation
export const ScaleIn = ({ children, delay = 0, duration = 0.5 }: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
};

// Stagger container
export const StaggerContainer = ({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger item
export const StaggerItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 },
      }}
    >
      {children}
    </motion.div>
  );
};