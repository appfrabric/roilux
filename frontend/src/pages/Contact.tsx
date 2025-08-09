import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon,
  BuildingOfficeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
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
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-12"
      >
        <div className="text-6xl mb-6">✅</div>
        <h2 className="text-3xl font-bold text-forest-green mb-4">
          Message Sent Successfully!
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for contacting Tropical Wood. We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              email: '',
              company: '',
              phone: '',
              subject: '',
              message: '',
            });
          }}
          className="px-6 py-3 bg-forest-green text-white rounded-lg font-semibold hover:bg-dark-green transition-colors duration-300"
        >
          Send Another Message
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
          Contact Us
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Get in touch with Tropical Wood for all your wood product needs. We're here to help!
        </p>
      </motion.section>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Company Info Card */}
          <div className="bg-gradient-to-br from-wood-light to-wood-medium rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <BuildingOfficeIcon className="w-6 h-6 mr-3" />
              Company Information
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg">Tropical Wood</h3>
                <p className="opacity-90">A division of Roilux</p>
              </div>
              <div className="flex items-start">
                <MapPinIcon className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Address:</p>
                  <p>Abonbang, Cameroon</p>
                </div>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-semibold">Phone:</p>
                  <a href="tel:+2376812111" className="hover:text-sage-green transition-colors">
                    +237-681-21-1111
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-semibold">Email:</p>
                  <a href="mailto:roilux.woods@gmail.com" className="hover:text-sage-green transition-colors">
                    roilux.woods@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-forest-green mb-4 flex items-center">
              <ClockIcon className="w-5 h-5 mr-2" />
              Business Hours
            </h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="font-semibold">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-semibold">8:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-semibold">Closed</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">All times in West Africa Time (WAT)</p>
            </div>
          </div>

          {/* Social Media & Web Presence */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-forest-green mb-4 flex items-center">
              <GlobeAltIcon className="w-5 h-5 mr-2" />
              Connect With Us
            </h3>
            <div className="space-y-3">
              <a 
                href="https://wa.me/2376812111" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span className="text-2xl mr-3">📱</span>
                <div>
                  <p className="font-semibold text-green-700">WhatsApp</p>
                  <p className="text-sm text-gray-600">Chat with us directly</p>
                </div>
              </a>
              <a 
                href="mailto:roilux.woods@gmail.com" 
                className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="text-2xl mr-3">📧</span>
                <div>
                  <p className="font-semibold text-blue-700">Email</p>
                  <p className="text-sm text-gray-600">Send us your inquiries</p>
                </div>
              </a>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl mr-3">🌍</span>
                <div>
                  <p className="font-semibold text-gray-700">Global Shipping</p>
                  <p className="text-sm text-gray-600">Worldwide delivery available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Map Placeholder */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-forest-green mb-4">
              Our Location
            </h3>
            <div className="bg-gradient-to-br from-leaf-green to-sage-green rounded-lg p-8 text-white text-center">
              <MapPinIcon className="w-12 h-12 mx-auto mb-4" />
              <p className="font-semibold mb-2">Abonbang, Cameroon</p>
              <p className="text-sm opacity-90 mb-4">
                Located in the heart of Cameroon's timber region
              </p>
              <button className="px-4 py-2 bg-white text-forest-green rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                View on Google Maps
              </button>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-forest-green mb-6">
              Send Us a Message
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
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="quote-request">Quote Request</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="general">General Information</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                  placeholder="Tell us about your requirements, questions, or how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-forest-green text-white rounded-lg font-semibold hover:bg-dark-green transition-colors duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;