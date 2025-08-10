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
  EyeIcon,
  TrashIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import UserManagement from './UserManagement';

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  created_at: string;
  type: 'contact';
}

interface TourRequest {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
  created_at: string;
  type: 'tour';
}

type Request = ContactRequest | TourRequest;

interface AdminProps {
  onLogout: () => void;
}

const Admin: React.FC<AdminProps> = ({ onLogout }) => {
  const { t } = useTranslation();
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedTab, setSelectedTab] = useState<'contact' | 'tour'>('contact');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [activeSection, setActiveSection] = useState<'requests' | 'users'>('requests');
  const [loading, setLoading] = useState(true);

  // Load data from backend APIs
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load contact messages
      const contactResponse = await fetch('/api/contact-messages');
      const tourResponse = await fetch('/api/virtual-tours');
      
      const allRequests: Request[] = [];
      
      if (contactResponse.ok) {
        const contactData = await contactResponse.json();
        const contactRequests: ContactRequest[] = contactData.messages.map((msg: any) => ({
          id: msg.id.toString(),
          name: msg.name,
          email: msg.email,
          company: msg.company,
          phone: msg.phone,
          subject: msg.subject,
          message: msg.message,
          created_at: msg.created_at,
          type: 'contact'
        }));
        allRequests.push(...contactRequests);
      }
      
      if (tourResponse.ok) {
        const tourData = await tourResponse.json();
        const tourRequests: TourRequest[] = tourData.tours.map((tour: any) => ({
          id: tour.id.toString(),
          name: tour.name,
          email: tour.email,
          company: tour.company,
          phone: tour.phone,
          preferred_date: tour.preferred_date,
          preferred_time: tour.preferred_time,
          message: tour.message,
          created_at: tour.created_at,
          type: 'tour'
        }));
        allRequests.push(...tourRequests);
      }
      
      // Sort by creation date (newest first)
      allRequests.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setRequests(allRequests);
    } catch (error) {
      console.error('Failed to load requests:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const deleteRequest = (id: string) => {
    // In production, this would call a delete API endpoint
    console.warn('Delete API not implemented yet');
    setRequests(prev => prev.filter(req => req.id !== id));
    if (selectedRequest?.id === id) {
      setSelectedRequest(null);
    }
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
                <h1 className="text-2xl font-bold text-gray-800">{t('admin_dashboard') || 'Admin Dashboard'}</h1>
                <p className="text-gray-700">{t('company_name')} - {t('company_subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Section Switcher */}
              <div className="flex space-x-2 bg-white/20 backdrop-blur rounded-lg p-1">
                <button
                  onClick={() => setActiveSection('requests')}
                  className={`px-3 py-2 rounded-md font-semibold transition-colors ${
                    activeSection === 'requests'
                      ? 'bg-white text-gray-800 shadow-md'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <EnvelopeIcon className="h-4 w-4 inline mr-2" />
                  {t('requests') || 'Requests'}
                </button>
                <button
                  onClick={() => setActiveSection('users')}
                  className={`px-3 py-2 rounded-md font-semibold transition-colors ${
                    activeSection === 'users'
                      ? 'bg-white text-gray-800 shadow-md'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <UsersIcon className="h-4 w-4 inline mr-2" />
                  {t('users') || 'Users'}
                </button>
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
      </div>

      <div className="container mx-auto px-4 py-8">
        {activeSection === 'requests' ? (
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
                {loading ? (
                  <div className="p-8 text-center text-gray-500">
                    <p>Loading requests...</p>
                  </div>
                ) : filteredRequests.length === 0 ? (
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
                                {(request as TourRequest).preferred_date} at {(request as TourRequest).preferred_time}
                              </p>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(request.created_at)}
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
                      {selectedRequest.type === 'contact' ? (t('contact_details') || 'Contact Details') : (t('tour_details') || 'Tour Details')}
                    </h3>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Basic Info */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">{t('basic_information') || 'Basic Information'}</h4>
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
                          {formatDate(selectedRequest.created_at)}
                        </p>
                      </div>
                    </div>

                    {/* Request-specific details */}
                    {selectedRequest.type === 'contact' ? (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">{t('message_details') || 'Message Details'}</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="font-medium text-sage-green mb-2">{(selectedRequest as ContactRequest).subject}</p>
                          <p className="text-gray-700 whitespace-pre-wrap">{(selectedRequest as ContactRequest).message}</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">{t('tour_details') || 'Tour Details'}</h4>
                        <div className="space-y-3">
                          <p className="flex items-center text-gray-700">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            {(selectedRequest as TourRequest).preferred_date}
                          </p>
                          <p className="flex items-center text-gray-700">
                            <ClockIcon className="h-4 w-4 mr-2" />
                            {(selectedRequest as TourRequest).preferred_time}
                          </p>
                          {(selectedRequest as TourRequest).message && (
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="font-medium text-sage-green mb-2">{t('admin_special_requests') || 'Special Requests'}</p>
                              <p className="text-gray-700">{(selectedRequest as TourRequest).message}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => deleteRequest(selectedRequest.id)}
                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                      >
                        <TrashIcon className="h-4 w-4 mr-2" />
                        {t('delete') || 'Delete'}
                      </button>
                    </div>
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
        ) : (
          <UserManagement />
        )}
      </div>
    </div>
  );
};

export default Admin;