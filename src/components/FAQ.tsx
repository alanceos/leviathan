import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { FiChevronDown } from 'react-icons/fi';

const FAQ = () => {
  const { t, theme } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = [
    {
      key: 'howToInvest',
      icon: '💰'
    },
    {
      key: 'assets',
      icon: '🏢'
    },
    {
      key: 'rewards',
      icon: '🎁'
    },
    {
      key: 'profits',
      icon: '📈'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="faq" className={`py-20 px-4 ${theme === 'dark' ? 'bg-[#1A1E2E]' : 'bg-white'}`}>
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#D4B750]"
        >
          {t('faq.title')}
        </motion.h2>

        <motion.div className="space-y-4">
          {questions.map((question, index) => (
            <motion.div
              key={question.key}
              variants={itemVariants}
              className={`border border-[#D4B750]/20 rounded-xl overflow-hidden backdrop-blur-sm ${
                theme === 'dark' ? 'bg-[rgba(26,30,46,0.8)]' : 'bg-white'
              }`}
              whileHover={{
                scale: 1.01,
                boxShadow: '0 0 20px rgba(212,183,80,0.1)',
                borderColor: 'rgba(212,183,80,0.4)'
              }}
            >
              <motion.button
                className={`w-full p-6 flex items-center justify-between text-left ${
                  theme === 'dark' 
                    ? 'hover:bg-[rgba(26,30,46,0.9)]' 
                    : 'hover:bg-gray-50'
                } transition-colors`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-4">
                  <motion.span 
                    className="text-2xl"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {question.icon}
                  </motion.span>
                  <h3 className={`text-xl font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {t(`faq.${question.key}.question`)}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="text-2xl text-[#D4B750]" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className={`p-6 pt-0 ${
                      theme === 'dark' ? 'text-gray-300 bg-[rgba(26,30,46,0.8)]' : 'text-gray-600 bg-gray-50'
                    }`}>
                      {t(`faq.${question.key}.answer`)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-6`}>{t('support.title')}</p>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(212,183,80,0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent text-[#D4B750] px-8 py-3 rounded-full text-lg font-bold transform transition-all duration-300 border-2 border-[#D4B750] hover:bg-[#D4B750] hover:text-black"
          >
            {t('support.button')}
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FAQ; 