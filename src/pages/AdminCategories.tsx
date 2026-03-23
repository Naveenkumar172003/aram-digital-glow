import { useState } from 'react';
import { Edit2, Check, X, Upload, Trash2 } from 'lucide-react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { Category } from '@/data/products';

const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};


const AdminCategories = () => {
  const { data: categories, loading, update: updateCategory, add: addCategory, delete: deleteCategory } = useFirebaseData<Category>({ collectionName: 'categories' });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
      } catch (error) {
        alert('Failed to delete category.');
      }
    }
  };
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Category>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState<Partial<Category>>({ name: '', description: '', image: '' });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);
    if (!addForm.name || !addForm.description) {
      setAddError('Name and description are required.');
      return;
    }
    setAddLoading(true);
    try {
      await addCategory(addForm as Category);
      setAddForm({ name: '', description: '', image: '' });
      setShowAddForm(false);
    } catch (error) {
      setAddError('Failed to add category.');
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

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setFormData(category);
  };

  const handleSave = async (id: string) => {
    try {
      await updateCategory(id, formData);
      setEditingId(null);
      setFormData({});
    } catch (error) {
      console.error('Error saving category:', error);
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
    return <div className="text-center py-8">Loading categories...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Categories</h2>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-base flex items-center"
          onClick={() => setShowAddForm((v) => !v)}
        >
          <span className="mr-2 text-xl">+</span> Add Category
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddCategory} className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Add New Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category Name</label>
              <input
                className="w-full border rounded px-3 py-2 mb-2"
                type="text"
                value={addForm.name || ''}
                onChange={e => setAddForm({ ...addForm, name: e.target.value })}
                required
                placeholder="Category name"
                disabled={addLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <input
                className="w-full border rounded px-3 py-2 mb-2"
                type="text"
                value={addForm.description || ''}
                onChange={e => setAddForm({ ...addForm, description: e.target.value })}
                required
                placeholder="Description"
                disabled={addLoading}
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Category Image</label>
              <input
                className="w-full border rounded px-3 py-2"
                type="file"
                accept="image/*"
                onChange={handleAddImageUpload}
                disabled={addLoading}
              />
              {addForm.image && (
                <img src={addForm.image as string} alt="Preview" className="mt-2 h-20 rounded shadow" />
              )}
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg flex items-center"
                disabled={addLoading}
              >
                ✓ Add Category
              </button>
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg flex items-center"
                onClick={() => { setShowAddForm(false); setAddForm({ name: '', description: '', image: '' }); setAddError(null); }}
                disabled={addLoading}
              >
                ✗ Cancel
              </button>
            </div>
          </div>
          {addError && <div className="text-red-600 mt-2">{addError}</div>}
        </form>
      )}

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow p-6">
            {editingId === category.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category Name
                    </label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={formData.description || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Or paste image URL here"
                          value={formData.image && !formData.image.startsWith('data:') ? formData.image : ''}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <label className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer">
                          <Upload className="h-4 w-4" />
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      {formData.image && (
                        <img src={formData.image} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-gray-300" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(category.id)}
                    className="flex items-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Check className="h-4 w-4" /> Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-24 h-24 object-cover rounded mt-2 border border-gray-300"
                    />
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Edit2 className="h-4 w-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    title="Delete Category"
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

export default AdminCategories;
