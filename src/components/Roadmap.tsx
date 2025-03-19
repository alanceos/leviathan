import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaRocket, FaChartLine, FaHandshake, FaGlobe } from 'react-icons/fa';
import { useApp } from '../contexts/AppContext';
import './Roadmap.css';

const Roadmap = () => {
  const { t, theme } = useApp();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const phases = [
    {
      icon: <FaRocket />,
      titleKey: 'roadmap.phases.launch.title',
      itemsKey: 'roadmap.phases.launch.items'
    },
    {
      icon: <FaChartLine />,
      titleKey: 'roadmap.phases.expansion.title',
      itemsKey: 'roadmap.phases.expansion.items'
    },
    {
      icon: <FaHandshake />,
      titleKey: 'roadmap.phases.growth.title',
      itemsKey: 'roadmap.phases.growth.items'
    },
    {
      icon: <FaGlobe />,
      titleKey: 'roadmap.phases.ecosystem.title',
      itemsKey: 'roadmap.phases.ecosystem.items'
    }
  ];

  return (
    <section 
      id="roadmap" 
      className={`relative overflow-hidden ${
        theme === 'dark' ? 'bg-[#1A1E2E]' : 'bg-gray-100'
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="fractal-background"></div>
      </div>

      {/* Content with backdrop blur */}
      <div className="relative z-10 backdrop-blur-[2px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold text-[#D4B750] text-center mb-16"
            >
              {t('roadmap.title')}
            </motion.h2>

            <div className="relative">
              {/* Timeline line with glow effect */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 hidden md:block bg-gradient-to-b from-[#D4B750] via-[#D4B750] to-transparent shadow-[0_0_15px_#D4B750]"></div>

              <div className="space-y-16">
                {phases.map((phase, index) => {
                  const items = t(phase.itemsKey);
                  if (!Array.isArray(items)) return null;

                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Timeline dot with glow */}
                      <motion.div 
                        className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#D4B750] rounded-full hidden md:block shadow-[0_0_10px_#D4B750]"
                        whileHover={{ scale: 1.5 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Content */}
                      <div className={`w-full md:w-1/2 ${
                        index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                      }`}>
                        <motion.div 
                          className={`${
                            theme === 'dark' 
                              ? 'bg-[rgba(51,51,51,0.8)]' 
                              : 'bg-[rgba(255,255,255,0.9)]'
                          } p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-md border border-[#D4B750]/10`}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: '0 0 20px rgba(212,183,80,0.2)'
                          }}
                        >
                          <motion.div 
                            className="text-[#D4B750] text-4xl mb-4 inline-block"
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            {phase.icon}
                          </motion.div>
                          <h3 className="text-2xl font-bold text-[#D4B750] mb-4">
                            {t(phase.titleKey)}
                          </h3>
                          <ul className="space-y-2">
                            {items.map((item, itemIndex) => (
                              <motion.li 
                                key={itemIndex} 
                                className={`${
                                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                } flex items-center`}
                                whileHover={{ x: 10 }}
                                transition={{ duration: 0.2 }}
                              >
                                <span className="text-[#D4B750] mr-2">•</span>
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap; 