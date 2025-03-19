import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useApp } from '../contexts/AppContext';

const TokenParallax = () => {
  const { t } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/lev_fondo.webp)',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center 40%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </motion.div>
      
      <motion.div 
        style={{ opacity }}
        className="relative h-full flex items-center justify-center px-4"
      >
        <div className="text-center">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-[#D4B750] mb-6"
          >
            {t('parallax.title') || 'Unlock the Future of Digital Assets'}
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white max-w-3xl mx-auto"
          >
            {t('parallax.description') || 'Join the revolution of decentralized finance and experience the power of blockchain technology'}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default TokenParallax; 