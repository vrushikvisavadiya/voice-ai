"use client";

import { motion, type MotionProps } from "framer-motion";
import * as React from "react";

type AnimatedSectionProps = React.PropsWithChildren<
  MotionProps & {
    className?: string;
    delay?: number;
  }
>;

export function AnimatedSection({
  children,
  className,
  delay = 0,
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}
