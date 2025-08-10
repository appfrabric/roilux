import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { getProductImages } from '../config/imageConfig';

const ProductCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { t } = useTranslation();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Get images from config
  const productImages = getProductImages(category || '');

  if (!productImages) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl text-gray-600">{t('category_not_found') || 'Category not found'}</h2>
        <Link to="/products" className="text-forest-green hover:underline mt-4 inline-block">
          {t('back_to_products') || 'Back to Products'}
        </Link>
      </div>
    );
  }

  const getCategoryTitle = () => {
    switch (category) {
      case 'plywood':
        return 'Plywood';
      case 'melamine-plywood':
        return 'Melamine Plywood';
      case 'veneer':
        return 'Wood Veneer';
      case 'logs':
        return 'Raw Wood Logs';
      default:
        return category;
    }
  };

  const getCategoryDescription = () => {
    switch (category) {
      case 'plywood':
        return 'High-quality plywood for construction, marine applications, and furniture manufacturing';
      case 'melamine-plywood':
        return 'Premium melamine-faced plywood perfect for modern furniture and interior design';
      case 'veneer':
        return 'Beautiful wood veneer sheets in various species and cuts for fine woodworking';
      case 'logs':
        return 'Sustainably sourced raw hardwood logs from Cameroon forests';
      default:
        return '';
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === productImages.galleryImages.length - 1 ? 0 : selectedImageIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? productImages.galleryImages.length - 1 : selectedImageIndex - 1
      );
    }
  };

  const closeGallery = () => {
    setSelectedImageIndex(null);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/products"
          className="inline-flex items-center text-forest-green hover:text-dark-green mb-4"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          {t('back_to_products') || 'Back to Products'}
        </Link>
        
        <h1 className="text-4xl font-bold text-forest-green mb-4">
          {getCategoryTitle()}
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          {getCategoryDescription()}
        </p>
      </motion.div>

      {/* Main Product Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="relative h-96">
          <img
            src={productImages.mainImage}
            alt={getCategoryTitle()}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjIwMCIgeT0iMTUwIiBzdHlsZT0iZmlsbDojOTk5O2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjIwcHg7Zm9udC1mYW1pbHk6QXJpYWwsc2Fucy1zZXJpZiI+SW1hZ2UgUGxhY2Vob2xkZXI8L3RleHQ+PC9zdmc+';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
              {getCategoryTitle()}
            </h2>
            <p className="text-white text-lg drop-shadow">
              {t('gallery_images_count', { count: productImages.galleryImages.length }) || 
               `${productImages.galleryImages.length} images available`}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-forest-green">
          Product Gallery
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {productImages.galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer group"
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={image}
                alt={`${getCategoryTitle()} ${index + 1}`}
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
      </div>

      {/* Product Information */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-forest-green mb-4">
          Product Details
        </h3>
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-lg mb-2">Specifications</h4>
            {category === 'plywood' && (
              <ul className="space-y-2 text-gray-700">
                <li>• Thickness: 1mm - 30mm</li>
                <li>• Wood Types: Okoume, Acajou, Ayous, Sapele</li>
                <li>• Grades: Premium, Marine, Structural</li>
                <li>• Sizes: Standard and custom</li>
              </ul>
            )}
            {category === 'melamine-plywood' && (
              <ul className="space-y-2 text-gray-700">
                <li>• {t('base_material') || 'Base'}: High-quality plywood</li>
                <li>• {t('surface') || 'Surface'}: Melamine laminate</li>
                <li>• {t('patterns') || 'Patterns'}: Solid colors and wood grains</li>
                <li>• {t('applications') || 'Applications'}: Furniture, cabinetry</li>
              </ul>
            )}
            {category === 'veneer' && (
              <ul className="space-y-2 text-gray-700">
                <li>• {t('thickness') || 'Thickness'}: 0.3mm - 3mm</li>
                <li>• {t('species') || 'Species'}: All Cameroon wood types</li>
                <li>• {t('grades') || 'Grades'}: A, B, C available</li>
                <li>• {t('cuts') || 'Cuts'}: Rotary, quarter, and flat cut</li>
              </ul>
            )}
            {category === 'logs' && (
              <ul className="space-y-2 text-gray-700">
                <li>• {t('species') || 'Species'}: Various Cameroon hardwoods</li>
                <li>• {t('certification') || 'Certification'}: Sustainable forestry</li>
                <li>• {t('lengths') || 'Lengths'}: Standard and custom</li>
                <li>• {t('quality') || 'Quality'}: Export grade</li>
              </ul>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2">Why Choose This Product</h4>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Quality guaranteed</li>
              <li>✓ Samples available</li>
              <li>✓ Custom orders accepted</li>
              <li>✓ Bulk discounts available</li>
              <li>✓ Fast international shipping</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-leaf-green to-forest-green rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">
          {t('interested_in_product') || 'Interested in this product?'}
        </h3>
        <p className="mb-6">
          {t('contact_for_quote') || 'Contact us for samples, pricing, and custom orders'}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="px-6 py-3 bg-white text-forest-green rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {t('get_quote') || 'Get a Quote'}
          </Link>
          <a
            href="https://wa.me/2376948823693"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-forest-green transition-all"
          >
            {t('whatsapp_us') || 'WhatsApp Us'}
          </a>
        </div>
      </div>

      {/* Lightbox Gallery Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeGallery}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
              >
                <XMarkIcon className="w-10 h-10" />
              </button>
              
              <div className="relative">
                <img
                  src={productImages.galleryImages[selectedImageIndex]}
                  alt={`${getCategoryTitle()} ${selectedImageIndex + 1}`}
                  className="w-full h-auto max-h-[80vh] object-contain mx-auto"
                />
                
                {productImages.galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur rounded-full p-3 transition-all"
                    >
                      <ChevronLeftIcon className="w-8 h-8 text-white" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur rounded-full p-3 transition-all"
                    >
                      <ChevronRightIcon className="w-8 h-8 text-white" />
                    </button>
                  </>
                )}
                
                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 backdrop-blur px-4 py-2 rounded-full">
                  <span className="text-white text-sm">
                    {selectedImageIndex + 1} / {productImages.galleryImages.length}
                  </span>
                </div>
              </div>
              
              {/* Thumbnail navigation */}
              {productImages.galleryImages.length > 1 && (
                <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-2">
                  {productImages.galleryImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition-all ${
                        index === selectedImageIndex
                          ? 'border-white opacity-100'
                          : 'border-transparent opacity-50 hover:opacity-75'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductCategory;