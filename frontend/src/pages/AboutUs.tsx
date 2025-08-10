import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { XMarkIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { getRandomFactoryImages, imageConfig } from '../config/imageConfig';

const AboutUs: React.FC = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCertification, setShowCertification] = useState<boolean>(false);
  
  // Get random factory images for visual appeal
  const factoryHighlights = getRandomFactoryImages(6);
  const certificationImage = imageConfig.certifications[1]; // logo.jpg from certifications
  
  const values = [
    {
      title: t('quality_excellence'),
      description: t('quality_excellence_desc'),
      icon: '⭐',
    },
    {
      title: t('sustainable_practices'),
      description: t('sustainable_practices_desc'),
      icon: '🌱',
    },
    {
      title: t('customer_focus'),
      description: t('customer_focus_desc'),
      icon: '🤝',
    },
    {
      title: t('global_reach'),
      description: t('global_reach_desc'),
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
        <h1 className="text-4xl lg:text-5xl font-bold text-forest-green mb-6">
          {t('about_tropical_wood')}
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          {t('company_subtitle')}
        </p>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <p className="text-lg text-gray-700 mb-4">
            {t('about_description_1')}
          </p>
          <p className="text-lg text-gray-700 mb-4">
            {t('about_description_2')}
          </p>
          <p className="text-lg text-gray-700">
            {t('about_description_3')}
          </p>
        </div>
      </motion.section>

      {/* Company Gallery */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-forest-green mb-6">
          {t('our_company') || 'Our Company'}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {factoryHighlights.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`Company facility ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.classList.add('bg-gradient-to-br', 'from-wood-light', 'to-wood-medium');
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold">
                  {t('click_to_view') || 'Click to view'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-forest-green mb-8"
        >
          {t('our_values')}
        </motion.h2>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-leaf-green to-white rounded-xl p-6 text-gray-800"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-700 opacity-90">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg p-8 mb-8"
      >
        <h2 className="text-3xl font-bold text-forest-green mb-6">
          {t('certifications') || 'Certifications & Quality Assurance'}
        </h2>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-semibold text-forest-green mb-4">
              {t('our_certifications') || 'Our Certifications'}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <DocumentTextIcon className="w-5 h-5 text-leaf-green mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">{t('forest_ministry_auth') || 'Cameroon Forest Ministry Authorization'}</span>
                  <p className="text-gray-600 text-sm mt-1">
                    {t('forest_auth_desc') || 'Official authorization for sustainable wood harvesting and processing'}
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <DocumentTextIcon className="w-5 h-5 text-leaf-green mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">{t('iso_compliance') || 'ISO Quality Standards'}</span>
                  <p className="text-gray-600 text-sm mt-1">
                    {t('iso_desc') || 'Compliance with international quality management standards'}
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <DocumentTextIcon className="w-5 h-5 text-leaf-green mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">{t('export_license') || 'Export License'}</span>
                  <p className="text-gray-600 text-sm mt-1">
                    {t('export_desc') || 'Authorized for international wood product exports'}
                  </p>
                </div>
              </li>
            </ul>
            <button
              onClick={() => setShowCertification(true)}
              className="mt-6 inline-flex items-center px-6 py-3 bg-forest-green text-white rounded-lg font-semibold hover:bg-dark-green transition-colors duration-300"
            >
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              {t('view_certification') || 'View Certification'}
            </button>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-br from-sage-green to-light-green rounded-xl p-8">
              <div className="text-4xl mb-4">🏆</div>
              <h4 className="text-xl font-bold text-forest-green mb-2">
                {t('trusted_partner') || 'Trusted Partner'}
              </h4>
              <p className="text-gray-700">
                {t('trusted_desc') || 'Certified and trusted by businesses worldwide for quality wood products'}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-gradient-to-b from-wood-light to-wood-medium rounded-2xl p-8 text-gray-800"
      >
        <h2 className="text-3xl font-bold mb-6">{t('why_choose_us')}</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">{t('production_capacity')}</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('over_50_containers')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('immediate_production')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('custom_sizing')}</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">{t('about_quality_assurance')}</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('sample_shipping')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('factory_visits')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('certified_practices')}</span>
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
            {t('experience_difference')}
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            {t('satisfied_customers')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/products"
              className="px-6 py-3 bg-forest-green text-white rounded-lg font-semibold hover:bg-dark-green transition-colors duration-300"
            >
              {t('explore_products_btn')}
            </a>
            <a
              href="/visit"
              className="px-6 py-3 bg-transparent border-2 border-forest-green text-forest-green rounded-lg font-semibold hover:bg-forest-green hover:text-white transition-all duration-300"
            >
              {t('visit_factory')}
            </a>
          </div>
        </motion.div>
      </section>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300"
              >
                <XMarkIcon className="w-10 h-10" />
              </button>
              <img
                src={selectedImage}
                alt="Company facility"
                className="w-full h-auto max-h-[80vh] object-contain mx-auto rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certification Modal */}
      <AnimatePresence>
        {showCertification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCertification(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCertification(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              >
                <XMarkIcon className="w-8 h-8" />
              </button>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-forest-green mb-4">
                  {t('forest_ministry_auth') || 'Cameroon Forest Ministry Authorization'}
                </h3>
                <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8 mb-6">
                  <img
                    src={certificationImage}
                    alt="Certification logo"
                    className="max-h-32 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.parentElement!.innerHTML = `
                        <div class="text-center text-gray-500">
                          <DocumentTextIcon class="w-16 h-16 mx-auto mb-4" />
                          <p>Official Certification Document</p>
                        </div>
                      `;
                    }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-gray-700 mb-4">
                    {t('certification_description') || 'This certification authorizes Tropical Wood to sustainably harvest, process, and export wood products from Cameroon, ensuring compliance with all environmental and quality standards.'}
                  </p>
                  <div className="bg-sage-green bg-opacity-20 rounded-lg p-4">
                    <p className="text-forest-green font-semibold mb-2">
                      {t('certification_includes') || 'This certification includes:'}
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• {t('sustainable_harvesting') || 'Sustainable forest management practices'}</li>
                      <li>• {t('quality_standards') || 'International quality control standards'}</li>
                      <li>• {t('environmental_compliance') || 'Environmental protection compliance'}</li>
                      <li>• {t('export_authorization') || 'International export authorization'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutUs;