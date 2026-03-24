import { useState } from 'react';
import { Edit2, Check, X, Upload, Trash2 } from 'lucide-react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { Branch, BranchService } from '@/data/branches';

const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const AdminBranches = () => {
  const { data: branches, loading, update: updateBranch, add: addBranch, delete: deleteBranch } = useFirebaseData<Branch>({ collectionName: 'branches' });
    const handleDelete = async (id: string) => {
      if (window.confirm('Are you sure you want to delete this branch?')) {
        try {
          await deleteBranch(id);
        } catch (error) {
          alert('Failed to delete branch.');
        }
      }
    };
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Branch>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState<Partial<Branch>>({ name: '', address: '', phone: '', image: '' });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const handleAddBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);
    if (!addForm.name || !addForm.address || !addForm.phone) {
      setAddError('Name, address, and phone are required.');
      return;
    }
    setAddLoading(true);
    try {
      await addBranch(addForm as Branch);
      setAddForm({ name: '', address: '', phone: '', image: '' });
      setShowAddForm(false);
    } catch (error) {
      setAddError('Failed to add branch.');
    }
    setAddLoading(false);
  };

  const handleAddImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertImageToBase64(file);
        setAddForm({ ...addForm, image: base64 });
      } catch (error) {
        setAddError('Error uploading image.');
      }
    }
  };

  const handleEdit = (branch: Branch) => {
    setEditingId(branch.id);
    setFormData(branch);
  };

  const handleSave = async (id: string) => {
    try {
      await updateBranch(id, formData);
      setEditingId(null);
      setFormData({});
    } catch (error) {
      console.error('Error saving branch:', error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertImageToBase64(file);
        setFormData({ ...formData, image: base64 });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading branches...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Branches</h2>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 sm:px-5 py-2 rounded-lg transition-colors text-sm sm:text-base flex items-center justify-center"
          onClick={() => setShowAddForm((v) => !v)}
        >
          <span className="mr-2 text-lg">+</span> Add
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddBranch} className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Add New Branch</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1">Branch Name</label>
              <input
                className="w-full border rounded px-3 py-2 mb-2 text-sm"
                type="text"
                value={addForm.name || ''}
                onChange={e => setAddForm({ ...addForm, name: e.target.value })}
                required
                placeholder="Branch name"
                disabled={addLoading}
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1">Address</label>
              <input
                className="w-full border rounded px-3 py-2 mb-2 text-sm"
                type="text"
                value={addForm.address || ''}
                onChange={e => setAddForm({ ...addForm, address: e.target.value })}
                required
                placeholder="Address"
                disabled={addLoading}
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1">Phone</label>
              <input
                className="w-full border rounded px-3 py-2 mb-2 text-sm"
                type="text"
                value={addForm.phone || ''}
                onChange={e => setAddForm({ ...addForm, phone: e.target.value })}
                required
                placeholder="Phone"
                disabled={addLoading}
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1">Branch Image</label>
              <input
                className="w-full border rounded px-3 py-2 text-sm"
                type="file"
                accept="image/*"
                onChange={handleAddImageUpload}
                disabled={addLoading}
              />
              {addForm.image && (
                <img src={addForm.image as string} alt="Preview" className="mt-2 h-16 sm:h-20 rounded shadow" />
              )}
            </div>
          </div>
          <div className="flex flex-col xs:flex-row gap-2 mt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 sm:px-6 py-2 rounded-lg flex items-center justify-center text-sm"
              disabled={addLoading}
            >
              ✓ Add
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 sm:px-6 py-2 rounded-lg flex items-center justify-center text-sm"
              onClick={() => { setShowAddForm(false); setAddForm({ name: '', address: '', phone: '', image: '' }); setAddError(null); }}
              disabled={addLoading}
            >
              ✗ Cancel
            </button>
          </div>
          {addError && <div className="text-red-600 mt-2 text-sm">{addError}</div>}
        </form>
      )}

      <div className="space-y-4">
        {branches.map((branch) => (
          <div key={branch.id} className="bg-white rounded-lg shadow p-4 sm:p-6">
            {editingId === branch.id ? (
              <div className="space-y-4 overflow-y-auto max-h-96 sm:max-h-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Branch Name
                    </label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Short Address
                    </label>
                    <input
                      type="text"
                      value={formData.shortAddress || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, shortAddress: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Full Address
                    </label>
                    <input
                      type="text"
                      value={formData.address || ''}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          placeholder="Or paste image URL here"
                          value={formData.image && !formData.image.startsWith('data:') ? formData.image : ''}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <label className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors cursor-pointer">
                          <Upload className="h-4 w-4" />
                          <span className="hidden sm:inline">Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      {formData.image && (
                        <img src={formData.image} alt="Preview" className="w-16 sm:w-24 h-16 sm:h-24 object-cover rounded-lg border border-gray-300" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Services Management */}
                <div className="border-t pt-4">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-3">
                    Services Available at This Branch
                  </label>
                  <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
                    {(formData.services || []).map((service, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                          <div>
                            <label className="text-xs font-medium text-gray-600">Service Name</label>
                            <input
                              type="text"
                              placeholder="Service name"
                              value={service.title || ''}
                              onChange={(e) => {
                                const updatedServices = [...(formData.services || [])];
                                updatedServices[idx] = { ...updatedServices[idx], title: e.target.value };
                                setFormData({ ...formData, services: updatedServices });
                              }}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-600">Icon</label>
                            <select
                              value={service.icon || 'Printer'}
                              onChange={(e) => {
                                const updatedServices = [...(formData.services || [])];
                                updatedServices[idx] = { ...updatedServices[idx], icon: e.target.value };
                                setFormData({ ...formData, services: updatedServices });
                              }}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                            >
                              <option value="Printer">Printer</option>
                              <option value="BookOpen">Book Binding</option>
                              <option value="Palette">Color Printing</option>
                              <option value="ScanLine">Scanning</option>
                              <option value="Copy">Copy</option>
                              <option value="FileText">Document</option>
                              <option value="Image">Photo</option>
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <label className="text-xs font-medium text-gray-600">Description</label>
                            <input
                              type="text"
                              placeholder="Description"
                              value={service.desc || ''}
                              onChange={(e) => {
                                const updatedServices = [...(formData.services || [])];
                                updatedServices[idx] = { ...updatedServices[idx], desc: e.target.value };
                                setFormData({ ...formData, services: updatedServices });
                              }}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updatedServices = formData.services?.filter((_, i) => i !== idx) || [];
                            setFormData({ ...formData, services: updatedServices });
                          }}
                          className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newServices = [...(formData.services || []), { title: '', desc: '', icon: 'Printer' }];
                      setFormData({ ...formData, services: newServices });
                    }}
                    className="text-xs px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    + Add Service
                  </button>
                </div>

                <div className="flex flex-col xs:flex-row gap-2 border-t pt-4">
                  <button
                    onClick={() => handleSave(branch.id)}
                    className="flex items-center justify-center gap-1 px-4 sm:px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                  >
                    <Check className="h-4 w-4" /> <span className="hidden sm:inline">Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center justify-center gap-1 px-4 sm:px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" /> <span className="hidden sm:inline">Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">{branch.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    <span className="font-medium">Address:</span> {branch.address}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    <span className="font-medium">Phone:</span> {branch.phone}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(branch)}
                    className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                  >
                    <Edit2 className="h-4 w-4" /> <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(branch.id)}
                    className="p-2 sm:px-3 sm:py-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                    title="Delete Branch"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBranches;
