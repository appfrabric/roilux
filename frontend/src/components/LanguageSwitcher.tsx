import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="flex items-center px-3 py-2 text-forest-green hover:bg-light-green rounded-lg transition-all duration-300"
      >
        <GlobeAltIcon className="w-5 h-5 mr-2" />
        <span className="font-medium">
          {languages.find(lang => lang.code === i18n.language)?.flag || '🌐'}
        </span>
      </motion.button>

      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`w-full flex items-center px-4 py-3 text-left hover:bg-light-green transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
              i18n.language === language.code 
                ? 'bg-sage-green text-forest-green font-semibold' 
                : 'text-gray-700'
            }`}
          >
            <span className="text-xl mr-3">{language.flag}</span>
            <span>{language.name}</span>
            {i18n.language === language.code && (
              <span className="ml-auto text-forest-green">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;