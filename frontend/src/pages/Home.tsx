import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  const features = [
    {
      title: 'Premium Quality',
      description: 'Finest wood products from Cameroon forests',
      icon: '🌲',
    },
    {
      title: 'Custom Solutions',
      description: 'Tailored to your specific requirements',
      icon: '📐',
    },
    {
      title: 'Fast Production',
      description: '50+ containers monthly capacity',
      icon: '🚚',
    },
    {
      title: 'Global Shipping',
      description: 'Worldwide delivery available',
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
            Welcome to
          </h1>
          <h2 className="text-6xl md:text-7xl font-bold mb-2 animate-fade-in">
            Tropical Wood
          </h2>
          <p className="text-2xl mb-6 opacity-90 font-medium">
            A division of Roilux
          </p>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            Your premier source for high-quality wood products from Cameroon. 
            From premium plywood to custom veneers, we deliver excellence worldwide.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-forest-green text-white rounded-lg font-semibold hover:bg-leaf-green transition-colors duration-300"
            >
              Explore Products
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/visit/virtual-tour"
              className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-forest-green text-forest-green rounded-lg font-semibold hover:bg-forest-green hover:text-white transition-all duration-300"
            >
              Schedule Virtual Tour
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
          Our Product Categories
        </motion.h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: 'Plywood', emoji: '🪵' },
            { name: 'Melamine', emoji: '✨' },
            { name: 'Melamine Plywood', emoji: '🎨' },
            { name: 'Wood Veneer', emoji: '🌳' },
            { name: 'Raw Logs', emoji: '🪓' },
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
        <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
        <p className="text-xl mb-6">
          We can ship samples and guarantee quality production
        </p>
        <Link
          to="/products"
          className="inline-flex items-center px-8 py-4 bg-white text-forest-green rounded-lg font-bold hover:bg-cream transition-colors duration-300"
        >
          View Our Products
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </Link>
      </motion.section>
    </div>
  );
};

export default Home;