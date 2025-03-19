import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { TbSun, TbMoon, TbMenu2, TbX } from 'react-icons/tb';

const Navbar = () => {
  const { t, theme, toggleTheme, language, toggleLanguage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { key: 'about', href: 'about' },
    { key: 'howItWorks', href: 'how-it-works' },
    { key: 'roadmap', href: 'roadmap' },
    { key: 'faq', href: 'faq' }
  ];

  return (
    <nav className={`fixed w-full bg-opacity-90 backdrop-blur-sm z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#1A1E2E] py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/images/leviathan-logo.png" alt="Leviathan" className="h-10 w-10" />
            <span className="text-[#D4B750] font-bold text-xl tracking-wider">LEVIATHAN</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.key}
                onClick={() => handleNavClick(link.href)}
                className="text-gray-300 hover:text-[#D4B750] transition-colors text-base font-medium"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('nav.' + link.key)}
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-md text-[#D4B750] border border-[#D4B750]/20 hover:border-[#D4B750] transition-colors text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language.toUpperCase()}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="text-[#D4B750] p-2 rounded-full hover:bg-[#D4B750]/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? <TbSun size={20} /> : <TbMoon size={20} />}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-[#D4B750] p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <TbX size={24} /> : <TbMenu2 size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1A1E2E] border-t border-[#D4B750]/10"
          >
            <div className="px-4 py-2 space-y-2">
              {navLinks.map((link) => (
                <motion.button
                  key={link.key}
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:text-[#D4B750] hover:bg-[#D4B750]/10 rounded-md transition-colors"
                  whileHover={{ x: 10 }}
                >
                  {t('nav.' + link.key)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 