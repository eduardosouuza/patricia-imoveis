import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Home, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/admin');
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Falha ao fazer login';
      toast.error(errorMessage);
      console.error('Erro de login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white p-8 rounded-xl shadow-lg border border-secondary-dark/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full -translate-y-1/3 translate-x-1/3"></div>
          
          <div className="relative z-10">
            <Link to="/" className="absolute top-2 left-2 text-primary/60 hover:text-primary transition-colors">
              <Home size={20} />
            </Link>
            
            <div className="text-center mb-8">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <Lock className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-3xl font-display font-bold text-primary mb-2">
                Painel Administrativo
              </h2>
              <p className="text-primary/60 text-sm">
                Faça login para acessar o painel de gerenciamento
              </p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email-address" className="block text-sm font-medium text-primary/80 mb-1">
                    Email
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-secondary-dark focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300 font-sans"
                    placeholder="Seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-primary/80 mb-1">
                    Senha
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-secondary-dark focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300 font-sans"
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-display"
                >
                  {loading ? 'Entrando...' : (
                    <>
                      Entrar
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-8 text-center">
              <Link to="/" className="text-sm text-primary/60 hover:text-accent transition-colors">
                Voltar para o site
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}