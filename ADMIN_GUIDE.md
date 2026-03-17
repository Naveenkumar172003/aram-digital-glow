# Admin Panel Documentation

## Overview
The admin panel allows authorized administrators to manage all dynamic content on the website including branches, product categories, and products.

## Access
- **URL**: `/admin`
- **Default Password**: `admin123`

## Features

### 1. Branch Management
Edit branch information:
- Branch name
- Address (full and short)
- Phone number
- Branch image URL

### 2. Category Management
Edit product categories:
- Category name
- Description
- Category image URL

### 3. Product Management
- **Edit Products**: Modify existing product details
- **Add Products**: Create new products with:
  - Product name
  - Category assignment
  - Description
  - Image URL
  - Product specifications (dynamic key-value pairs)
- **Delete Products**: Remove products (with confirmation)

## Data Persistence
All changes are automatically saved to the browser's localStorage. This means:
- Changes persist across browser sessions
- Changes are local to the browser (not synced to a server)
- To sync changes across devices, you'll need a backend database

## Reset Data
Click "Reset Data" button to restore all data to original defaults.

## Password Change
To change the admin password, edit the `login()` function in `/src/hooks/useAdminStore.ts`:

```typescript
const login = (password: string): boolean => {
  if (password === 'your-new-password') { // Change this
    setIsLoggedIn(true);
    localStorage.setItem('admin_login', 'true');
    return true;
  }
  return false;
};
```

## Security Note
⚠️ **Important**: This is a frontend-only admin panel for demonstration purposes. For production:
1. Implement backend authentication (OAuth, JWT, etc.)
2. Use secure password hashing
3. Implement proper role-based access control
4. Add audit logging
5. Use a proper database instead of localStorage
6. Implement HTTPS for all admin operations
7. Add rate limiting for login attempts

## File Structure
```
src/
├── hooks/
│   ├── useAdminStore.ts       # Main admin store with state management
│   └── useAppData.ts          # Hook to access current app data
├── pages/
│   ├── AdminPanel.tsx         # Main admin page & login
│   ├── AdminBranches.tsx      # Branch management
│   ├── AdminCategories.tsx    # Category management
│   └── AdminProducts.tsx      # Product management
```

## Using Admin Data in Components

To use the admin-managed data in your components:

```typescript
import { useAdminStore } from '@/hooks/useAdminStore';

export const MyComponent = () => {
  const { branches, products, categories } = useAdminStore();
  
  return (
    <div>
      {branches.map(branch => (
        <div key={branch.slug}>{branch.name}</div>
      ))}
    </div>
  );
};
```

## Future Enhancements
- [ ] Backend API integration
- [ ] User authentication & authorization
- [ ] Audit logging
- [ ] Bulk import/export
- [ ] Image upload (instead of URLs)
- [ ] Product variations
- [ ] Inventory management
- [ ] SEO optimization controls
