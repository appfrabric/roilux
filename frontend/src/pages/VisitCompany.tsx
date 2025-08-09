import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlayIcon } from '@heroicons/react/24/solid';

const VisitCompany: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const factoryImages = [
    { id: 1, title: 'Main Production Floor', src: '/api/images/factory-1.jpg' },
    { id: 2, title: 'Quality Control Station', src: '/api/images/factory-2.jpg' },
    { id: 3, title: 'Wood Storage Facility', src: '/api/images/factory-3.jpg' },
    { id: 4, title: 'Processing Equipment', src: '/api/images/factory-4.jpg' },
    { id: 5, title: 'Finished Products Warehouse', src: '/api/images/factory-5.jpg' },
    { id: 6, title: 'Loading Bay', src: '/api/images/factory-6.jpg' },
  ];

  const factoryVideos = [
    { id: 1, title: 'Factory Tour', thumbnail: '/api/videos/tour-thumb.jpg', src: '/api/videos/tour.mp4' },
    { id: 2, title: 'Production Process', thumbnail: '/api/videos/production-thumb.jpg', src: '/api/videos/production.mp4' },
    { id: 3, title: 'Quality Control', thumbnail: '/api/videos/quality-thumb.jpg', src: '/api/videos/quality.mp4' },
  ];

  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-forest-green mb-6">
          Visit Our Company
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Take a virtual tour of our state-of-the-art facilities and see how we produce 
          the finest wood products in Cameroon.
        </p>
        
        <div className="bg-gradient-to-b from-leaf-green to-white rounded-2xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">Schedule Your Visit</h2>
          <p className="mb-6">
            We welcome customers to visit our facilities in person or through a virtual tour. 
            See our production process, quality control measures, and meet our team.
          </p>
          <Link
            to="/visit/virtual-tour"
            className="inline-flex items-center px-6 py-3 bg-white text-forest-green rounded-lg font-semibold hover:bg-cream transition-colors duration-300"
          >
            Schedule Virtual Tour
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </motion.section>

      {/* Factory Videos */}
      <section>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-forest-green mb-6"
        >
          Factory Videos
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {factoryVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedVideo(video.src)}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-wood-light to-wood-medium flex items-center justify-center">
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <PlayIcon className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  </div>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-forest-green">
                {video.title}
              </h3>
            </motion.div>
          ))}
        </div>

        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl"
              >
                ✕
              </button>
              <video
                controls
                autoPlay
                className="w-full rounded-lg"
                src={selectedVideo}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        )}
      </section>

      {/* Factory Images Gallery */}
      <section>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-forest-green mb-6"
        >
          Factory Pictures
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {factoryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-wood-light to-wood-medium relative">
                <div className="absolute inset-0 wood-texture opacity-30"></div>
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-forest-green">
                  {image.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Facility Information */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-forest-green mb-6">
          Our Facilities
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-forest-green mb-3">
              Production Capabilities
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2 text-leaf-green">✓</span>
                <span>Modern machinery and equipment</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-leaf-green">✓</span>
                <span>50+ containers monthly capacity</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-leaf-green">✓</span>
                <span>Custom processing capabilities</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-leaf-green">✓</span>
                <span>Quality control laboratory</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-forest-green mb-3">
              Visit Information
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2 text-leaf-green">✓</span>
                <span>Factory tours available by appointment</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-leaf-green">✓</span>
                <span>Virtual tours for international clients</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-leaf-green">✓</span>
                <span>Meet our production team</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-leaf-green">✓</span>
                <span>See products being manufactured</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default VisitCompany;