import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Product {
  id: string;
  title: string;
  description: string;
  images: string[];
  specifications?: { [key: string]: string | undefined };
}

const ProductCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample product data - in production, this would come from your backend
  const getCategoryData = () => {
    switch (category) {
      case 'plywood':
        return {
          title: 'Plywood',
          description: 'Premium quality plywood available in various thicknesses and wood types',
          products: [
            {
              id: 'premium-plywood',
              title: 'Premium Plywood',
              description: 'High-grade plywood for furniture and construction',
              images: ['/api/images/plywood-1.jpg', '/api/images/plywood-2.jpg'],
              specifications: {
                'Thickness': '1mm - 30mm',
                'Sizes': 'Standard and custom',
                'Wood Types': 'Okoume, Acajou, Ayous, Sapele',
              },
            },
            {
              id: 'marine-plywood',
              title: 'Marine Plywood',
              description: 'Water-resistant plywood for marine applications',
              images: ['/api/images/marine-1.jpg', '/api/images/marine-2.jpg'],
              specifications: {
                'Thickness': '6mm - 25mm',
                'Water Resistance': 'High',
                'Applications': 'Boats, outdoor furniture',
              },
            },
            {
              id: 'structural-plywood',
              title: 'Structural Plywood',
              description: 'Strong plywood for construction use',
              images: ['/api/images/structural-1.jpg', '/api/images/structural-2.jpg'],
              specifications: {
                'Thickness': '9mm - 30mm',
                'Strength': 'High load-bearing capacity',
                'Applications': 'Construction, flooring',
              },
            },
          ],
        };
      case 'melamine':
        return {
          title: 'Prefinished Melamine',
          description: 'Wide range of colors and finishes with custom options available',
          products: [
            {
              id: 'white-melamine',
              title: 'White Melamine',
              description: 'Classic white finish for modern interiors',
              images: ['/api/images/melamine-white-1.jpg'],
              specifications: {
                'Finish': 'Smooth matte',
                'Thickness': 'Various',
                'Custom Colors': 'Available on request',
              },
            },
            {
              id: 'wood-grain-melamine',
              title: 'Wood Grain Melamine',
              description: 'Natural wood appearance with melamine durability',
              images: ['/api/images/melamine-wood-1.jpg'],
              specifications: {
                'Patterns': 'Oak, Walnut, Cherry, and more',
                'Texture': 'Embossed wood grain',
              },
            },
          ],
        };
      case 'veneer':
        return {
          title: 'Wood Veneer',
          description: 'Natural wood veneers in various species and thicknesses',
          products: [
            {
              id: 'okoume-veneer',
              title: 'Okoume Veneer',
              description: 'Light, uniform grain veneer',
              images: ['/api/images/veneer-okoume-1.jpg'],
              specifications: {
                'Thickness': '0.3mm - 3mm',
                'Grade': 'A, B, C available',
              },
            },
            {
              id: 'sapele-veneer',
              title: 'Sapele Veneer',
              description: 'Rich mahogany-like appearance',
              images: ['/api/images/veneer-sapele-1.jpg'],
              specifications: {
                'Thickness': '0.3mm - 3mm',
                'Pattern': 'Straight and figured grain',
              },
            },
          ],
        };
      case 'logs':
        return {
          title: 'Raw Wood Logs',
          description: 'Sustainably sourced raw logs from Cameroon forests',
          products: [
            {
              id: 'raw-logs',
              title: 'Various Species',
              description: 'High-quality logs for processing',
              images: ['/api/images/logs-1.jpg'],
              specifications: {
                'Species': 'Okoume, Sapele, Ayous, and more',
                'Length': 'Standard and custom cuts',
                'Certification': 'Sustainable forestry certified',
              },
            },
          ],
        };
      default:
        return null;
    }
  };

  const categoryData = getCategoryData();

  if (!categoryData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl text-gray-600">Category not found</h2>
        <Link to="/products" className="text-forest-green hover:underline mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleNextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) =>
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    }
  };

  const closeGallery = () => {
    setSelectedProduct(null);
    setCurrentImageIndex(0);
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
          className="inline-flex items-center text-forest-green hover:text-forest-green mb-4"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          Back to Products
        </Link>
        
        <h1 className="text-4xl font-bold text-forest-green mb-4">
          {categoryData.title}
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          {categoryData.description}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryData.products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div
              className="h-48 bg-gradient-to-br from-wood-light to-wood-medium cursor-pointer relative group"
              onClick={() => {
                setSelectedProduct(product);
                setCurrentImageIndex(0);
              }}
            >
              <div className="absolute inset-0 wood-texture opacity-30"></div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to view gallery
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-forest-green mb-2">
                {product.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {product.description}
              </p>
              
              {product.specifications && (
                <div className="space-y-2">
                  {Object.entries(product.specifications)
                    .filter(([_, value]) => value !== undefined)
                    .map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="font-semibold text-gray-700">{key}:</span>{' '}
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                </div>
              )}
              
              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setCurrentImageIndex(0);
                }}
                className="mt-4 px-4 py-2 bg-dark-green text-white rounded-lg hover:bg-forest-green transition-colors duration-300"
              >
                View Gallery
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeGallery}
                className="absolute -top-12 right-0 text-white hover:text-gray-300"
              >
                <XMarkIcon className="w-8 h-8" />
              </button>
              
              <div className="relative bg-white rounded-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <div className="flex items-center justify-center h-96">
                    <img
                      src={selectedProduct.images[currentImageIndex]}
                      alt={selectedProduct.title}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjIwMCIgeT0iMTUwIiBzdHlsZT0iZmlsbDojOTk5O2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjIwcHg7Zm9udC1mYW1pbHk6QXJpYWwsc2Fucy1zZXJpZiI+SW1hZ2UgUGxhY2Vob2xkZXI8L3RleHQ+PC9zdmc+';
                      }}
                    />
                  </div>
                </div>
                
                {selectedProduct.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100"
                    >
                      <ChevronLeftIcon className="w-6 h-6 text-forest-green" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100"
                    >
                      <ChevronRightIcon className="w-6 h-6 text-forest-green" />
                    </button>
                  </>
                )}
                
                <div className="p-4 bg-white">
                  <h3 className="text-xl font-bold text-forest-green">
                    {selectedProduct.title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {selectedProduct.description}
                  </p>
                  {selectedProduct.images.length > 1 && (
                    <div className="mt-4 flex justify-center space-x-2">
                      {selectedProduct.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full ${
                            index === currentImageIndex
                              ? 'bg-dark-green'
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductCategory;