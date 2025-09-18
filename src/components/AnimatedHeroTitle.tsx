import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedHeroTitleProps {
  title: string;
  slideIndex: number;
  currentSlide: number;
}

export default function AnimatedHeroTitle({ title, slideIndex, currentSlide }: AnimatedHeroTitleProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(slideIndex === currentSlide);
  }, [slideIndex, currentSlide]);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smooth easing
        delayChildren: 0.4,
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      filter: "blur(8px)",
      rotateX: 15
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1], // Material Design easing
        type: "tween"
      }
    }
  };

  const words = title.split(' ');

  return (
    <motion.h1
      className="text-white text-4xl lg:text-5xl font-black leading-tight mb-6 uppercase tracking-widest hero-title"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      key={slideIndex}
      style={{ perspective: "1000px" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block mr-2"
          style={{ transformStyle: "preserve-3d" }}
          whileHover={{
            scale: 1.05,
            color: "#06b6d4",
            transition: { duration: 0.2 }
          }}
        >
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={isVisible ? {
                opacity: 1,
                transition: {
                  delay: 0.8 + (index * 0.1) + (charIndex * 0.03),
                  duration: 0.1
                }
              } : { opacity: 0 }}
              whileHover={{
                y: -2,
                transition: { duration: 0.1 }
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}

      {/* Breathing effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={isVisible ? {
          scale: [1, 1.02, 1],
          opacity: [0.8, 1, 0.8]
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.h1>
  );
}