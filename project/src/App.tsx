import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ScrollToTop from './components/utils/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

// Lazy loading para páginas que não são imediatamente necessárias
const About = lazy(() => import('./pages/About'));
const Properties = lazy(() => import('./pages/Properties'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));

// Lazy loading para páginas admin (menos acessadas)
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProperties = lazy(() => import('./pages/admin/AdminProperties'));
const AdminPropertyForm = lazy(() => import('./pages/admin/AdminPropertyForm'));

// Componente de loading
const PageLoading = () => (
  <div className="flex items-center justify-center min-h-screen bg-secondary">
    <div className="loader"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Toaster position="top-right" />
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="properties" element={<Properties />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }>
              <Route index element={<AdminProperties />} />
              <Route path="properties/new" element={<AdminPropertyForm />} />
              <Route path="properties/:id" element={<AdminPropertyForm />} />
            </Route>

            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;