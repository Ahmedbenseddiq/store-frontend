import { Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import RoleBasedEntry from './components/RoleBasedEntry';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import Dashboard from './pages/admin/Dashboard';
import ProductList from './pages/admin/ProductList';
import ProductForm from './pages/admin/ProductForm';
import CategoryList from './pages/admin/CategoryList';
import CategoryForm from './pages/admin/CategoryForm';

// Admin Guard
const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Guest Guard (for Login/Register)
const GuestRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />;
  }
  return children;
};


function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleBasedEntry />}>
        {/* Child routes of RoleBasedEntry (which renders MainLayout if public) */}
        <Route index element={<Home />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="categories" element={<Categories />} />
        <Route path="login" element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        } />
        <Route path="register" element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        } />
      </Route>

      {/* Admin Routes - Separated from MainLayout */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route index element={<Dashboard />} />

        {/* Products */}
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/:id/edit" element={<ProductForm />} />

        {/* Categories */}
        <Route path="categories" element={<CategoryList />} />
        <Route path="categories/new" element={<CategoryForm />} />
        <Route path="categories/:id/edit" element={<CategoryForm />} />
      </Route>
    </Routes>
  );
}

export default App;
