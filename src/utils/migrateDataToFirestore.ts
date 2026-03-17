import { collection, addDoc, setDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { categories as defaultCategories, products as defaultProducts } from '@/data/products';
import { branches as defaultBranches } from '@/data/branches';

export const migrateDataToFirestore = async () => {
  try {
    console.log('Starting migration...');

    // 1. Migrate Categories
    console.log('Migrating categories...');
    const categoriesColl = collection(db, 'categories');
    const existingCategories = await getDocs(categoriesColl);
    
    if (existingCategories.empty) {
      for (const category of defaultCategories) {
        // Add id field using slug
        const categoryData = {
          ...category,
          id: category.slug,
        };
        await setDoc(doc(db, 'categories', category.slug), categoryData);
      }
      console.log(`✅ Migrated ${defaultCategories.length} categories`);
    } else {
      console.log('⚠️ Categories already exist, skipping...');
    }

    // 2. Migrate Branches
    console.log('Migrating branches...');
    const branchesColl = collection(db, 'branches');
    const existingBranches = await getDocs(branchesColl);
    
    if (existingBranches.empty) {
      for (const branch of defaultBranches) {
        // Add id field using slug
        const branchData = {
          ...branch,
          id: branch.slug,
        };
        await setDoc(doc(db, 'branches', branch.slug), branchData);
      }
      console.log(`✅ Migrated ${defaultBranches.length} branches`);
    } else {
      console.log('⚠️ Branches already exist, skipping...');
    }

    // 3. Migrate Products
    console.log('Migrating products...');
    const productsColl = collection(db, 'products');
    const existingProducts = await getDocs(productsColl);
    
    if (existingProducts.empty) {
      for (const product of defaultProducts) {
        // Products already have id field
        await setDoc(doc(db, 'products', product.id), product);
      }
      console.log(`✅ Migrated ${defaultProducts.length} products`);
    } else {
      console.log('⚠️ Products already exist, skipping...');
    }

    console.log('✅ Migration completed successfully!');
    return { success: true, message: 'All data migrated to Firestore' };
  } catch (error) {
    console.error('❌ Migration error:', error);
    throw error;
  }
};
