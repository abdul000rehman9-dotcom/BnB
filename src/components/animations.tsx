
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
      viewport={{ once: false, margin: '-8% 0px' }}
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
      viewport={{ once: false, margin: '-8% 0px' }}
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
  delay = 0.8,
  id,
  href,
  type = 'button',
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
  id?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}) {
  const isWhite = className.includes('bg-white') || className.includes('bg-transparent') || className.includes('border-');

  const backOutEase = [0.34, 1.56, 0.64, 1];
  const Tag = href ? motion.a : motion.button;

  // Clean original className to remove any explicit colors or hover colors
  const cleanedClass = className
    .split(' ')
    .filter(c => {
      const isBg = c.startsWith('bg-') || c === 'bg-transparent';
      const isText = c.startsWith('text-');
      const isHoverBg = c.startsWith('hover:bg-');
      const isHoverText = c.startsWith('hover:text-');
      const isTransition = c.startsWith('transition-');
      return !isBg && !isText && !isHoverBg && !isHoverText && !isTransition;
    })
    .join(' ');

  // Determine controlled background, text, and hover classes
  const bgClass = isWhite
    ? (className.includes('bg-transparent') ? 'bg-transparent border border-slate-200' : 'bg-white border border-slate-200')
    : 'bg-[#0b132a]'; // Elegant deep slate/black

  const textClass = isWhite
    ? 'text-slate-800 hover:text-white'
    : 'text-white hover:text-[#0b132a]';

  const slideBgColor = isWhite
    ? 'bg-[#0b132a]' // Slide dark background for white buttons
    : 'bg-white';    // Slide white background for dark buttons

  const transitionClasses = `relative overflow-hidden group select-none transition-all duration-300 cursor-pointer ${bgClass} ${textClass} ${cleanedClass}`;

  return (
    <Tag
      id={id}
      href={href}
      onClick={onClick}
      type={href ? undefined : type}
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: false }}
      transition={{
        duration: 0.8,
        ease: backOutEase,
        delay: delay,
      }}
      className={transitionClasses}
    >
      {/* Sliding background span - matches the border radius of the parent automatically! */}
      <span 
        className={`absolute inset-0 h-full w-full translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 z-0 ${slideBgColor}`} 
      />
      
      {/* Content wrapper always above the sliding background */}
      <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
        {children}
      </span>
    </Tag>
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
        viewport={{ once: true }}
        transition={{ duration: 0.85, delay, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 right-0 bottom-0 bg-[#0a1128] z-10 pointer-events-none"
      />
      {/* Zoom Image */}
      <motion.img
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: delay + 0.1, ease: 'easeOut' }}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
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
      viewport={{ once: false, margin: '-8% 0px' }}
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
