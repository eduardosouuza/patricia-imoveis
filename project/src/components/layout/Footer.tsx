import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Home, Lock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-100 via-secondary-light to-secondary text-primary pt-20 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-accent/10 blur-3xl -translate-y-1/2 translate-x-1/3 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl translate-y-1/2 -translate-x-1/3 opacity-20"></div>
      <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-accent/5 blur-xl opacity-30"></div>

      <div className="rich-bg absolute inset-0 opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-2 bg-gradient-to-br from-accent to-accent-light rounded-lg shadow-sm">
                <Home className="text-white" size={20} />
              </div>
              <span className="text-2xl font-serif font-medium text-primary">Patricia</span>
            </div>
            <p className="text-primary/80 mb-6">
              Especialista em imóveis de alto padrão, oferecendo um serviço exclusivo 
              e personalizado para cada cliente.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white shadow-sm hover:bg-accent/10 p-2.5 rounded-lg transition-all duration-300 border border-accent/20">
                <Facebook size={18} className="text-accent-dark" />
              </a>
              <a href="#" className="bg-white shadow-sm hover:bg-accent/10 p-2.5 rounded-lg transition-all duration-300 border border-accent/20">
                <Instagram size={18} className="text-accent-dark" />
              </a>
              <a href="#" className="bg-white shadow-sm hover:bg-accent/10 p-2.5 rounded-lg transition-all duration-300 border border-accent/20">
                <Linkedin size={18} className="text-accent-dark" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-serif mb-6 relative pb-3 text-primary">
              <span className="relative z-10">Contato</span>
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-accent to-accent-light"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-white p-1.5 rounded-lg shadow-sm mr-3 mt-0.5 border border-accent/10">
                  <MapPin size={16} className="text-accent-dark" />
                </div>
                <span className="text-primary/80">
                  Viamão, RS
                </span>
              </li>
              <li className="flex items-center">
                <div className="bg-white p-1.5 rounded-lg shadow-sm mr-3 border border-accent/10">
                  <Phone size={16} className="text-accent-dark" />
                </div>
                <span className="text-primary/80">(51) 99186-1221</span>
              </li>
              <li className="flex items-center">
                <div className="bg-white p-1.5 rounded-lg shadow-sm mr-3 border border-accent/10">
                  <Mail size={16} className="text-accent-dark" />
                </div>
                <span className="text-primary/80">psimoveis1515@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-serif mb-6 relative pb-3 text-primary">
              <span className="relative z-10">Links Rápidos</span>
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-accent to-accent-light"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary/80 hover:text-accent-dark transition-colors flex items-center group">
                  <span className="mr-2 text-accent group-hover:translate-x-1 transition-transform duration-300">›</span> Início
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary/80 hover:text-accent-dark transition-colors flex items-center group">
                  <span className="mr-2 text-accent group-hover:translate-x-1 transition-transform duration-300">›</span> Sobre
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-primary/80 hover:text-accent-dark transition-colors flex items-center group">
                  <span className="mr-2 text-accent group-hover:translate-x-1 transition-transform duration-300">›</span> Imóveis
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary/80 hover:text-accent-dark transition-colors flex items-center group">
                  <span className="mr-2 text-accent group-hover:translate-x-1 transition-transform duration-300">›</span> Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-serif mb-6 relative pb-3 text-primary">
              <span className="relative z-10">Serviços</span>
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-accent to-accent-light"></span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-primary/80 group">
                <span className="mr-2 text-accent group-hover:translate-x-1 transition-transform duration-300">›</span> Venda de Imóveis
              </li>
              <li className="flex items-center text-primary/80 group">
                <span className="mr-2 text-accent group-hover:translate-x-1 transition-transform duration-300">›</span> Imóveis para Investimento
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 text-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8"></div>
          <p className="mb-3 text-primary/70">&copy; {new Date().getFullYear()} Patricia Imóveis. Todos os direitos reservados.</p>
          <Link 
            to="/admin/login" 
            className="inline-flex items-center text-[10px] bg-transparent hover:bg-primary/5 text-primary/40 hover:text-primary/70 px-3 py-1.5 rounded transition-all duration-300 border border-transparent hover:border-primary/10"
          >
            <Lock size={10} className="mr-1" />
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;