import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlayIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon, EyeIcon, CogIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { imageConfig } from '../config/imageConfig';

const VisitCompany: React.FC = () => {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [currentGallery, setCurrentGallery] = useState<string>('facility');

  // Professional video titles and descriptions - Only 3 videos now
  const factoryVideos = imageConfig.factory.videos.slice(0, 3).map((_video, index) => ({
    id: index + 1,
    title: [
      t('virtual_experience') || 'Virtual Experience',
      t('behind_the_scenes') || 'Behind the Scenes', 
      t('production_mastery') || 'Production Mastery'
    ][index] || `${t('facility_tour')} ${index + 1}`,
    description: [
      'Take a comprehensive virtual tour of our modern facilities',
      'See our rigorous quality control processes in action', // Quality Excellence content for Behind the Scenes
      'Witness our advanced production techniques and precision' // Behind the Scenes content for Production Mastery
    ][index] || 'Explore our world-class manufacturing facility',
    src: [
      imageConfig.factory.videos[0], // Virtual Experience
      imageConfig.factory.videos[3], // Quality Excellence video for Behind the Scenes
      imageConfig.factory.videos[1]  // Behind the Scenes video for Production Mastery
    ][index],
    thumbnail: `/assets/factoty-picture/fp${Math.min(index + 1, 3)}.jpg`,
    icon: [EyeIcon, ShieldCheckIcon, CogIcon][index] || EyeIcon
  }));

  // Elegant gallery categories
  const galleries = {
    facility: {
      title: t('facility_tour') || 'Facility Tour',
      subtitle: 'Discover our modern manufacturing space',
      images: imageConfig.factory.pictures,
      icon: '🏭',
      color: 'from-light-green to-white'
    },
    production: {
      title: t('manufacturing_process') || 'Manufacturing Process',
      subtitle: 'Step-by-step wood transformation journey',
      images: imageConfig.factory.productionProcess.slice(0, 20),
      icon: '⚙️',
      color: 'from-sage-green to-light-green'
    },
    equipment: {
      title: t('equipment_showcase') || 'Equipment Showcase',
      subtitle: 'State-of-the-art machinery and tools',
      images: imageConfig.factory.processingEquipment.slice(0, 15),
      icon: '🔧',
      color: 'from-wood-light to-sage-green'
    },
    quality: {
      title: t('quality_assurance') || 'Quality Assurance',
      subtitle: 'Rigorous testing and inspection processes',
      images: imageConfig.factory.qualityControl,
      icon: '✅',
      color: 'from-light-green via-white to-wood-light'
    }
  };

  const currentGalleryData = galleries[currentGallery as keyof typeof galleries];

  const handleNextImage = () => {
    if (selectedImageIndex !== null && currentGalleryData) {
      setSelectedImageIndex(
        selectedImageIndex === currentGalleryData.images.length - 1 ? 0 : selectedImageIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null && currentGalleryData) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? currentGalleryData.images.length - 1 : selectedImageIndex - 1
      );
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-sage-green mb-6">
          {t('nav_visit') || 'Visit Our Company'}
        </h1>
        <p className="text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
          {t('factory_tour_description') || 'Experience the artistry of wood craftsmanship through our immersive virtual tours and detailed facility showcases.'}
        </p>
        
        <div className="bg-gradient-to-r from-light-green via-sage-green to-wood-light rounded-3xl p-12 text-gray-800 shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">{t('schedule_your_visit') || 'Schedule Your Visit'}</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            {t('visit_welcome_message') || 'Whether you prefer an in-person visit or a virtual tour, we invite you to explore our world-class facilities and witness excellence in wood manufacturing.'}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/visit/virtual-tour"
              className="inline-flex items-center px-10 py-4 bg-white text-sage-green rounded-2xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <EyeIcon className="w-6 h-6 mr-3" />
              {t('schedule_virtual_tour') || 'Schedule Virtual Tour'}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-10 py-4 bg-white/20 backdrop-blur text-gray-800 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all duration-300 border-2 border-gray-800/30"
            >
              {t('contact_us') || 'Contact Us'}
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Video Experience Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-sage-green mb-4">
            {t('virtual_experience') || 'Virtual Experience'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Immerse yourself in our manufacturing excellence through these carefully curated video experiences
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {factoryVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(video.src)}
            >
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                {/* Video Thumbnail */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.parentElement!.classList.add('bg-gradient-to-br', 'from-wood-light', 'to-wood-medium');
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur rounded-full p-6 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                      <PlayIcon className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-sage-green rounded-full p-3">
                      <video.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-sage-green mb-3 group-hover:text-light-green transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {video.description}
                  </p>
                  <div className="mt-4 flex items-center text-sage-green font-semibold">
                    <span>{t('click_to_play') || 'Click to play'}</span>
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Gallery Section */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-sage-green mb-4">
            {t('behind_the_scenes') || 'Behind the Scenes'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore different aspects of our operations through our comprehensive image galleries
          </p>
        </div>
        
        {/* Gallery Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(galleries).map(([key, gallery]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentGallery(key)}
              className={`relative p-8 rounded-2xl text-gray-800 font-bold text-center transition-all duration-300 ${
                currentGallery === key
                  ? `bg-gradient-to-br ${gallery.color} shadow-2xl scale-105`
                  : 'bg-wood-light hover:bg-sage-green hover:text-white shadow-lg'
              }`}
            >
              <div className="text-4xl mb-4">{gallery.icon}</div>
              <h3 className="text-xl font-bold mb-2">{gallery.title}</h3>
              <p className="text-sm opacity-90">{gallery.images.length} images</p>
              {currentGallery === key && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-white text-sage-green rounded-full w-8 h-8 flex items-center justify-center"
                >
                  ✓
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Selected Gallery Display */}
        <motion.div
          key={currentGallery}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Gallery Header */}
          <div className={`bg-gradient-to-r ${currentGalleryData.color} p-8 text-gray-800 text-center`}>
            <div className="text-5xl mb-4">{currentGalleryData.icon}</div>
            <h3 className="text-3xl font-bold mb-2">{currentGalleryData.title}</h3>
            <p className="text-xl opacity-90">{currentGalleryData.subtitle}</p>
            <div className="mt-4 inline-block bg-white/30 backdrop-blur rounded-full px-4 py-2 text-gray-700">
              {currentGalleryData.images.length} images available
            </div>
          </div>
          
          {/* Gallery Grid */}
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentGalleryData.images.map((image, index) => (
                <motion.div
                  key={`${currentGallery}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  whileHover={{ scale: 1.08, rotate: 1 }}
                  className="relative aspect-square overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${currentGalleryData.title} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-120"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.classList.add('bg-gradient-to-br', 'from-gray-200', 'to-gray-300');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm font-semibold">#{index + 1}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white/20 backdrop-blur rounded-full p-3">
                      <EyeIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Capabilities & Information */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-gradient-to-br from-light-green via-sage-green to-wood-light rounded-3xl p-12 text-gray-800"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">World-Class Facilities</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Our commitment to excellence is reflected in every aspect of our operations
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: '🏭',
              title: 'Modern Infrastructure',
              points: ['50+ containers monthly capacity', 'Climate-controlled facilities', 'Advanced safety systems']
            },
            {
              icon: '⚙️',
              title: 'Cutting-Edge Equipment',
              points: ['Precision manufacturing tools', 'Automated quality systems', 'Sustainable technologies']
            },
            {
              icon: '👥',
              title: 'Expert Team',
              points: ['Skilled craftsmen', 'Quality assurance specialists', 'International experience']
            },
            {
              icon: '🌍',
              title: 'Global Standards',
              points: ['ISO compliance', 'Export certifications', 'Environmental responsibility']
            },
            {
              icon: '🎯',
              title: 'Custom Solutions',
              points: ['Tailored specifications', 'Flexible production', 'Client collaboration']
            },
            {
              icon: '🚚',
              title: 'Logistics Excellence',
              points: ['Worldwide shipping', 'Secure packaging', 'Timely delivery']
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/20 backdrop-blur rounded-2xl p-6"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <ul className="space-y-2">
                {item.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-center">
                    <span className="mr-2 text-sage-green">✓</span>
                    <span className="opacity-90">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold mb-6">Ready to Experience Our Facilities?</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/contact"
              className="inline-flex items-center px-10 py-4 bg-white text-sage-green rounded-2xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Schedule In-Person Visit
            </Link>
            <Link
              to="/visit/virtual-tour"
              className="inline-flex items-center px-10 py-4 bg-white/20 backdrop-blur text-gray-800 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all duration-300 border-2 border-gray-800/30"
            >
              <EyeIcon className="w-6 h-6 mr-3" />
              Virtual Tour
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <XMarkIcon className="w-10 h-10" />
              </button>
              <video
                controls
                autoPlay
                className="w-full rounded-2xl shadow-2xl"
                src={selectedVideo}
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && currentGalleryData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-7xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute -top-16 right-0 text-white hover:text-gray-300 z-10"
              >
                <XMarkIcon className="w-12 h-12" />
              </button>
              
              <div className="relative">
                <img
                  src={currentGalleryData.images[selectedImageIndex]}
                  alt={`${currentGalleryData.title} ${selectedImageIndex + 1}`}
                  className="w-full h-auto max-h-[85vh] object-contain mx-auto rounded-xl shadow-2xl"
                />
                
                {currentGalleryData.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full p-4 transition-all"
                    >
                      <ChevronLeftIcon className="w-8 h-8 text-white" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full p-4 transition-all"
                    >
                      <ChevronRightIcon className="w-8 h-8 text-white" />
                    </button>
                  </>
                )}
                
                {/* Image info overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur px-6 py-3 rounded-full text-center">
                  <p className="text-white font-semibold mb-1">{currentGalleryData.title}</p>
                  <p className="text-white/80 text-sm">
                    {selectedImageIndex + 1} of {currentGalleryData.images.length}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VisitCompany;