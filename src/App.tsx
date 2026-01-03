import { Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import MainLayout from './layouts/MainLayout';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import Dashboard from './pages/admin/Dashboard';
import ProductList from './pages/admin/ProductList';
import ProductForm from './pages/admin/ProductForm';

// Admin Guard
const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="categories" element={<Categories />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="admin/*" element={
          <AdminRoute>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ProductList />} />
              <Route path="products/new" element={<ProductForm />} />
              <Route path="products/:id/edit" element={<ProductForm />} />
            </Routes>
          </AdminRoute>
        } />

      </Route>
    </Routes>
  );
}

export default App;
