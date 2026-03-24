import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, RotateCcw } from 'lucide-react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useAdminStore } from '@/hooks/useAdminStore';
import AdminServices from '@/pages/AdminServices';
import AdminBranches from '@/pages/AdminBranches';
import AdminCategories from '@/pages/AdminCategories';
import AdminProducts from '@/pages/AdminProducts';
import AdminContact from '@/pages/AdminContact';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, loading, logout: firebaseLogout } = useFirebaseAuth();
  const { resetToDefaults } = useAdminStore();
  const [activeTab, setActiveTab] = useState<'services' | 'branches' | 'categories' | 'products' | 'contact'>('services');

  // If not authenticated and not loading, redirect to login
  if (!loading && !user) {
    navigate('/admin/login', { replace: true });
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await firebaseLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Panel</h1>
              {user?.email && <p className="text-xs sm:text-sm text-gray-600 mt-1">Logged in as: {user.email}</p>}
            </div>
            <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={resetToDefaults}
                className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors text-xs sm:text-sm"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-xs sm:text-sm"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="overflow-x-auto -mx-4 px-4 mb-8">
          <div className="flex gap-2 sm:gap-4 border-b min-w-max sm:min-w-0">
            {(['services', 'branches', 'categories', 'products', 'contact'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-3 font-semibold text-sm sm:text-base capitalize transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'contact' ? 'Info' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'services' && <AdminServices />}
          {activeTab === 'branches' && <AdminBranches />}
          {activeTab === 'categories' && <AdminCategories />}
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'contact' && <AdminContact />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
