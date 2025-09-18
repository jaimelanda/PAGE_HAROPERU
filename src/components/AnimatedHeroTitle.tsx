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
      y: -30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delayChildren: 0.2,
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: -60,
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
        duration: 0.7
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
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}