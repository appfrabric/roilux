import React from 'react';
import { motion } from 'framer-motion';

const AboutUs: React.FC = () => {
  const values = [
    {
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in wood selection and processing',
      icon: '⭐',
    },
    {
      title: 'Sustainable Practices',
      description: 'Committed to responsible forestry and environmental protection',
      icon: '🌱',
    },
    {
      title: 'Customer Focus',
      description: 'Your satisfaction is our top priority',
      icon: '🤝',
    },
    {
      title: 'Global Reach',
      description: 'Serving customers worldwide with reliable shipping',
      icon: '🌍',
    },
  ];

  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-forest-green mb-6">
          About Tropical Wood
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          A division of Roilux
        </p>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Tropical Wood, a division of Roilux, is a leading supplier of premium wood products from Cameroon, 
            specializing in plywood, melamine, veneers, and raw logs. With years of 
            experience in the timber industry, we have established ourselves as a 
            trusted partner for businesses worldwide.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Our state-of-the-art facilities and skilled craftsmen ensure that every 
            product meets the highest quality standards. We pride ourselves on our 
            ability to deliver custom solutions tailored to our clients' specific needs.
          </p>
          <p className="text-lg text-gray-700">
            From sustainable sourcing to timely delivery, we manage every aspect of 
            the supply chain to provide you with exceptional wood products that exceed 
            expectations.
          </p>
        </div>
      </motion.section>

      <section>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-forest-green mb-8"
        >
          Our Values
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-leaf-green to-white rounded-xl p-6 text-white"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-white text-opacity-90">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-gradient-to-b from-wood-light to-wood-medium rounded-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold mb-6">Why Choose Tropical Wood?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Production Capacity</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Over 50 containers monthly capacity</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Immediate production capability</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Custom sizing and specifications</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Sample shipping available</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Factory visits welcomed</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Certified sustainable practices</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      <section className="text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-forest-green mb-4">
            Experience the Tropical Wood Difference
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Join hundreds of satisfied customers who trust Tropical Wood for their timber needs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/products"
              className="px-6 py-3 bg-dark-green text-white rounded-lg font-semibold hover:bg-forest-green transition-colors duration-300"
            >
              Explore Products
            </a>
            <a
              href="/visit"
              className="px-6 py-3 bg-transparent border-2 border-forest-green text-forest-green rounded-lg font-semibold hover:bg-dark-green hover:text-white transition-all duration-300"
            >
              Visit Our Factory
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;