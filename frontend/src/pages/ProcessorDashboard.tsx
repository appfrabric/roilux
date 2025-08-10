import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarIcon,
  ClockIcon,
  BuildingOfficeIcon,
  ArrowRightOnRectangleIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp: string;
  type: 'contact';
}

interface TourRequest {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  preferredDate: string;
  preferredTime: string;
  specialRequests?: string;
  timestamp: string;
  type: 'tour';
}

type Request = ContactRequest | TourRequest;

interface ProcessorDashboardProps {
  onLogout: () => void;
}

const ProcessorDashboard: React.FC<ProcessorDashboardProps> = ({ onLogout }) => {
  const { t } = useTranslation();
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedTab, setSelectedTab] = useState<'contact' | 'tour'>('contact');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  // Load mock data (in production, this would come from an API)
  useEffect(() => {
    const mockRequests: Request[] = [
      {
        id: '1',
        name: 'arthur test',
        email: 'arthur.test@example.com',
        company: 'Test Wood Imports',
        phone: '+1-555-0123',
        subject: 'Product Inquiry',
        message: 'I am interested in your plywood products. Could you please provide pricing for marine grade plywood?',
        timestamp: new Date().toISOString(),
        type: 'contact'
      },
      {
        id: '2',
        name: 'chef bandja test',
        email: 'chef.bandja.test@example.com',
        company: 'Test Furniture Co',
        phone: '+1-555-0456',
        subject: 'Quote Request',
        message: 'We need 500 pieces of melamine plywood for furniture production. Please send quote.',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        type: 'contact'
      },
      {
        id: '3',
        name: 'arthur test',
        email: 'arthur.test@example.com',
        company: 'Test Construction',
        phone: '+1-555-0123',
        preferredDate: '2025-08-15',
        preferredTime: '10:00 AM',
        specialRequests: 'Would like to see the quality control processes and discuss bulk pricing.',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        type: 'tour'
      },
      {
        id: '4',
        name: 'chef bandja test',
        email: 'chef.bandja.test@example.com',
        preferredDate: '2025-08-20',
        preferredTime: '2:00 PM',
        specialRequests: 'Interested in veneer selection process for high-end furniture.',
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        type: 'tour'
      }
    ];
    setRequests(mockRequests);
  }, []);

  const filteredRequests = requests.filter(req => req.type === selectedTab);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-green via-white to-wood-light">
      {/* Header */}
      <div className="bg-gradient-to-r from-sage-green to-wood-light shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/assets/logo.jpg"
                alt="Tropical Wood Logo"
                className="h-12 w-12 rounded-full object-cover border-2 border-gray-800"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{t('processor_dashboard') || 'Processor Dashboard'}</h1>
                <p className="text-gray-700">{t('company_name')} - {t('view_requests') || 'View Requests'}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur text-gray-800 rounded-lg hover:bg-white/30 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>{t('logout') || 'Logout'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Request List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Tab Navigation */}
              <div className="bg-gradient-to-r from-wood-light to-sage-green p-6">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedTab('contact')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                      selectedTab === 'contact'
                        ? 'bg-white text-sage-green shadow-lg'
                        : 'bg-white/20 text-gray-800 hover:bg-white/30'
                    }`}
                  >
                    <EnvelopeIcon className="h-5 w-5 inline mr-2" />
                    {t('contact_requests') || 'Contact Requests'} ({requests.filter(r => r.type === 'contact').length})
                  </button>
                  <button
                    onClick={() => setSelectedTab('tour')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                      selectedTab === 'tour'
                        ? 'bg-white text-sage-green shadow-lg'
                        : 'bg-white/20 text-gray-800 hover:bg-white/30'
                    }`}
                  >
                    <CalendarIcon className="h-5 w-5 inline mr-2" />
                    {t('tour_requests') || 'Tour Requests'} ({requests.filter(r => r.type === 'tour').length})
                  </button>
                </div>
              </div>

              {/* Request List */}
              <div className="max-h-96 overflow-y-auto">
                {filteredRequests.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <p>{t('no_requests') || 'No requests found'}</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredRequests.map((request) => (
                      <motion.div
                        key={request.id}
                        whileHover={{ backgroundColor: '#f9fafb' }}
                        className={`p-6 cursor-pointer transition-colors ${
                          selectedRequest?.id === request.id ? 'bg-sage-green/10' : ''
                        }`}
                        onClick={() => setSelectedRequest(request)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{request.name}</h3>
                            <p className="text-gray-600">{request.email}</p>
                            {request.company && (
                              <p className="text-sm text-gray-500 flex items-center mt-1">
                                <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                                {request.company}
                              </p>
                            )}
                            {selectedTab === 'contact' && (
                              <p className="text-sm text-sage-green mt-2 font-medium">
                                {(request as ContactRequest).subject}
                              </p>
                            )}
                            {selectedTab === 'tour' && (
                              <p className="text-sm text-sage-green mt-2 font-medium">
                                <CalendarIcon className="h-4 w-4 inline mr-1" />
                                {(request as TourRequest).preferredDate} at {(request as TourRequest).preferredTime}
                              </p>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(request.timestamp)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Request Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-4">
              {selectedRequest ? (
                <div>
                  <div className="bg-gradient-to-r from-wood-light to-sage-green p-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      {selectedRequest.type === 'contact' ? 'Contact Details' : 'Tour Details'}
                    </h3>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Basic Info */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Basic Information</h4>
                      <div className="space-y-2">
                        <p className="flex items-center text-gray-700">
                          <span className="font-medium w-20">{t('name') || 'Name'}:</span>
                          {selectedRequest.name}
                        </p>
                        <p className="flex items-center text-gray-700">
                          <EnvelopeIcon className="h-4 w-4 mr-2" />
                          {selectedRequest.email}
                        </p>
                        {selectedRequest.company && (
                          <p className="flex items-center text-gray-700">
                            <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                            {selectedRequest.company}
                          </p>
                        )}
                        {selectedRequest.phone && (
                          <p className="flex items-center text-gray-700">
                            <PhoneIcon className="h-4 w-4 mr-2" />
                            {selectedRequest.phone}
                          </p>
                        )}
                        <p className="flex items-center text-gray-700">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          {formatDate(selectedRequest.timestamp)}
                        </p>
                      </div>
                    </div>

                    {/* Request-specific details */}
                    {selectedRequest.type === 'contact' ? (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Message Details</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="font-medium text-sage-green mb-2">{(selectedRequest as ContactRequest).subject}</p>
                          <p className="text-gray-700 whitespace-pre-wrap">{(selectedRequest as ContactRequest).message}</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Tour Details</h4>
                        <div className="space-y-3">
                          <p className="flex items-center text-gray-700">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            {(selectedRequest as TourRequest).preferredDate}
                          </p>
                          <p className="flex items-center text-gray-700">
                            <ClockIcon className="h-4 w-4 mr-2" />
                            {(selectedRequest as TourRequest).preferredTime}
                          </p>
                          {(selectedRequest as TourRequest).specialRequests && (
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="font-medium text-sage-green mb-2">{t('special_requests') || 'Special Requests'}</p>
                              <p className="text-gray-700">{(selectedRequest as TourRequest).specialRequests}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <EyeIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>{t('select_request') || 'Select a request to view details'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessorDashboard;