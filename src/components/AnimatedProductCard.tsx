import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ProductCardProps {
  product: {
    title: string;
    description: string;
    image: string;
    features: string[];
  };
  index: number;
}

export default function AnimatedProductCard({ product, index }: ProductCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isReversed = index % 2 === 1;

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.2
      }
    }
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: isReversed ? 50 : -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3 + (index * 0.1)
      }
    }
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: isReversed ? -50 : 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.4 + (index * 0.1)
      }
    }
  };

  const featureVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const featuresContainerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6 + (index * 0.1)
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`group relative overflow-hidden ${isReversed ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Animated background effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors duration-700"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Content */}
        <motion.div
          variants={contentVariants}
          className={`space-y-6 ${isReversed ? 'lg:order-2' : ''}`}
        >
          {/* Title */}
          <motion.h3
            className="text-3xl lg:text-4xl font-bold text-white leading-tight montserrat"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
              {product.title}
            </span>
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-lg text-gray-300 leading-relaxed montserrat font-light"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
          >
            {product.description}
          </motion.p>

          {/* Features */}
          <motion.div
            variants={featuresContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-wrap gap-3"
          >
            {product.features.map((feature, featureIndex) => (
              <motion.span
                key={featureIndex}
                variants={featureVariants}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(6, 182, 212, 0.2)",
                  borderColor: "rgba(6, 182, 212, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-800/50 border border-cyan-500/30 rounded-full text-sm text-cyan-300 montserrat backdrop-blur-sm cursor-default"
              >
                {feature}
              </motion.span>
            ))}
          </motion.div>

          {/* Floating element */}
          <motion.div
            className="absolute -left-4 top-1/2 w-2 h-16 bg-gradient-to-b from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 rounded-full opacity-60"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleY: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Image */}
        <motion.div
          variants={imageVariants}
          className={`relative group/image ${isReversed ? 'lg:order-1' : ''}`}
        >
          <motion.div
            className="relative overflow-hidden rounded-2xl aspect-[4/3]"
            whileHover={{
              scale: 1.02,
              rotateY: isReversed ? -5 : 5
            }}
            transition={{ duration: 0.3 }}
            style={{ perspective: "1000px" }}
          >
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Image overlay effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-transparent to-blue-500/20"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  );
}