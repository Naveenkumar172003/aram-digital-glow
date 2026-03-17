/**
 * Integration Guide: Using Admin-Managed Data in Pages
 * 
 * This file shows examples of how to integrate the admin store
 * with your existing pages so they display admin-managed content.
 */

// EXAMPLE 1: Update Branches page to use admin data
// File: src/pages/Branches.tsx
/*
import { useAdminStore } from '@/hooks/useAdminStore';

const Branches = () => {
  const { branches } = useAdminStore(); // Use admin-managed branches
  
  return (
    <div className="py-20 relative">
      <div className="container max-w-6xl">
        <SectionTitle title="Our Branches" subtitle="Visit any of our 4 branches across Tamil Nadu" />
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:auto-rows-fr gap-8 mt-10">
          {branches.map((b, i) => (
            // ... branch card JSX
          ))}
        </div>
      </div>
    </div>
  );
};

export default Branches;
*/

// EXAMPLE 2: Update CategoryPage to use admin data
// File: src/pages/CategoryPage.tsx
/*
import { useAdminStore } from '@/hooks/useAdminStore';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { categories: allCategories, products: allProducts } = useAdminStore();
  
  const categoryBySlug = (slug: string) => 
    allCategories.find(c => c.slug === slug);
  
  const productsByCategory = (slug: string) =>
    allProducts.filter(p => p.categorySlug === slug);
  
  const category = slug ? categoryBySlug(slug) : undefined;
  const products = slug ? productsByCategory(slug) : [];
  
  // ... rest of the component
};

export default CategoryPage;
*/

// EXAMPLE 3: Update Index/Home page featured products
// File: src/pages/Index.tsx
/*
import { useAdminStore } from '@/hooks/useAdminStore';

const Index = () => {
  const { products } = useAdminStore();
  
  // Get featured products (those with featured: true)
  const featuredProducts = products.filter(p => p.featured);
  
  return (
    <div>
      {/* ... other sections */}
      
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
*/

// EXAMPLE 4: Create a hook to update all pages at once
// File: src/hooks/usePageData.ts
/*
import { useAdminStore } from '@/hooks/useAdminStore';
import { 
  branches as defaultBranches,
  branchBySlug as defaultBranchBySlug 
} from '@/data/branches';
import { 
  categories as defaultCategories,
  categoryBySlug as defaultCategoryBySlug,
  productsByCategory as defaultProductsByCategory,
  products as defaultProducts
} from '@/data/products';

export const usePageData = () => {
  const { branches, categories, products } = useAdminStore();
  
  // Create dynamic lookup functions
  const branchBySlug = (slug: string) =>
    branches.find(b => b.slug === slug) || defaultBranchBySlug[slug];
  
  const categoryBySlug = (slug: string) =>
    categories.find(c => c.slug === slug);
  
  const productsByCategory = (slug: string) =>
    products.filter(p => p.categorySlug === slug);
  
  return {
    branches: branches.length > 0 ? branches : defaultBranches,
    categories: categories.length > 0 ? categories : defaultCategories,
    products: products.length > 0 ? products : defaultProducts,
    branchBySlug,
    categoryBySlug,
    productsByCategory,
  };
};

// Usage in components:
// const { branches, products, branchBySlug } = usePageData();
*/

export {};
