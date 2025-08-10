import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { imageConfig, getRandomFactoryImages } from '../config/imageConfig';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Carousel images combining products and factory highlights
  const heroImages = [
    {
      src: imageConfig.products.plywood.mainImage,
      title: t('plywood'),
      subtitle: t('plywood_desc'),
      cta: t('explore_products'),
      link: '/products/plywood'
    },
    {
      src: imageConfig.products['melamine-plywood'].mainImage,
      title: t('melamine_plywood'),
      subtitle: t('melamine_plywood_desc'),
      cta: t('explore_products'),
      link: '/products/melamine-plywood'
    },
    {
      src: imageConfig.products.veneer.mainImage,
      title: t('veneer'),
      subtitle: t('veneer_desc'),
      cta: t('explore_products'),
      link: '/products/veneer'
    },
    ...getRandomFactoryImages(3).map((image, index) => ({
      src: image,
      title: t('our_facilities') || 'Our Facilities',
      subtitle: t('state_of_art_facilities') || 'State-of-the-art production facilities in Cameroon',
      cta: t('schedule_tour'),
      link: '/visit'
    }))
  ];
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };
  
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
      {/* Hero Carousel Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden h-[50vh] min-h-[350px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentSlide].src}
              alt={heroImages[currentSlide].title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.parentElement!.classList.add('bg-gradient-to-b', 'from-sage-green', 'to-white');
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
                      {t('welcome_to')}
                    </h1>
                    <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-sage-green">
                      {t('company_name')}
                    </h2>
                    <p className="text-xl lg:text-2xl mb-2 opacity-90">
                      {t('company_subtitle')}
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-8"
                  >
                    <h3 className="text-2xl font-bold mb-2 text-light-green">
                      {heroImages[currentSlide].title}
                    </h3>
                    <p className="text-lg mb-6 opacity-90">
                      {heroImages[currentSlide].subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        to={heroImages[currentSlide].link}
                        className="inline-flex items-center px-8 py-4 bg-forest-green text-white rounded-lg font-semibold hover:bg-dark-green transform hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        {heroImages[currentSlide].cta}
                        <ArrowRightIcon className="w-5 h-5 ml-2" />
                      </Link>
                      <Link
                        to="/contact"
                        className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur text-white rounded-lg font-semibold hover:bg-white/30 transition-all duration-300"
                      >
                        {t('nav_contact')}
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full p-3 transition-all duration-300"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full p-3 transition-all duration-300"
        >
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </button>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </motion.section>

      {/* Company Introduction */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        <h2 className="text-3xl font-bold text-forest-green mb-4">
          {t('company_description')}
        </h2>
        <p className="text-xl text-gray-700 max-w-4xl mx-auto">
          {t('hero_description')}
        </p>
      </motion.section>

      {/* Features Grid */}
      <section className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
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
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { name: t('plywood'), emoji: '🪵' },
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
        className="bg-gradient-to-b from-leaf-green to-white rounded-2xl p-8 text-gray-800 text-center"
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
            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-gray-800 text-gray-800 rounded-lg font-bold hover:bg-gray-800 hover:text-white transition-all duration-300"
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
        className="bg-gradient-to-r from-wood-light to-wood-medium rounded-2xl p-8 text-gray-800"
      >
        <div className="grid lg:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-lg font-bold mb-2">{t('call_us')} / WhatsApp</h3>
            <div className="space-y-2">
              <div>
                <a href="tel:+2376948823693" className="block text-lg font-semibold hover:text-forest-green transition-colors">
                  +237-694-88-2369
                </a>
                <p className="text-xs opacity-75">📞 Call or 💬 WhatsApp</p>
              </div>
              <div>
                <a href="tel:+2376918416173" className="block text-lg font-semibold hover:text-forest-green transition-colors">
                  +237-691-84-1617
                </a>
                <p className="text-xs opacity-75">📞 Call or 💬 WhatsApp</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">{t('email_us')}</h3>
            <a href="mailto:roilux.woods@gmail.com" className="hover:text-forest-green transition-colors">
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