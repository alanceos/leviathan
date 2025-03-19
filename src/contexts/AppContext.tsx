import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type Language = 'en' | 'es';

interface NavTranslations {
  home: string;
  blockchain: string;
  investment: string;
  opportunities: string;
  contact: string;
  connect: string;
  about: string;
  howItWorks: string;
  roadmap: string;
  faq: string;
}

interface ThemeTranslations {
  light: string;
  dark: string;
}

interface LanguageTranslations {
  en: string;
  es: string;
}

interface HeroTranslations {
  title: string;
  subtitle: string;
  slogan: string;
  button: string;
  learnMore: string;
  getStarted: string;
}

interface FeaturesTranslations {
  invest: string;
  secure: string;
  earn: string;
}

interface AboutTranslations {
  mission: string;
  missionText: string;
  transparency: {
    title: string;
    description: string;
  };
  security: {
    title: string;
    description: string;
  };
  profitability: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
}

interface HowItWorksTranslations {
  title: string;
  steps: {
    invest: {
      title: string;
      description: string;
    };
    earn: {
      title: string;
      description: string;
    };
    stake: {
      title: string;
      description: string;
    };
    secure: {
      title: string;
      description: string;
    };
  };
}

interface RoadmapTranslations {
  title: string;
  phases: {
    launch: {
      title: string;
      items: string[];
    };
    expansion: {
      title: string;
      items: string[];
    };
    growth: {
      title: string;
      items: string[];
    };
    ecosystem: {
      title: string;
      items: string[];
    };
  };
}

interface FAQTranslations {
  title: string;
  howToInvest: {
    question: string;
    answer: string;
  };
  assets: {
    question: string;
    answer: string;
  };
  rewards: {
    question: string;
    answer: string;
  };
  profits: {
    question: string;
    answer: string;
  };
}

interface FooterTranslations {
  company: {
    slogan: string;
  };
  quickLinks: {
    title: string;
    links: string[];
  };
  contact: {
    title: string;
    email: string;
    website: string;
  };
  social: {
    title: string;
  };
  copyright: string;
}

interface SupportTranslations {
  title: string;
  contact: string;
  button: string;
}

interface TranslationSet {
  nav: NavTranslations;
  theme: ThemeTranslations;
  language: LanguageTranslations;
  hero: HeroTranslations;
  features: FeaturesTranslations;
  about: AboutTranslations;
  howItWorks: HowItWorksTranslations;
  roadmap: RoadmapTranslations;
  faq: FAQTranslations;
  footer: FooterTranslations;
  support: SupportTranslations;
  parallax: {
    title: string;
    description: string;
  };
}

interface Translations {
  en: TranslationSet;
  es: TranslationSet;
}

interface AppContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  t: (key: string) => string | string[];
}

const translations: Translations = {
  en: {
    nav: {
      home: 'HOME',
      blockchain: 'BLOCKCHAIN',
      investment: 'INVESTMENT',
      opportunities: 'OPPORTUNITIES',
      contact: 'CONTACT',
      connect: 'Connect Wallet',
      about: 'About',
      howItWorks: 'How It Works',
      roadmap: 'Roadmap',
      faq: 'FAQ'
    },
    theme: {
      light: 'Light Mode',
      dark: 'Dark Mode'
    },
    language: {
      en: 'English',
      es: 'Spanish'
    },
    hero: {
      title: 'TOKEN ASSET INVESTMENT',
      subtitle: 'MASTER THE WAVES OF TOKENIZED INVESTMENT',
      slogan: 'Join the future of digital asset investment with our innovative blockchain platform.',
      button: 'Get Started',
      learnMore: 'Learn More',
      getStarted: 'Get Started'
    },
    features: {
      invest: 'Invest in Tokenized Assets',
      secure: 'Secure Blockchain Transactions',
      earn: 'Earn Passive Income'
    },
    about: {
      mission: 'Our Mission',
      missionText: 'Leviathan Token Asset Fund is committed to revolutionizing asset ownership through tokenization. By leveraging Ethereum blockchain technology, we provide fractional ownership of high-value assets such as rental car fleets, buses, golf carts, and real estate properties.',
      transparency: {
        title: 'Transparency',
        description: 'Full blockchain-based reporting and tracking for complete visibility of your investments.'
      },
      security: {
        title: 'Security',
        description: 'Smart contract-driven investment protection ensuring the safety of your assets.'
      },
      profitability: {
        title: 'Profitability',
        description: 'Passive income through asset-backed token yields and smart contract automation.'
      },
      vision: {
        title: 'Our Vision',
        description: 'To become the leading blockchain-powered asset fund, enabling global investors to securely participate in tokenized real-world assets and generate passive income through rental and leasing profits.'
      }
    },
    howItWorks: {
      title: 'How It Works',
      steps: {
        invest: {
          title: 'Invest in Tokenized Assets',
          description: 'Purchase Leviathan Tokens to gain fractional ownership in high-value rental and leasing assets.'
        },
        earn: {
          title: 'Earn Passive Income',
          description: 'Receive rental profits and asset-generated revenues directly to your wallet through blockchain smart contracts.'
        },
        stake: {
          title: 'Stake for Higher Rewards',
          description: 'Lock your Leviathan Tokens to earn additional staking rewards and governance rights in the ecosystem.'
        },
        secure: {
          title: 'Secure & Transparent Transactions',
          description: 'All investments are secured using Ethereum smart contracts, ensuring trust and accountability.'
        }
      }
    },
    roadmap: {
      title: 'Roadmap',
      phases: {
        launch: {
          title: 'Q2 2025 – Launch Phase',
          items: [
            'Website deployment and platform launch',
            'Smart contract integration',
            'Investor onboarding and private sale'
          ]
        },
        expansion: {
          title: 'Q3 2025 – Expansion & Staking Activation',
          items: [
            'Public token sale and exchange listing',
            'Leviathan staking rewards activation',
            'Expansion into real estate & vehicle rental asset tokenization'
          ]
        },
        growth: {
          title: 'Q4 2025 – Growth & Adoption',
          items: [
            'Partnerships with auto rental and logistics companies',
            'Full transparency reports & automated investor payouts'
          ]
        },
        ecosystem: {
          title: '2026 – Full Ecosystem Development',
          items: [
            'Multi-region expansion (Mexico, Central America, U.S.)',
            'Advanced governance & DeFi integrations'
          ]
        }
      }
    },
    faq: {
      title: 'Frequently Asked Questions',
      howToInvest: {
        question: 'How do I invest?',
        answer: 'Sign up and purchase Leviathan Tokens via our Ethereum-based platform.'
      },
      assets: {
        question: 'What assets back the tokens?',
        answer: 'Our tokens are backed by a diverse portfolio of real-world assets including real estate, commodities, and high-yield financial instruments.'
      },
      rewards: {
        question: 'Are there staking rewards?',
        answer: 'Yes, token holders can earn passive income through our staking program with competitive APY rates.'
      },
      profits: {
        question: 'How are profits distributed?',
        answer: 'Profits are distributed monthly through smart contracts based on your token holdings and staking participation.'
      }
    },
    footer: {
      company: {
        slogan: 'Tokenizing Real-World Assets for the Future'
      },
      quickLinks: {
        title: 'Quick Links',
        links: ['Home', 'Blockchain', 'Investment', 'Opportunities', 'Contact']
      },
      contact: {
        title: 'Contact',
        email: 'support@leviathantokenfund.com',
        website: 'www.leviathantokenfund.com'
      },
      social: {
        title: 'Follow Us'
      },
      copyright: '© 2024 Leviathan Token Asset Fund. All rights reserved.'
    },
    support: {
      title: 'Still have questions?',
      contact: 'Contact our support team',
      button: 'Contact Support'
    },
    parallax: {
      title: "Unlock the Future of Digital Assets",
      description: "Join the revolution of decentralized finance and experience the power of blockchain technology"
    }
  },
  es: {
    nav: {
      home: 'INICIO',
      blockchain: 'BLOCKCHAIN',
      investment: 'INVERSIÓN',
      opportunities: 'OPORTUNIDADES',
      contact: 'CONTACTO',
      connect: 'Conectar Wallet',
      about: 'Nosotros',
      howItWorks: 'Cómo Funciona',
      roadmap: 'Roadmap',
      faq: 'Preguntas'
    },
    theme: {
      light: 'Modo Claro',
      dark: 'Modo Oscuro'
    },
    language: {
      en: 'Inglés',
      es: 'Español'
    },
    hero: {
      title: 'INVERSIÓN EN ACTIVOS TOKEN',
      subtitle: 'DOMINA LAS OLAS DE LA INVERSIÓN TOKENIZADA',
      slogan: 'Únete al futuro de la inversión en activos digitales con nuestra innovadora plataforma blockchain.',
      button: 'Comenzar',
      learnMore: 'Saber Más',
      getStarted: 'Comenzar'
    },
    features: {
      invest: 'Invierte en Activos Tokenizados',
      secure: 'Transacciones Blockchain Seguras',
      earn: 'Genera Ingresos Pasivos'
    },
    about: {
      mission: 'Nuestra Misión',
      missionText: 'Leviathan Token Asset Fund está comprometido con revolucionar la propiedad de activos a través de la tokenización. Mediante el uso de la tecnología blockchain de Ethereum, proporcionamos propiedad fraccionada de activos de alto valor como flotas de autos de alquiler, autobuses, carritos de golf y propiedades inmobiliarias.',
      transparency: {
        title: 'Transparencia',
        description: 'Reportes y seguimiento completo basado en blockchain para total visibilidad de tus inversiones.'
      },
      security: {
        title: 'Seguridad',
        description: 'Protección de inversiones impulsada por contratos inteligentes que garantizan la seguridad de tus activos.'
      },
      profitability: {
        title: 'Rentabilidad',
        description: 'Ingresos pasivos a través de rendimientos de tokens respaldados por activos y automatización de contratos inteligentes.'
      },
      vision: {
        title: 'Nuestra Visión',
        description: 'Convertirnos en el fondo de activos líder impulsado por blockchain, permitiendo a inversores globales participar de manera segura en activos del mundo real tokenizados y generar ingresos pasivos a través de ganancias de alquiler y arrendamiento.'
      }
    },
    howItWorks: {
      title: 'Cómo Funciona',
      steps: {
        invest: {
          title: 'Invierte en Activos Tokenizados',
          description: 'Compra Tokens Leviathan para obtener propiedad fraccionada en activos de alquiler y arrendamiento de alto valor.'
        },
        earn: {
          title: 'Gana Ingresos Pasivos',
          description: 'Recibe ganancias de alquiler e ingresos generados por activos directamente en tu wallet a través de contratos inteligentes.'
        },
        stake: {
          title: 'Stake para Mayores Recompensas',
          description: 'Bloquea tus Tokens Leviathan para ganar recompensas adicionales de staking y derechos de gobernanza en el ecosistema.'
        },
        secure: {
          title: 'Transacciones Seguras y Transparentes',
          description: 'Todas las inversiones están aseguradas mediante contratos inteligentes de Ethereum, garantizando confianza y responsabilidad.'
        }
      }
    },
    roadmap: {
      title: 'Hoja de Ruta',
      phases: {
        launch: {
          title: 'Q2 2025 – Fase de Lanzamiento',
          items: [
            'Despliegue del sitio web y lanzamiento de la plataforma',
            'Integración de contratos inteligentes',
            'Incorporación de inversores y venta privada'
          ]
        },
        expansion: {
          title: 'Q3 2025 – Expansión y Activación de Staking',
          items: [
            'Venta pública de tokens y listado en exchanges',
            'Activación de recompensas de staking Leviathan',
            'Expansión a tokenización de bienes raíces y alquiler de vehículos'
          ]
        },
        growth: {
          title: 'Q4 2025 – Crecimiento y Adopción',
          items: [
            'Alianzas con empresas de alquiler de autos y logística',
            'Informes de transparencia completos y pagos automatizados a inversores'
          ]
        },
        ecosystem: {
          title: '2026 – Desarrollo Completo del Ecosistema',
          items: [
            'Expansión multi-región (México, Centroamérica, EE.UU.)',
            'Gobernanza avanzada e integraciones DeFi'
          ]
        }
      }
    },
    faq: {
      title: 'Preguntas Frecuentes',
      howToInvest: {
        question: '¿Cómo puedo invertir?',
        answer: 'Regístrate y compra Tokens Leviathan a través de nuestra plataforma basada en Ethereum.'
      },
      assets: {
        question: '¿Qué activos respaldan los tokens?',
        answer: 'Nuestros tokens están respaldados por una cartera diversificada de activos del mundo real, incluyendo bienes raíces, materias primas e instrumentos financieros de alto rendimiento.'
      },
      rewards: {
        question: '¿Hay recompensas por staking?',
        answer: 'Sí, los poseedores de tokens pueden ganar ingresos pasivos a través de nuestro programa de staking con tasas APY competitivas.'
      },
      profits: {
        question: '¿Cómo se distribuyen las ganancias?',
        answer: 'Las ganancias se distribuyen mensualmente a través de contratos inteligentes según tus tokens y participación en staking.'
      }
    },
    footer: {
      company: {
        slogan: 'Tokenizando Activos del Mundo Real para el Futuro'
      },
      quickLinks: {
        title: 'Enlaces Rápidos',
        links: ['Inicio', 'Blockchain', 'Inversión', 'Oportunidades', 'Contacto']
      },
      contact: {
        title: 'Contacto',
        email: 'support@leviathantokenfund.com',
        website: 'www.leviathantokenfund.com'
      },
      social: {
        title: 'Síguenos'
      },
      copyright: '© 2024 Leviathan Token Asset Fund. Todos los derechos reservados.'
    },
    support: {
      title: '¿Aún tienes preguntas?',
      contact: 'Contacta a nuestro equipo de soporte',
      button: 'Contactar Soporte'
    },
    parallax: {
      title: "Desbloquea el Futuro de los Activos Digitales",
      description: "Únete a la revolución de las finanzas descentralizadas y experimenta el poder de la tecnología blockchain"
    }
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'dark';
  });
  
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  const t = (key: string): string | string[] => {
    try {
      const keys = key.split('.');
      let value: any = translations[language];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
      }
      
      if (typeof value === 'string' || Array.isArray(value)) {
        return value;
      } else {
        console.warn(`Invalid translation value for key: ${key}`);
        return key;
      }
    } catch (error) {
      console.error(`Error getting translation for key: ${key}`, error);
      return key;
    }
  };

  return (
    <AppContext.Provider value={{ theme, language, toggleTheme, toggleLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext; 