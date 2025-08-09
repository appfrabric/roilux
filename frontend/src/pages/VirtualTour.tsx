import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, VideoCameraIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const VirtualTour: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send the data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-12"
      >
        <CheckCircleIcon className="w-20 h-20 text-forest-green mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-forest-green mb-4">
          Tour Request Submitted!
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your interest in Tropical Wood. We'll contact you within 24 hours to confirm your virtual tour appointment.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              email: '',
              company: '',
              phone: '',
              preferredDate: '',
              preferredTime: '',
              message: '',
            });
          }}
          className="px-6 py-3 bg-dark-green text-white rounded-lg font-semibold hover:bg-forest-green transition-colors duration-300"
        >
          Schedule Another Tour
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-forest-green mb-6">
          Schedule Your Virtual Tour
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Experience our facilities from anywhere in the world with a personalized virtual tour
        </p>
      </motion.section>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Tour Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-leaf-green to-white rounded-2xl p-8 text-white mb-8">
            <h2 className="text-2xl font-bold mb-6">What to Expect</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <VideoCameraIcon className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Live Video Tour</h3>
                  <p className="text-white text-opacity-90">
                    A real-time guided tour of our production facilities
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <ClockIcon className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">45-Minute Session</h3>
                  <p className="text-white text-opacity-90">
                    Comprehensive tour with Q&A opportunity
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CalendarIcon className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Flexible Scheduling</h3>
                  <p className="text-white text-opacity-90">
                    Available Monday-Friday at your convenience
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-forest-green mb-4">
              Tour Highlights
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-leaf-green mr-2">•</span>
                <span>Raw material storage and selection process</span>
              </li>
              <li className="flex items-start">
                <span className="text-leaf-green mr-2">•</span>
                <span>State-of-the-art processing equipment</span>
              </li>
              <li className="flex items-start">
                <span className="text-leaf-green mr-2">•</span>
                <span>Quality control procedures</span>
              </li>
              <li className="flex items-start">
                <span className="text-leaf-green mr-2">•</span>
                <span>Finished product warehouse</span>
              </li>
              <li className="flex items-start">
                <span className="text-leaf-green mr-2">•</span>
                <span>Shipping and logistics operations</span>
              </li>
              <li className="flex items-start">
                <span className="text-leaf-green mr-2">•</span>
                <span>Meet our production team</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-forest-green mb-6">
              Book Your Tour
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  required
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time (GMT) *
                </label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  required
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requests or Questions
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                  placeholder="Let us know if you have specific areas of interest or questions..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-dark-green text-white rounded-lg font-semibold hover:bg-forest-green transition-colors duration-300"
              >
                Schedule Virtual Tour
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default VirtualTour;