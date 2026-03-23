import { useState } from 'react';
import { Edit2, Check, X, Trash2 } from 'lucide-react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { Branch } from '@/data/branches';

const AdminContact = () => {
  const { data: branches, loading, update: updateBranch, delete: deleteBranch } = useFirebaseData<Branch>({ collectionName: 'branches' });
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Branch>>({});

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

  if (loading) return <div className="text-center py-10">Loading contact information...</div>;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Manage Contact Information</h1>
          <p className="text-slate-600">Edit map location and phone numbers for each branch</p>
        </div>

        {branches.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-slate-600">No branches available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="bg-cyan-600 px-6 py-4">
                  <h3 className="text-white font-bold text-lg">{branch.name}</h3>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {editingId === branch.id ? (
                    <>
                      {/* Address Field */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                        <input
                          type="text"
                          value={formData.address || ''}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                      </div>

                      {/* Phone Field */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Mobile Number</label>
                        <input
                          type="tel"
                          value={formData.phone || ''}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="+91 XXXXXXXXXX"
                        />
                      </div>

                      {/* Map Query Field */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Map Location Query</label>
                        <input
                          type="text"
                          value={formData.mapQuery || ''}
                          onChange={(e) => setFormData({ ...formData, mapQuery: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="e.g., Theni+Tamil+Nadu"
                        />
                      </div>

                      {/* Latitude Field */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Latitude</label>
                        <input
                          type="number"
                          step="0.0001"
                          value={formData.latitude || ''}
                          onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || undefined })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="e.g., 9.7389"
                        />
                      </div>

                      {/* Longitude Field */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Longitude</label>
                        <input
                          type="number"
                          step="0.0001"
                          value={formData.longitude || ''}
                          onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || undefined })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="e.g., 77.7597"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-4">
                        <button
                          onClick={() => handleSave(branch.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        >
                          <Check className="h-4 w-4" /> Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-400 hover:bg-slate-500 text-white rounded-lg transition-colors"
                        >
                          <X className="h-4 w-4" /> Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Display Mode */}
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">Address</p>
                        <p className="text-slate-800 font-medium">{branch.address}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">Phone Number</p>
                        <p className="text-slate-800 font-medium">{branch.phone}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">Map Location</p>
                        <p className="text-slate-800 font-medium">{branch.mapQuery}</p>
                      </div>

                      {branch.latitude && branch.longitude && (
                        <>
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase">Latitude</p>
                            <p className="text-slate-800 font-medium">{branch.latitude.toFixed(4)}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase">Longitude</p>
                            <p className="text-slate-800 font-medium">{branch.longitude.toFixed(4)}</p>
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
