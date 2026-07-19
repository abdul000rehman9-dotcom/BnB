/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

// Word-by-word Heading Animation
interface AnimatedHeadingProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

export function AnimatedHeading({ text, className = '', as: Tag = 'h2' }: AnimatedHeadingProps) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], // premium custom ease-out
      },
    },
  };

  // Resolve motion component safely
  const MotionTag = motion[Tag as keyof typeof motion] as React.ComponentType<HTMLMotionProps<any>>;

  return (
    <MotionTag
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px' }}
      className={`flex flex-wrap ${className.includes('text-center') ? 'justify-center' : 'justify-start'} ${className}`}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={wordVariants}
          className="mr-[0.25em] inline-block whitespace-nowrap"
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}

// Fade and Lift Paragraph
export function AnimatedParagraph({
  children,
  className = '',
  delay = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

// Interactive Scale & Lift Button
export function AnimatedButton({
  children,
  className = '',
  onClick,
  delay = 0.2,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
  id?: string;
}) {
  return (
    <motion.button
      id={id}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={{
        y: -3,
        scale: 1.02,
        boxShadow: '0 12px 24px -6px rgba(15, 23, 42, 0.12), 0 8px 16px -8px rgba(15, 23, 42, 0.08)',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.button>
  );
}

// Top-to-Bottom Masked Reveal for Images
export function ImageReveal({
  src,
  alt,
  className = '',
  delay = 0.1,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Mask Overlay */}
      <motion.div
        initial={{ height: '100%' }}
        whileInView={{ height: '0%' }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 0.85, delay, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 right-0 bottom-0 bg-[#0a1128] z-10"
      />
      {/* Zoom Image */}
      <motion.img
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 1.1, delay: delay + 0.1, ease: 'easeOut' }}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

// Fade In Container with Staggered Children
export function StaggerContainer({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export type SlideDirection = 'up' | 'down' | 'left' | 'right';

const slideOffsets = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
};

// Slide and Fade In Child
export function StaggerItem({
  children,
  className = '',
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  direction?: SlideDirection;
}) {
  const offset = slideOffsets[direction];
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: offset.x, 
      y: offset.y 
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
