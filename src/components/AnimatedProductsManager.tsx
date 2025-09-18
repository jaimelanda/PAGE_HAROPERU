import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedProductCard from './AnimatedProductCard';

interface Product {
  title: string;
  description: string;
  image: string;
  features: string[];
}

interface AnimatedProductsManagerProps {
  products: Product[];
}

export default function AnimatedProductsManager({ products }: AnimatedProductsManagerProps) {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const descriptionVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.4
      }
    }
  };

  return (
    <>
      {/* Animated Header */}
      <motion.div
        ref={headerRef}
        variants={headerVariants}
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
        className="text-center mb-16"
      >
        <motion.h2
          variants={titleVariants}
          className="text-3xl text-white mt-3 mb-4 font-semibold montserrat"
        >
          Categorías Especializadas
        </motion.h2>
        <motion.p
          variants={descriptionVariants}
          className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed montserrat font-light"
        >
          Encuentra la solución perfecta para tu vehículo en nuestras categorías especializadas de repuestos automotrices.
        </motion.p>
      </motion.div>

      {/* Animated Products */}
      <motion.div className="space-y-24">
        {products.map((product, index) => (
          <AnimatedProductCard
            key={index}
            product={product}
            index={index}
          />
        ))}
      </motion.div>
    </>
  );
}