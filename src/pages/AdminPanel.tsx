import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, RotateCcw } from 'lucide-react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useAdminStore } from '@/hooks/useAdminStore';
import AdminServices from '@/pages/AdminServices';
import AdminBranches from '@/pages/AdminBranches';
import AdminCategories from '@/pages/AdminCategories';
import AdminProducts from '@/pages/AdminProducts';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, loading, logout: firebaseLogout } = useFirebaseAuth();
  const { resetToDefaults } = useAdminStore();
  const [activeTab, setActiveTab] = useState<'services' | 'branches' | 'categories' | 'products'>('services');

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
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            {user?.email && <p className="text-sm text-gray-600 mt-1">Logged in as: {user.email}</p>}
          </div>
          <div className="flex gap-3">
            <button
              onClick={resetToDefaults}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors text-sm"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Data
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8 border-b">
          {(['services', 'branches', 'categories', 'products'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold capitalize transition-colors ${
                activeTab === tab
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'services' && <AdminServices />}
          {activeTab === 'branches' && <AdminBranches />}
          {activeTab === 'categories' && <AdminCategories />}
          {activeTab === 'products' && <AdminProducts />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
