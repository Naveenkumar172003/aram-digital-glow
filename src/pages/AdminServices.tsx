import { useState } from 'react';
import { Edit2, Check, X, Trash2, Plus, Upload } from 'lucide-react';
import { useFirebaseData } from '@/hooks/useFirebaseData';

export interface Service {
  id?: string;
  title: string;
  desc: string;
  image: string;
  icon: string;
}

const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const AdminServices = () => {
  const { data: services, loading, update: updateService, add: addService, delete: deleteService } = useFirebaseData<Service>({ 
    collectionName: 'services' 
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState<Partial<Service>>({ 
    title: '', 
    desc: '', 
    image: '', 
    icon: 'Printer' 
  });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);
    
    if (!addForm.title || !addForm.desc || !addForm.image) {
      setAddError('Title, description, and image are required.');
      return;
    }

    setAddLoading(true);
    try {
      console.log('Attempting to add service:', addForm);
      const result = await addService(addForm as Service);
      console.log('Service added successfully with ID:', result);
      setAddForm({ title: '', desc: '', image: '', icon: 'Printer' });
      setShowAddForm(false);
      alert('Service added successfully!');
    } catch (error) {
      console.error('Error adding service:', error);
      setAddError(`Failed to add service: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    setAddLoading(false);
  };

  const handleAddImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 500KB to be safe with Base64 encoding)
      if (file.size > 500 * 1024) {
        setAddError('Image must be smaller than 500KB. Please compress the image first.');
        return;
      }
      try {
        const base64 = await convertImageToBase64(file);
        setAddForm({ ...addForm, image: base64 });
        setAddError(null);
      } catch (error) {
        setAddError('Error uploading image.');
      }
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id || '');
    setFormData(service);
  };

  const handleSave = async (id: string) => {
    try {
      await updateService(id, formData);
      setEditingId(null);
      setFormData({});
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 500KB to be safe with Base64 encoding)
      if (file.size > 500 * 1024) {
        alert('Image must be smaller than 500KB. Please compress the image first.');
        return;
      }
      try {
        const base64 = await convertImageToBase64(file);
        setFormData({ ...formData, image: base64 });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id);
      } catch (error) {
        alert('Failed to delete service.');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading services...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Services Management</h2>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Service
          </button>
        )}
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white border-l-4 border-blue-600 rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Add New Service</h3>
          {addError && <div className="text-red-600 mb-4 text-sm">{addError}</div>}
          
          <form onSubmit={handleAddService} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  value={addForm.title || ''}
                  onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Service title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Icon</label>
                <select
                  value={addForm.icon || 'Printer'}
                  onChange={(e) => setAddForm({ ...addForm, icon: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description *</label>
              <textarea
                value={addForm.desc || ''}
                onChange={(e) => setAddForm({ ...addForm, desc: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Service description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image *</label>
              <input
                type="file"
                onChange={handleAddImageUpload}
                accept="image/*"
                className="w-full px-3 py-2 border rounded-lg"
              />
              {addForm.image && (
                <img src={addForm.image} alt="Preview" className="w-20 h-20 object-cover rounded-lg mt-2" />
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={addLoading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <Check className="h-4 w-4" />
                {addLoading ? 'Adding...' : 'Add Service'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setAddForm({ title: '', desc: '', image: '', icon: 'Printer' });
                  setAddError(null);
                }}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Icon</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Image</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No services yet. Click "Add Service" to create one.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service.id} className="border-b hover:bg-gray-50">
                  {editingId === service.id ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={(formData.title as string) || ''}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={(formData.icon as string) || 'Printer'}
                          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                          className="w-full px-2 py-1 border rounded"
                        >
                          <option value="Printer">Printer</option>
                          <option value="BookOpen">Book Binding</option>
                          <option value="Palette">Color Printing</option>
                          <option value="ScanLine">Scanning</option>
                          <option value="Copy">Copy</option>
                          <option value="FileText">Document</option>
                          <option value="Image">Photo</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <textarea
                          value={(formData.desc as string) || ''}
                          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                          rows={1}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="file"
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="text-sm"
                        />
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button
                          onClick={() => handleSave(service.id || '')}
                          className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 font-medium">{service.title}</td>
                      <td className="px-6 py-4 text-gray-600">{service.icon}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{service.desc}</td>
                      <td className="px-6 py-4">
                        {service.image && (
                          <img
                            src={service.image}
                            alt={service.title}
                            className="h-10 w-10 object-cover rounded"
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(service.id || '')}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminServices;
