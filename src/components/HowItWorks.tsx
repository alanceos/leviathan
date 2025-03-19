import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  TbCoin, 
  TbWallet, 
  TbShieldLock, 
  TbChartBar 
} from 'react-icons/tb';
import { useApp } from '../contexts/AppContext';
import './Roadmap.css';

const HowItWorks = () => {
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

  const steps = [
    {
      icon: <TbCoin className="text-4xl" />,
      titleKey: 'howItWorks.steps.invest.title',
      descriptionKey: 'howItWorks.steps.invest.description'
    },
    {
      icon: <TbWallet className="text-4xl" />,
      titleKey: 'howItWorks.steps.earn.title',
      descriptionKey: 'howItWorks.steps.earn.description'
    },
    {
      icon: <TbShieldLock className="text-4xl" />,
      titleKey: 'howItWorks.steps.stake.title',
      descriptionKey: 'howItWorks.steps.stake.description'
    },
    {
      icon: <TbChartBar className="text-4xl" />,
      titleKey: 'howItWorks.steps.secure.title',
      descriptionKey: 'howItWorks.steps.secure.description'
    }
  ];

  return (
    <section id="how-it-works" className={theme === 'dark' ? 'bg-[#1A1E2E]' : 'bg-white'}>
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
            {t('howItWorks.title')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${theme === 'dark' ? 'bg-[#333333]' : 'bg-gray-50'} p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition-all duration-300`}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 20px rgba(212,183,80,0.2)'
                }}
              >
                <motion.div
                  className="text-[#D4B750] mb-6 inline-block"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-[#D4B750] mb-4">
                  {t(step.titleKey)}
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {t(step.descriptionKey)}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#D4B750] text-[#000000] px-8 py-4 rounded-full text-xl font-bold hover:bg-[#B38C28] transition-colors"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks; 