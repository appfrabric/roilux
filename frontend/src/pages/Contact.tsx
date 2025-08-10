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
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email address is required');
      return false;
    }
    if (!formData.subject.trim()) {
      setError('Subject is required');
      return false;
    }
    if (!formData.message.trim()) {
      setError('Message is required');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log('Submitting contact form with data:', formData);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const responseText = await response.text();
      console.log('Raw response text:', responseText);

      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          throw new Error(errorData.detail || 'Failed to send message');
        } catch (parseError) {
          throw new Error(`Server error: ${response.status}. Response: ${responseText}`);
        }
      }

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(`Invalid JSON response: ${responseText}`);
      }
      
      console.log('Contact message sent successfully:', result);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending contact message:', error);
      setError(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
          {t('message_sent_success')}
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          {t('thank_you_contact')}
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
{t('send_another_message')}
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
        <h1 className="text-4xl lg:text-5xl font-bold text-forest-green mb-6">
          {t('contact_us_title')}
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          {t('contact_us_desc')}
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
              {t('company_information')}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg">Tropical Wood</h3>
                <p className="opacity-90">A division of Roilux</p>
              </div>
              <div className="flex items-start">
                <MapPinIcon className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">{t('address')}</p>
                  <p>{t('abonbang')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <PhoneIcon className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">{t('phone')} & WhatsApp</p>
                  <div className="space-y-2">
                    <div>
                      <a href="tel:+2376948823693" className="block text-lg font-semibold hover:text-sage-green transition-colors">
                        +237-694-88-2369
                      </a>
                      <p className="text-xs opacity-75">📞 Call or 💬 WhatsApp</p>
                    </div>
                    <div>
                      <a href="tel:+2376918416173" className="block text-lg font-semibold hover:text-sage-green transition-colors">
                        +237-691-84-1617
                      </a>
                      <p className="text-xs opacity-75">📞 Call or 💬 WhatsApp</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-semibold">{t('email')}</p>
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
              {t('business_hours')}
            </h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>{t('monday_friday_hours')}:</span>
                <span className="font-semibold">{t('eight_six')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('saturday_hours')}:</span>
                <span className="font-semibold">{t('eight_two')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('sunday_hours')}:</span>
                <span className="font-semibold">{t('closed')}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{t('all_times_wat')}</p>
            </div>
          </div>

          {/* Social Media & Web Presence */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-forest-green mb-4 flex items-center">
              <GlobeAltIcon className="w-5 h-5 mr-2" />
              {t('connect_with_us')}
            </h3>
            <div className="space-y-3">
              <a 
                href="https://wa.me/2376948823693" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
              >
                <span className="text-3xl mr-4">💬</span>
                <div>
                  <p className="font-bold text-green-700 text-lg">{t('whatsapp')} Chat</p>
                  <p className="text-green-600 font-semibold">+237-694-88-2369</p>
                  <p className="text-xs text-gray-500">Click to start WhatsApp conversation</p>
                </div>
              </a>
              <a 
                href="https://wa.me/2376918416173" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
              >
                <span className="text-3xl mr-4">💬</span>
                <div>
                  <p className="font-bold text-green-700 text-lg">{t('whatsapp')} Chat</p>
                  <p className="text-green-600 font-semibold">+237-691-84-1617</p>
                  <p className="text-xs text-gray-500">Click to start WhatsApp conversation</p>
                </div>
              </a>
              <a 
                href="mailto:roilux.woods@gmail.com" 
                className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="text-2xl mr-3">📧</span>
                <div>
                  <p className="font-semibold text-blue-700">{t('email')}</p>
                  <p className="text-sm text-gray-600">{t('send_inquiries')}</p>
                </div>
              </a>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl mr-3">🌍</span>
                <div>
                  <p className="font-semibold text-gray-700">{t('global_shipping')}</p>
                  <p className="text-sm text-gray-600">{t('global_delivery')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Map Placeholder */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-forest-green mb-4">
              {t('our_location')}
            </h3>
            <div className="bg-gradient-to-br from-leaf-green to-sage-green rounded-lg p-8 text-white text-center">
              <MapPinIcon className="w-12 h-12 mx-auto mb-4" />
              <p className="font-semibold mb-2">{t('abonbang')}</p>
              <p className="text-sm opacity-90 mb-4">
                {t('heart_of_cameroon')}
              </p>
              <button className="px-4 py-2 bg-white text-forest-green rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {t('view_google_maps')}
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
              {t('send_us_message')}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('full_name')} {t('required_field')}
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
                  {t('email_address')} {t('required_field')}
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
                  {t('company_field')}
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
                  {t('phone_number')}
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
                  {t('subject')} {t('required_field')}
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                >
                  <option value="">{t('select_subject')}</option>
                  <option value="product-inquiry">{t('product_inquiry')}</option>
                  <option value="quote-request">{t('quote_request')}</option>
                  <option value="technical-support">{t('technical_support')}</option>
                  <option value="partnership">{t('partnership_opportunity')}</option>
                  <option value="general">{t('general_information')}</option>
                  <option value="other">{t('other')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('message')} {t('required_field')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                  placeholder={t('tell_us_requirements')}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                  isLoading 
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                    : 'bg-forest-green text-white hover:bg-dark-green'
                }`}
              >
                {isLoading ? 'Sending...' : t('send_message')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;