import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { useApp } from '../contexts/AppContext';

const Hero = () => {
  const { theme, t } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      ref={containerRef} 
      className="relative min-h-screen overflow-hidden"
      style={{ position: 'relative' }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/crypto-bg.jpg)',
          filter: theme === 'dark' ? 'brightness(0.6)' : 'brightness(0.8)'
        }}
      />

      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(26,30,46,0.7)] to-[#1A1E2E]"
      />

      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(window.innerWidth > 768 ? 50 : 25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#D4B750]"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight - 50
              ],
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth + (Math.random() > 0.5 ? 50 : -50)
              ]
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          variants={itemVariants}
          className="mt-16 mb-8"
        >
          <motion.img
            src="./images/lev.gif"
            alt="Leviathan Animation"
            className="w-[12rem] md:w-[16rem] rounded-full object-cover mx-auto"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#D4B750]">
            LEVIATHAN
          </h1>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#D4B750] tracking-wide"
        >
          {t('hero.title')}
        </motion.h2>

        <motion.h3
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white tracking-wide"
          style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}
        >
          {t('hero.subtitle')}
        </motion.h3>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg max-w-3xl mb-8 text-gray-300 px-4"
        >
          {t('hero.slogan')}
        </motion.p>

        {/* Buttons section with increased spacing */}
        <div className="flex flex-col md:hidden gap-6 mb-12">
          <button className="bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-lg min-w-[200px] transition-all duration-300">
            {t('hero.learnMore')}
          </button>
          <button className="border border-primary hover:bg-primary/10 text-primary px-8 py-3 rounded-lg min-w-[200px] transition-all duration-300">
            {t('hero.getStarted')}
          </button>
        </div>

        {/* Features section with increased spacing from buttons */}
        <motion.div
          variants={itemVariants}
          className="fixed bottom-0 left-0 right-0 sm:absolute sm:bottom-12 flex flex-col sm:flex-row justify-center gap-2 sm:gap-6 px-3 sm:px-6 max-w-6xl mx-auto bg-[rgba(26,30,46,0.95)] sm:bg-transparent py-3 sm:py-0"
        >
          {[
            { icon: '🚀', text: t('features.invest') },
            { icon: '🔒', text: t('features.secure') },
            { icon: '📈', text: t('features.earn') }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 bg-[rgba(26,30,46,0.9)] px-4 py-3 rounded-lg backdrop-blur-sm border border-[#D4B750]/20 flex-1"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 20px rgba(212,183,80,0.2)',
                borderColor: 'rgba(212,183,80,0.5)'
              }}
            >
              <span className="text-xl sm:text-2xl min-w-[24px] sm:min-w-[30px]">{feature.icon}</span>
              <span className="text-white text-sm sm:text-base">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator - Hidden on mobile */}
        <motion.div
          style={{ y, opacity }}
          className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-10 border-2 border-[#D4B750] rounded-full p-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#D4B750] mx-auto"
              animate={{
                y: [0, 12, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero; 