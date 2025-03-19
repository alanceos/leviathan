import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaTelegram, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { useApp } from '../contexts/AppContext';

const Footer = () => {
  const { t, theme } = useApp();
  const socialLinks = [
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
    { icon: <FaTelegram />, href: "#", label: "Telegram" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  const quickLinks = t('footer.quickLinks.links');
  const links = Array.isArray(quickLinks) ? quickLinks : [];

  return (
    <footer className={theme === 'dark' ? 'bg-[#1A1E2E]' : 'bg-gray-900'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div variants={itemVariants}>
              <motion.h3 
                className="text-2xl font-bold text-[#D4B750] mb-4"
                whileHover={{ scale: 1.05 }}
              >
                LEVIATHAN
              </motion.h3>
              <p className="text-gray-300">
                {t('footer.company.slogan')}
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-bold text-[#D4B750] mb-4">{t('footer.quickLinks.title')}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <motion.li 
                    key={link}
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-gray-300 hover:text-[#D4B750] transition-colors flex items-center"
                    >
                      <span className="text-[#D4B750] mr-2">•</span>
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-bold text-[#D4B750] mb-4">{t('footer.contact.title')}</h4>
              <ul className="space-y-2">
                <motion.li 
                  className="flex items-center text-gray-300"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaEnvelope className="mr-2 text-[#D4B750]" />
                  {t('footer.contact.email')}
                </motion.li>
                <motion.li 
                  className="flex items-center text-gray-300"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaGlobe className="mr-2 text-[#D4B750]" />
                  {t('footer.contact.website')}
                </motion.li>
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-bold text-[#D4B750] mb-4">{t('footer.social.title')}</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#D4B750] text-2xl hover:text-[#B38C28] transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-300"
          >
            <p>{t('footer.copyright')}</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 