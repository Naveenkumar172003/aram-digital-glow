import { useState } from 'react';
import { Edit2, Check, X, Trash2, Plus, Upload } from 'lucide-react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { Product, ProductSpec } from '@/data/products';

const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const AdminProducts = () => {
  const { data: products, loading, add: addProduct, update: updateProduct, delete: deleteProduct } = useFirebaseData<Product>({ collectionName: 'products' });
  const { data: categories } = useFirebaseData({ collectionName: 'categories' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [newSpec, setNewSpec] = useState<Partial<ProductSpec>>({});

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
    setNewSpec({});
    setShowAddForm(false);
  };

  const handleAddForm = () => {
    setShowAddForm(true);
    setEditingId(null);
    setFormData({
      name: '',
      category: '',
      categorySlug: '',
      image: '',
      description: '',
      specs: [],
    });
  };

  const handleSave = async (id: string) => {
    try {
      await updateProduct(id, formData);
      setEditingId(null);
      setFormData({});
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleAddProduct = async () => {
    if (formData.name && formData.category) {
      try {
        await addProduct(formData as Product);
        setShowAddForm(false);
        setFormData({});
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({});
    setNewSpec({});
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const addSpecField = () => {
    if (newSpec.label && newSpec.value) {
      const specs = [...(formData.specs || []), { label: newSpec.label, value: newSpec.value }];
      setFormData({ ...formData, specs });
      setNewSpec({});
    }
  };

  const removeSpec = (index: number) => {
    const specs = (formData.specs || []).filter((_, i) => i !== index);
    setFormData({ ...formData, specs });
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
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Products</h2>
        <button
          onClick={handleAddForm}
          className="flex items-center justify-center gap-1 px-4 sm:px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
          <h3 className="text-lg sm:text-lg font-semibold mb-4">Add New Product</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Product Name
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
                  Category
                </label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => {
                    const cat = categories.find((c) => c.name === e.target.value);
                    setFormData({
                      ...formData,
                      category: e.target.value,
                      categorySlug: cat?.slug || '',
                    });
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((c: any) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Product Image
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

            {/* Specifications */}
            <div className="border-t pt-4">
              <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-3">Product Specifications</h4>
              <div className="space-y-3 max-h-40 overflow-y-auto">
                {/* Existing specs */}
                {(formData.specs || []).map((spec, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Label (e.g., Type, Engine Speed)"
                        value={spec.label || ''}
                        readOnly
                        className="px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={spec.value || ''}
                        readOnly
                        className="px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                      />
                    </div>
                    <button
                      onClick={() => removeSpec(index)}
                      className="px-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {/* Add new spec */}
                <div className="flex flex-col sm:flex-row gap-2 items-end">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                    <input
                      type="text"
                      placeholder="Label (e.g., Type, Engine Speed)"
                      value={newSpec.label || ''}
                      onChange={(e) => setNewSpec({ ...newSpec, label: e.target.value })}
                      className="px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={newSpec.value || ''}
                      onChange={(e) => setNewSpec({ ...newSpec, value: e.target.value })}
                      className="px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <button
                    onClick={addSpecField}
                    className="px-2 sm:px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1 text-xs sm:text-sm"
                  >
                    <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col xs:flex-row gap-2 pt-4">
              <button
                onClick={handleAddProduct}
                className="flex items-center justify-center gap-1 px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
              >
                <Check className="h-4 w-4" /> <span className="hidden sm:inline">Add</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center justify-center gap-1 px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
              >
                <X className="h-4 w-4" /> <span className="hidden sm:inline">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4 sm:p-6">
            {editingId === product.id ? (
              <div className="space-y-4 overflow-y-auto max-h-96 sm:max-h-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Product Name
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
                      Category
                    </label>
                    <select
                      value={formData.category || ''}
                      onChange={(e) => {
                        const cat = categories.find((c: any) => c.name === e.target.value);
                        setFormData({
                          ...formData,
                          category: e.target.value,
                          categorySlug: cat?.slug || '',
                        });
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {categories.map((c: any) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Product Image
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

                {/* Specifications */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-3">Product Specifications</h4>
                  <div className="space-y-3 max-h-40 overflow-y-auto">
                    {/* Existing specs */}
                    {(formData.specs || []).map((spec, index) => (
                      <div key={index} className="flex gap-2 items-end">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Label (e.g., Type, Engine Speed)"
                            value={spec.label || ''}
                            readOnly
                            className="px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                          />
                          <input
                            type="text"
                            placeholder="Value"
                            value={spec.value || ''}
                            readOnly
                            className="px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                          />
                        </div>
                        <button
                          onClick={() => removeSpec(index)}
                          className="px-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    
                    {/* Add new spec */}
                    <div className="flex flex-col sm:flex-row gap-2 items-end">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                        <input
                          type="text"
                          placeholder="Label (e.g., Type, Engine Speed)"
                          value={newSpec.label || ''}
                          onChange={(e) => setNewSpec({ ...newSpec, label: e.target.value })}
                          className="px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="text"
                          placeholder="Value"
                          value={newSpec.value || ''}
                          onChange={(e) => setNewSpec({ ...newSpec, value: e.target.value })}
                          className="px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <button
                        onClick={addSpecField}
                        className="px-2 sm:px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1 text-xs sm:text-sm"
                      >
                        <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Add</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col xs:flex-row gap-2 border-t pt-4">
                  <button
                    onClick={() => handleSave(product.id)}
                    className="flex items-center justify-center gap-1 px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                  >
                    <Check className="h-4 w-4" /> <span className="hidden sm:inline">Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center justify-center gap-1 px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" /> <span className="hidden sm:inline">Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1 min-w-0">
                  {product.image && (
                    <img src={product.image} alt={product.name} className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-lg flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{product.category}</p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex items-center justify-center gap-1 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                  >
                    <Edit2 className="h-4 w-4" /> <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-2 sm:px-3 sm:py-2 text-red-600 hover:bg-red-100 rounded transition-colors"
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

export default AdminProducts;
