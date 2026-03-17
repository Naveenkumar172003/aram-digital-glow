import { useState, useEffect } from 'react';
import { branches as defaultBranches, Branch } from '@/data/branches';
import { categories as defaultCategories, products as defaultProducts, Category, Product } from '@/data/products';

export const useAdminStore = () => {
  const [branches, setBranches] = useState<Branch[]>(defaultBranches);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedBranches = localStorage.getItem('admin_branches');
    const savedCategories = localStorage.getItem('admin_categories');
    const savedProducts = localStorage.getItem('admin_products');
    const savedLogin = localStorage.getItem('admin_login');

    if (savedBranches) setBranches(JSON.parse(savedBranches));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedLogin) setIsLoggedIn(true);
  }, []);

  // Save branches to localStorage
  const updateBranches = (newBranches: Branch[]) => {
    setBranches(newBranches);
    localStorage.setItem('admin_branches', JSON.stringify(newBranches));
  };

  // Save categories to localStorage
  const updateCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    localStorage.setItem('admin_categories', JSON.stringify(newCategories));
  };

  // Save products to localStorage
  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('admin_products', JSON.stringify(newProducts));
  };

  // Update single branch
  const updateBranch = (slug: string, data: Partial<Branch>) => {
    const updated = branches.map((b) => (b.slug === slug ? { ...b, ...data } : b));
    updateBranches(updated);
  };

  // Update single category
  const updateCategory = (slug: string, data: Partial<Category>) => {
    const updated = categories.map((c) => (c.slug === slug ? { ...c, ...data } : c));
    updateCategories(updated);
  };

  // Update single product
  const updateProduct = (id: string, data: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...data } : p));
    updateProducts(updated);
  };

  // Add new product
  const addProduct = (product: Product) => {
    updateProducts([...products, product]);
  };

  // Delete product
  const deleteProduct = (id: string) => {
    updateProducts(products.filter((p) => p.id !== id));
  };

  // Login
  const login = (password: string): boolean => {
    if (password === 'admin123') {
      setIsLoggedIn(true);
      localStorage.setItem('admin_login', 'true');
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_login');
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setBranches(defaultBranches);
    setCategories(defaultCategories);
    setProducts(defaultProducts);
    localStorage.removeItem('admin_branches');
    localStorage.removeItem('admin_categories');
    localStorage.removeItem('admin_products');
  };

  return {
    branches,
    categories,
    products,
    isLoggedIn,
    updateBranches,
    updateCategories,
    updateProducts,
    updateBranch,
    updateCategory,
    updateProduct,
    addProduct,
    deleteProduct,
    login,
    logout,
    resetToDefaults,
  };
};
