import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarIcon,
  ClockIcon,
  BuildingOfficeIcon,
  ArrowRightStartOnRectangleIcon,
  EyeIcon,
  ArchiveBoxIcon,
  TrashIcon,
  UsersIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import UserManagement from './UserManagement';
import { useAuth } from '../context/AuthContext';

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  created_at: string;
  status: string;
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
  status: string;
  type: 'tour';
}

interface PaginationInfo {
  page: number;
  pages: number;
  total: number;
  limit: number;
}

type Request = ContactRequest | TourRequest;

interface AdminProps {
  onLogout: () => void;
}

const Admin: React.FC<AdminProps> = ({ onLogout }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedTab, setSelectedTab] = useState<'contact' | 'tour'>('contact');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [activeSection, setActiveSection] = useState<'requests' | 'users'>('requests');
  const [loading, setLoading] = useState(true);
  const [contactPagination, setContactPagination] = useState<PaginationInfo>({ page: 1, pages: 1, total: 0, limit: 20 });
  const [tourPagination, setTourPagination] = useState<PaginationInfo>({ page: 1, pages: 1, total: 0, limit: 20 });
  const [currentContactPage, setCurrentContactPage] = useState(1);
  const [currentTourPage, setCurrentTourPage] = useState(1);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Load contact messages with pagination
      const contactResponse = await fetch(`/api/contact-messages?page=${currentContactPage}&limit=20`);
      const tourResponse = await fetch(`/api/virtual-tours?page=${currentTourPage}&limit=20`);
      
      const allRequests: Request[] = [];
      
      if (contactResponse.ok) {
        const contactData = await contactResponse.json();
        setContactPagination({
          page: contactData.page,
          pages: contactData.pages,
          total: contactData.total,
          limit: contactData.limit
        });
        const contactRequests: ContactRequest[] = contactData.messages.map((msg: any) => ({
          id: msg.id.toString(),
          name: msg.name,
          email: msg.email,
          company: msg.company,
          phone: msg.phone,
          subject: msg.subject,
          message: msg.message,
          created_at: msg.created_at,
          status: msg.status,
          type: 'contact'
        }));
        allRequests.push(...contactRequests);
      }
      
      if (tourResponse.ok) {
        const tourData = await tourResponse.json();
        setTourPagination({
          page: tourData.page,
          pages: tourData.pages,
          total: tourData.total,
          limit: tourData.limit
        });
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
          status: tour.status,
          type: 'tour'
        }));
        allRequests.push(...tourRequests);
      }
      
      setRequests(allRequests);
    } catch (error) {
      console.error('Failed to load requests:', error);
    } finally {
      setLoading(false);
    }
  }, [currentContactPage, currentTourPage]);

  // Load data from backend APIs
  useEffect(() => {
    loadData();
  }, [loadData]);

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

  const archiveRequest = async (id: string, type: 'contact' | 'tour') => {
    try {
      const endpoint = type === 'contact' 
        ? `/api/contact-messages/${id}/archive`
        : `/api/virtual-tours/${id}/archive`;
      
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        // Reload data to reflect changes
        await loadData();
        if (selectedRequest?.id === id) {
          setSelectedRequest(null);
        }
      } else {
        console.error('Failed to archive request');
      }
    } catch (error) {
      console.error('Error archiving request:', error);
    }
  };

  const deleteRequest = async (id: string, type: 'contact' | 'tour') => {
    if (!user || user.role !== 'admin') {
      console.error('Only admin users can delete requests');
      return;
    }

    if (!window.confirm('Are you sure you want to permanently delete this request? This action cannot be undone.')) {
      return;
    }

    try {
      const endpoint = type === 'contact' 
        ? `/api/contact-messages/${id}`
        : `/api/virtual-tours/${id}`;
      
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        // Reload data to reflect changes
        await loadData();
        if (selectedRequest?.id === id) {
          setSelectedRequest(null);
        }
      } else {
        console.error('Failed to delete request');
      }
    } catch (error) {
      console.error('Error deleting request:', error);
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
                <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
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
                          <div className="text-right">
                            <div className="text-sm text-gray-500">
                              {formatDate(request.created_at)}
                            </div>
                            {request.status === 'archived' && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 mt-1">
                                <ArchiveBoxIcon className="h-3 w-3 mr-1" />
                                Archived
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                
                {/* Pagination Controls */}
                {!loading && filteredRequests.length > 0 && (
                  <div className="flex items-center justify-between px-6 py-4 border-t">
                    <div className="text-sm text-gray-600">
                      Showing {selectedTab === 'contact' ? 
                        `${(currentContactPage - 1) * 20 + 1}-${Math.min(currentContactPage * 20, contactPagination.total)} of ${contactPagination.total}` :
                        `${(currentTourPage - 1) * 20 + 1}-${Math.min(currentTourPage * 20, tourPagination.total)} of ${tourPagination.total}`
                      } {selectedTab === 'contact' ? 'messages' : 'tour requests'}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => selectedTab === 'contact' ? setCurrentContactPage(prev => Math.max(1, prev - 1)) : setCurrentTourPage(prev => Math.max(1, prev - 1))}
                        disabled={selectedTab === 'contact' ? currentContactPage === 1 : currentTourPage === 1}
                        className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeftIcon className="h-4 w-4" />
                      </button>
                      <span className="px-3 py-1 text-sm">
                        Page {selectedTab === 'contact' ? currentContactPage : currentTourPage} of {selectedTab === 'contact' ? contactPagination.pages : tourPagination.pages}
                      </span>
                      <button
                        onClick={() => selectedTab === 'contact' ? setCurrentContactPage(prev => Math.min(contactPagination.pages, prev + 1)) : setCurrentTourPage(prev => Math.min(tourPagination.pages, prev + 1))}
                        disabled={selectedTab === 'contact' ? currentContactPage === contactPagination.pages : currentTourPage === tourPagination.pages}
                        className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                      </button>
                    </div>
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
                          {formatDate(selectedRequest.created_at)}
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
                            {(selectedRequest as TourRequest).preferred_date}
                          </p>
                          <p className="flex items-center text-gray-700">
                            <ClockIcon className="h-4 w-4 mr-2" />
                            {(selectedRequest as TourRequest).preferred_time}
                          </p>
                          {(selectedRequest as TourRequest).message && (
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="font-medium text-sage-green mb-2">Special Requests</p>
                              <p className="text-gray-700">{(selectedRequest as TourRequest).message}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => archiveRequest(selectedRequest.id, selectedRequest.type)}
                        className="flex-1 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center"
                        disabled={selectedRequest.status === 'archived'}
                      >
                        <ArchiveBoxIcon className="h-4 w-4 mr-2" />
                        {selectedRequest.status === 'archived' ? (t('archived') || 'Archived') : (t('archive') || 'Archive')}
                      </button>
                      {user?.role === 'admin' && (
                        <button
                          onClick={() => deleteRequest(selectedRequest.id, selectedRequest.type)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                          title="Delete permanently (Admin only)"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      )}
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