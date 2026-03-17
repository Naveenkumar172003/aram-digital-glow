import { useAdminStore } from '@/hooks/useAdminStore';
import { branches as defaultBranches } from '@/data/branches';
import { categories as defaultCategories, products as defaultProducts } from '@/data/products';

export const useAppData = () => {
  const { branches, categories, products } = useAdminStore();
  
  return {
    branches: branches.length > 0 ? branches : defaultBranches,
    categories: categories.length > 0 ? categories : defaultCategories,
    products: products.length > 0 ? products : defaultProducts,
  };
};
