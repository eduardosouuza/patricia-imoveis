import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Home, LogOut, Building2, User, Sun } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin/login');
      toast.success('Logout realizado com sucesso');
    } catch (error) {
      toast.error('Erro ao fazer logout');
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <nav className="bg-primary text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-display font-semibold text-accent">Patricia</span>
                <span className="text-xl font-light text-white">.Imóveis</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-primary-dark/30 px-4 py-1.5 rounded-full flex items-center">
                <User size={16} className="text-accent mr-2" />
                <span className="text-white/90 text-sm">{user?.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center text-white hover:text-accent transition-colors rounded-full bg-primary-dark/30 px-4 py-1.5"
              >
                <LogOut size={16} className="mr-1.5" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white shadow-md rounded-lg p-6 border border-secondary-dark/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              
              <h2 className="text-xl font-display font-semibold text-primary mb-6 flex items-center">
                <Sun size={18} className="text-accent mr-2" />
                Painel Admin
              </h2>
              
              <nav className="space-y-2">
                <Link
                  to="/admin"
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                    location.pathname === '/admin'
                      ? 'bg-accent text-white font-medium shadow-md'
                      : 'text-primary hover:bg-secondary hover:shadow-sm'
                  }`}
                >
                  <Home size={18} className="mr-2.5" />
                  Dashboard
                </Link>
                
                <Link
                  to="/admin"
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                    location.pathname.includes('/admin/properties')
                      ? 'bg-accent text-white font-medium shadow-md'
                      : 'text-primary hover:bg-secondary hover:shadow-sm'
                  }`}
                >
                  <Building2 size={18} className="mr-2.5" />
                  Imóveis
                </Link>
              </nav>
            </div>
          </div>

          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}