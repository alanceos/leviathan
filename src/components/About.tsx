import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  TbTargetArrow, 
  TbBuildingBank, 
  TbChartBar, 
  TbShieldLock,
  TbUsers,
  TbWorld
} from 'react-icons/tb';
import { useApp } from '../contexts/AppContext';

const About = () => {
  const { t, theme } = useApp();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: <TbTargetArrow className="text-4xl" />,
      titleKey: 'about.features.mission.title',
      descriptionKey: 'about.features.mission.description'
    },
    {
      icon: <TbBuildingBank className="text-4xl" />,
      titleKey: 'about.features.investment.title',
      descriptionKey: 'about.features.investment.description'
    },
    {
      icon: <TbChartBar className="text-4xl" />,
      titleKey: 'about.features.growth.title',
      descriptionKey: 'about.features.growth.description'
    },
    {
      icon: <TbShieldLock className="text-4xl" />,
      titleKey: 'about.features.security.title',
      descriptionKey: 'about.features.security.description'
    },
    {
      icon: <TbUsers className="text-4xl" />,
      titleKey: 'about.features.community.title',
      descriptionKey: 'about.features.community.description'
    },
    {
      icon: <TbWorld className="text-4xl" />,
      titleKey: 'about.features.global.title',
      descriptionKey: 'about.features.global.description'
    }
  ];

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
    <section id="about" className={theme === 'dark' ? 'bg-[#1A1E2E]' : 'bg-gray-100'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-[#D4B750] text-center mb-12"
          >
            {t('about.mission')}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-center mb-16 max-w-3xl mx-auto`}
          >
            {t('about.missionText')}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={itemVariants}
              className={`${theme === 'dark' ? 'bg-[#333333]' : 'bg-white'} p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition-all duration-300`}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                <TbTargetArrow className="text-[#D4B750] text-4xl mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold text-[#D4B750] mb-4">{t('about.transparency.title')}</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t('about.transparency.description')}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`${theme === 'dark' ? 'bg-[#333333]' : 'bg-white'} p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition-all duration-300`}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                <TbShieldLock className="text-[#D4B750] text-4xl mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold text-[#D4B750] mb-4">{t('about.security.title')}</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t('about.security.description')}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`${theme === 'dark' ? 'bg-[#333333]' : 'bg-white'} p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition-all duration-300`}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                <TbChartBar className="text-[#D4B750] text-4xl mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold text-[#D4B750] mb-4">{t('about.profitability.title')}</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t('about.profitability.description')}
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold text-[#D4B750] mb-6">{t('about.vision.title')}</h3>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto`}>
              {t('about.vision.description')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 