import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { imageConfig } from '../config/imageConfig';

const Products: React.FC = () => {
  const { t } = useTranslation();
  const productCategories = [
    {
      id: 'plywood',
      title: t('plywood'),
      description: t('plywood_desc'),
      woods: ['Okoume', 'Acajou (Mahogany)', 'Ayous', 'Sapele'],
      image: imageConfig.products.plywood.mainImage,
      path: '/products/plywood',
    },
    {
      id: 'melamine-plywood',
      title: t('melamine_plywood'),
      description: t('melamine_plywood_desc'),
      woods: [],
      image: imageConfig.products['melamine-plywood'].mainImage,
      path: '/products/melamine-plywood',
    },
    {
      id: 'veneer',
      title: t('veneer'),
      description: t('veneer_desc'),
      woods: ['Okoume', 'Acajou', 'Ayous', 'Sapele', 'And more'],
      image: imageConfig.products.veneer.mainImage,
      path: '/products/veneer',
    },
    {
      id: 'logs',
      title: t('logs'),
      description: t('logs_desc'),
      woods: [],
      image: imageConfig.products.logs.mainImage,
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
          {t('our_products')}
        </h1>
        <p className="text-xl text-gray-700 mb-4">
          {t('products_description')}
        </p>
        
        <div className="bg-gradient-to-b from-leaf-green to-white rounded-lg p-6 text-gray-800 mb-8">
          <h2 className="text-2xl font-semibold mb-3">{t('our_guarantee')}</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>{t('ship_samples')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>{t('visit_factories')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>{t('immediate_capability')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>{t('monthly_capacity')}</span>
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
            <div className="h-48 relative overflow-hidden">
              <img 
                src={category.image} 
                alt={category.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.classList.add('bg-gradient-to-br', 'from-wood-light', 'to-wood-medium');
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-xl font-bold drop-shadow-lg">
                  {category.title}
                </h3>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                {category.description}
              </p>
              
              {category.woods.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">{t('available_woods')}</p>
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
{t('view_gallery')}
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