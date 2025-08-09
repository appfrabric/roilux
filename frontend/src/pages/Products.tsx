import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Products: React.FC = () => {
  const productCategories = [
    {
      id: 'plywood',
      title: 'Plywood',
      description: 'Premium, marine, and structural plywood from 1mm to 3cm thick',
      woods: ['Okoume', 'Acajou (Mahogany)', 'Ayous', 'Sapele'],
      image: '/api/images/plywood-main.jpg',
      path: '/products/plywood',
    },
    {
      id: 'melamine',
      title: 'Prefinished Melamine',
      description: 'Various colors with custom color requests supported',
      woods: [],
      image: '/api/images/melamine-main.jpg',
      path: '/products/melamine',
    },
    {
      id: 'melamine-plywood',
      title: 'Prefinished Melamine Plywood',
      description: 'High-quality melamine-faced plywood in various finishes',
      woods: [],
      image: '/api/images/melamine-plywood-main.jpg',
      path: '/products/melamine-plywood',
    },
    {
      id: 'veneer',
      title: 'Wood Veneer',
      description: 'Different thicknesses, all types of Cameroon wood',
      woods: ['Okoume', 'Acajou', 'Ayous', 'Sapele', 'And more'],
      image: '/api/images/veneer-main.jpg',
      path: '/products/veneer',
    },
    {
      id: 'logs',
      title: 'Raw Wood Logs',
      description: 'High-quality raw logs from sustainable sources',
      woods: [],
      image: '/api/images/logs-main.jpg',
      path: '/products/logs',
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
          Our Products
        </h1>
        <p className="text-xl text-gray-700 mb-4">
          Discover our comprehensive range of high-quality wood products from Cameroon
        </p>
        
        <div className="bg-gradient-to-b from-leaf-green to-white rounded-lg p-6 text-white mb-8">
          <h2 className="text-2xl font-semibold mb-3">Our Guarantee</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>We can ship samples for quality verification</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Visit our factories for in-person inspection</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Immediate production capability</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Capacity of over 50 40ft containers per month</span>
            </li>
          </ul>
        </div>
      </motion.section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <div className="h-48 bg-gradient-to-br from-wood-light to-wood-medium relative overflow-hidden">
              <div className="absolute inset-0 wood-texture opacity-30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl opacity-50">
                  {category.id === 'plywood' && '🪵'}
                  {category.id === 'melamine' && '✨'}
                  {category.id === 'melamine-plywood' && '🎨'}
                  {category.id === 'veneer' && '🌳'}
                  {category.id === 'logs' && '🪓'}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-forest-green mb-3">
                {category.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {category.description}
              </p>
              
              {category.woods.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Available Woods:</p>
                  <div className="flex flex-wrap gap-2">
                    {category.woods.map((wood) => (
                      <span
                        key={wood}
                        className="px-3 py-1 bg-light-green bg-opacity-30 text-forest-green rounded-full text-sm"
                      >
                        {wood}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <Link
                to={category.path}
                className="inline-flex items-center px-4 py-2 bg-dark-green text-white rounded-lg hover:bg-forest-green transition-colors duration-300"
              >
                View Gallery
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Products;