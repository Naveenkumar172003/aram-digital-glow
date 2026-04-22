import { useState } from 'react';
import { Edit2, Check, X, Trash2, Plus } from 'lucide-react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { Branch } from '@/data/branches';

const AdminContact = () => {
  const { data: branches, loading, add: addBranch, update: updateBranch, delete: deleteBranch } = useFirebaseData<Branch>({ collectionName: 'branches' });
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Branch>>({});
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newBranchData, setNewBranchData] = useState<Partial<Branch>>({
    name: '',
    slug: '',
    address: '',
    shortAddress: '',
    phone: '',
    mapQuery: '',
    image: '',
  });

  const handleEdit = (branch: Branch & { id: string }) => {
    setEditingId(branch.id);
    setFormData(branch);
  };

  const handleSave = async (id: string) => {
    try {
      await updateBranch(id, formData as Branch);
      alert('Branch contact info updated successfully!');
      setEditingId(null);
    } catch (error) {
      alert('Failed to update branch contact info.');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      try {
        await deleteBranch(id);
      } catch (error) {
        alert('Failed to delete branch.');
      }
    }
  };

  const handleAddNew = async () => {
    if (!newBranchData.name || !newBranchData.slug || !newBranchData.address || !newBranchData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    try {
      await addBranch(newBranchData as Branch);
      alert('New branch added successfully!');
      setIsAddingNew(false);
      setNewBranchData({
        name: '',
        slug: '',
        address: '',
        shortAddress: '',
        phone: '',
        mapQuery: '',
        image: '',
      });
    } catch (error) {
      alert('Failed to add new branch.');
    }
  };

  const handleCancelAdd = () => {
    setIsAddingNew(false);
    setNewBranchData({
      name: '',
      slug: '',
      address: '',
      shortAddress: '',
      phone: '',
      mapQuery: '',
      image: '',
    });
  };

  if (loading) return <div className="text-center py-10">Loading contact information...</div>;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-2">Manage Contact Information</h1>
            <p className="text-xs sm:text-sm text-slate-600">Edit map location and phone numbers for each branch</p>
          </div>
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Add Branch</span>
          </button>
        </div>

        {isAddingNew && (
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-md mb-6">
            {/* Header */}
            <div className="bg-blue-600 px-4 sm:px-6 py-3 sm:py-4">
              <h3 className="text-white font-bold text-base sm:text-lg">Add New Branch</h3>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Branch Name *</label>
                <input
                  type="text"
                  value={newBranchData.name || ''}
                  onChange={(e) => setNewBranchData({ ...newBranchData, name: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Theni"
                />
              </div>

              {/* Slug Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Slug (URL) *</label>
                <input
                  type="text"
                  value={newBranchData.slug || ''}
                  onChange={(e) => setNewBranchData({ ...newBranchData, slug: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., theni"
                />
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Full Address *</label>
                <input
                  type="text"
                  value={newBranchData.address || ''}
                  onChange={(e) => setNewBranchData({ ...newBranchData, address: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Old Bus Stand Opposite, Theni, Tamil Nadu"
                />
              </div>

              {/* Short Address Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Short Address</label>
                <input
                  type="text"
                  value={newBranchData.shortAddress || ''}
                  onChange={(e) => setNewBranchData({ ...newBranchData, shortAddress: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Main Road, Theni"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={newBranchData.phone || ''}
                  onChange={(e) => setNewBranchData({ ...newBranchData, phone: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>

              {/* Map Query Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Map Location Query</label>
                <input
                  type="text"
                  value={newBranchData.mapQuery || ''}
                  onChange={(e) => setNewBranchData({ ...newBranchData, mapQuery: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Theni+Tamil+Nadu"
                />
              </div>

              {/* Image URL Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newBranchData.image || ''}
                  onChange={(e) => setNewBranchData({ ...newBranchData, image: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              {/* Latitude Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Latitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={newBranchData.latitude || ''}
                  onChange={(e) => setNewBranchData({ ...newBranchData, latitude: parseFloat(e.target.value) || undefined })}
                  className="w-full px-3 sm:px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 9.7389"
                />
              </div>

              {/* Longitude Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Longitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={newBranchData.longitude || ''}
                  onChange={(e) => setNewBranchData({ ...newBranchData, longitude: parseFloat(e.target.value) || undefined })}
                  className="w-full px-3 sm:px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 77.7597"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col xs:flex-row gap-2 pt-4">
                <button
                  onClick={handleAddNew}
                  className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                >
                  <Check className="h-4 w-4" /> <span className="hidden sm:inline">Create</span>
                </button>
                <button
                  onClick={handleCancelAdd}
                  className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-slate-400 hover:bg-slate-500 text-white text-sm rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" /> <span className="hidden sm:inline">Cancel</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {branches.length === 0 && !isAddingNew ? (
          <div className="bg-white rounded-lg p-6 sm:p-8 text-center">
            <p className="text-slate-600">No branches available.</p>
          </div>
        ) : branches.length === 0 ? (
          <div></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="bg-cyan-600 px-4 sm:px-6 py-3 sm:py-4">
                  <h3 className="text-white font-bold text-base sm:text-lg">{branch.name}</h3>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-4">
                  {editingId === branch.id ? (
                    <>
                      {/* Address Field */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Address</label>
                        <input
                          type="text"
                          value={formData.address || ''}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                      </div>

                      {/* Phone Field */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
                        <input
                          type="tel"
                          value={formData.phone || ''}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="+91 XXXXXXXXXX"
                        />
                      </div>

                      {/* Map Query Field */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Map Location Query</label>
                        <input
                          type="text"
                          value={formData.mapQuery || ''}
                          onChange={(e) => setFormData({ ...formData, mapQuery: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="e.g., Theni+Tamil+Nadu"
                        />
                      </div>

                      {/* Latitude Field */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Latitude</label>
                        <input
                          type="number"
                          step="0.0001"
                          value={formData.latitude || ''}
                          onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || undefined })}
                          className="w-full px-3 sm:px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="e.g., 9.7389"
                        />
                      </div>

                      {/* Longitude Field */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Longitude</label>
                        <input
                          type="number"
                          step="0.0001"
                          value={formData.longitude || ''}
                          onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || undefined })}
                          className="w-full px-3 sm:px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="e.g., 77.7597"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col xs:flex-row gap-2 pt-4">
                        <button
                          onClick={() => handleSave(branch.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                        >
                          <Check className="h-4 w-4" /> <span className="hidden sm:inline">Save</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-slate-400 hover:bg-slate-500 text-white text-sm rounded-lg transition-colors"
                        >
                          <X className="h-4 w-4" /> <span className="hidden sm:inline">Cancel</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Display Mode */}
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">Address</p>
                        <p className="text-sm sm:text-base text-slate-800 font-medium">{branch.address}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">Phone Number</p>
                        <p className="text-sm sm:text-base text-slate-800 font-medium">{branch.phone}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">Map Location</p>
                        <p className="text-sm sm:text-base text-slate-800 font-medium">{branch.mapQuery}</p>
                      </div>

                      {branch.latitude && branch.longitude && (
                        <>
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase">Latitude</p>
                            <p className="text-sm sm:text-base text-slate-800 font-medium">{branch.latitude.toFixed(4)}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase">Longitude</p>
                            <p className="text-sm sm:text-base text-slate-800 font-medium">{branch.longitude.toFixed(4)}</p>
                          </div>
                        </>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-4">
                        <button
                          onClick={() => handleEdit(branch)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          title="Edit Branch"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(branch.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Delete Branch"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContact;
