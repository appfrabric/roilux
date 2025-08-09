import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      title: t('premium_quality'),
      description: t('premium_quality_desc'),
      icon: '🌲',
    },
    {
      title: t('custom_solutions'),
      description: t('custom_solutions_desc'),
      icon: '📐',
    },
    {
      title: t('fast_production'),
      description: t('fast_production_desc'),
      icon: '🚚',
    },
    {
      title: t('global_shipping'),
      description: t('global_shipping_desc'),
      icon: '🌍',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-sage-green to-white p-12 text-forest-green"
      >
        <div className="absolute inset-0 wood-texture opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-2 animate-fade-in">
            {t('welcome_to')}
          </h1>
          <h2 className="text-6xl md:text-7xl font-bold mb-2 animate-fade-in">
            {t('company_name')}
          </h2>
          <p className="text-2xl mb-6 opacity-90 font-medium">
            {t('company_subtitle')}
          </p>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            {t('hero_description')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-forest-green text-white rounded-lg font-semibold hover:bg-leaf-green transition-colors duration-300"
            >
              {t('explore_products')}
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/visit/virtual-tour"
              className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-forest-green text-forest-green rounded-lg font-semibold hover:bg-forest-green hover:text-white transition-all duration-300"
            >
              {t('schedule_tour')}
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-forest-green mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Product Categories Preview */}
      <section>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-forest-green mb-8"
        >
          {t('product_categories')}
        </motion.h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: t('plywood'), emoji: '🪵' },
            { name: t('melamine'), emoji: '✨' },
            { name: t('melamine_plywood'), emoji: '🎨' },
            { name: t('veneer'), emoji: '🌳' },
            { name: t('logs'), emoji: '🪓' },
          ].map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-wood-light to-wood-medium rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-3">{category.emoji}</div>
              <h3 className="text-white font-semibold">{category.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="bg-gradient-to-b from-leaf-green to-white rounded-2xl p-8 text-white text-center"
      >
        <h2 className="text-3xl font-bold mb-4">{t('ready_to_order')}</h2>
        <p className="text-xl mb-6">
          {t('sample_guarantee')}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-white text-forest-green rounded-lg font-bold hover:bg-cream transition-colors duration-300"
          >
            {t('view_products')}
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-forest-green transition-all duration-300"
          >
            {t('nav_contact')}
          </Link>
        </div>
      </motion.section>

      {/* Contact Info Footer */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-gradient-to-r from-wood-light to-wood-medium rounded-2xl p-8 text-white"
      >
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-lg font-bold mb-2">{t('call_us')}</h3>
            <a href="tel:+2376812111" className="hover:text-sage-green transition-colors">
              +237-681-21-1111
            </a>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">{t('email_us')}</h3>
            <a href="mailto:roilux.woods@gmail.com" className="hover:text-sage-green transition-colors">
              roilux.woods@gmail.com
            </a>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">{t('visit_us')}</h3>
            <p>{t('abonbang')}</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;