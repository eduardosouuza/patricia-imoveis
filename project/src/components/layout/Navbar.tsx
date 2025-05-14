import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, MapPin, ChevronDown, Search, Home, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e as unknown as React.FormEvent);
    }
  };

  const handleTypeSearch = (type: string) => {
    navigate(`/properties?type=${encodeURIComponent(type)}`);
    setSearchOpen(false);
  };

  const navbarClasses = `fixed w-full z-50 transition-all duration-500 ${
    scrolled
      ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
      : 'bg-transparent py-5 md:py-7'
  }`;

  const logoTextClass = scrolled ? 'text-primary' : 'text-white';
  const navLinkClass = scrolled ? 'text-primary hover:text-accent' : 'text-white hover:text-accent';

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="group">
            <div className="flex items-center">
              <div className="relative">
                <span className={`text-3xl font-display font-bold ${logoTextClass} group-hover:text-accent transition-colors duration-300`}>Patricia</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500"></span>
              </div>
              <span className="text-accent ml-1 text-2xl font-serif font-medium">.</span>
              <span className={`text-xl font-display font-light ${logoTextClass} ml-1 transition-colors duration-300`}>Imóveis</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex mr-8 space-x-8">
              <NavLinks navLinkClass={navLinkClass} />
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2.5 rounded-full ${scrolled ? 'text-primary hover:bg-primary/5' : 'text-white hover:bg-white/10'} transition-colors`}
                aria-label="Buscar imóveis"
              >
                <Search size={20} />
              </button>
              <div className="hidden lg:flex items-center text-primary text-sm border-r border-primary/20 pr-4 pl-1">
                <MapPin size={16} className="text-accent mr-2" />
                <span className={`${scrolled ? 'text-primary/80' : 'text-white/80'} font-sans`}>Viamão, RS</span>
              </div>
              <a
                href="https://wa.me/5551991861221"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-accent hover:bg-accent-light text-white px-5 py-2.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md group tracking-wide font-display"
              >
                <Phone size={16} className="mr-2 group-hover:animate-pulse" />
                <span className="font-medium">Contato</span>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2.5 rounded-full ${scrolled ? 'text-primary hover:bg-primary/5' : 'text-white hover:bg-white/10'} transition-colors`}
              aria-label="Buscar imóveis"
            >
              <Search size={20} />
            </button>
            <button
              className={`${scrolled ? 'text-primary' : 'text-white'} rounded-full p-2.5 hover:bg-secondary/50 transition-colors border border-transparent hover:border-accent/20`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 overflow-hidden"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-4 border border-accent/10">
                <form onSubmit={handleSearch} className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/40" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar por localização, tipo ou valor..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-secondary-dark focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300 bg-white/50 font-sans"
                    aria-label="Pesquisar imóveis"
                    title="Digite nome de rua, bairro, cidade ou tipo de imóvel"
                  />
                  <div className="absolute inset-y-0 right-12 flex items-center group">
                    <HelpCircle size={14} className="text-primary/40 cursor-help" />
                    <div className="absolute bottom-full right-0 mb-2 w-72 bg-white p-3 rounded-md shadow-lg text-xs text-primary/80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <p className="mb-1 font-bold text-primary">Dicas de busca rápida:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li><span className="font-medium">Busca por rua:</span> Digite "Rua" ou "Av" seguido do nome</li>
                        <li><span className="font-medium">Características:</span> Busque por "piscina", "garagem", etc.</li>
                        <li><span className="font-medium">Localização:</span> Digite bairro ou cidade</li>
                        <li><span className="font-medium">Números:</span> Busque por número de quartos ou banheiros</li>
                      </ul>
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-accent text-white px-4 py-1.5 rounded-md text-sm font-display font-medium tracking-wide"
                  >
                    Buscar
                  </button>
                </form>
                <div className="flex flex-wrap gap-2 mt-3">
                  <button 
                    onClick={() => handleTypeSearch('Apartamento')}
                    className="text-xs bg-primary/5 hover:bg-primary/10 text-primary px-3 py-1.5 rounded-full transition-colors font-sans"
                  >
                    Apartamento
                  </button>
                  <button 
                    onClick={() => handleTypeSearch('Casa')}
                    className="text-xs bg-primary/5 hover:bg-primary/10 text-primary px-3 py-1.5 rounded-full transition-colors font-sans"
                  >
                    Casa
                  </button>
                  <button 
                    onClick={() => handleTypeSearch('Cobertura')}
                    className="text-xs bg-primary/5 hover:bg-primary/10 text-primary px-3 py-1.5 rounded-full transition-colors font-sans"
                  >
                    Cobertura
                  </button>
                  <button 
                    onClick={() => handleTypeSearch('Luxo')}
                    className="text-xs bg-primary/5 hover:bg-primary/10 text-primary px-3 py-1.5 rounded-full transition-colors font-sans"
                  >
                    Luxo
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-6 border border-accent/10">
                <div className="flex flex-col space-y-4">
                  <NavLinks mobile />
                  <div className="w-12 h-0.5 bg-accent/20 mx-auto my-2"></div>
                  <div className="flex items-center justify-center text-primary text-sm mb-3">
                    <MapPin size={16} className="text-accent mr-2" />
                    <span className="font-sans">Viamão, RS</span>
                  </div>
                  <a
                    href="https://wa.me/5551991861221"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-accent hover:bg-accent-light text-white px-5 py-3 rounded-md transition-all duration-300 font-display font-medium"
                  >
                    <Phone size={18} className="mr-2" />
                    <span>Fale Conosco</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

const NavLinks = ({ mobile = false, navLinkClass = 'text-primary hover:text-accent' }: { mobile?: boolean, navLinkClass?: string }) => {
  const location = useLocation();
  
  const links = [
    { path: '/', label: 'Início' },
    { path: '/about', label: 'Sobre' },
    { 
      path: '/properties', 
      label: 'Imóveis',
      hasSubmenu: true,
      submenu: [
        { path: '/properties?type=casa', label: 'Casas' },
        { path: '/properties?type=apartamento', label: 'Apartamentos' },
        { path: '/properties?type=cobertura', label: 'Coberturas' },
      ]
    },
    { path: '/contact', label: 'Contato' },
  ];

  return (
    <>
      {links.map((link) => (
        link.hasSubmenu && !mobile ? (
          <div key={link.path} className="relative group">
            <Link
              to={link.path}
              className={`${navLinkClass} transition-colors duration-300 relative py-2 font-display font-medium flex items-center uppercase text-sm tracking-wide ${location.pathname === link.path ? 'text-accent' : ''}`}
            >
              {link.label}
              <ChevronDown size={16} className="ml-1 transform group-hover:rotate-180 transition-transform duration-300" />
              {location.pathname === link.path && (
                <motion.span
                  layoutId="navbar-underline"
                  className="absolute left-0 -bottom-1 w-full h-0.5 bg-accent"
                />
              )}
            </Link>
            <div className="absolute left-0 top-full mt-1 w-48 hidden group-hover:block">
              <div className="py-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-accent/10">
                {link.submenu?.map((subitem) => (
                  <Link
                    key={subitem.path}
                    to={subitem.path}
                    className="block px-4 py-2 text-primary hover:text-accent hover:bg-primary/5 transition-colors font-sans text-sm"
                  >
                    {subitem.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Link
            key={link.path}
            to={link.path}
            className={`${
              mobile
                ? 'block py-3 text-primary hover:text-accent text-center transition-colors duration-300 font-display font-medium'
                : `${navLinkClass} transition-colors duration-300 relative py-2 font-display font-medium uppercase text-sm tracking-wide`
            } ${location.pathname === link.path ? 'text-accent' : ''}`}
          >
            {link.label}
            {!mobile && location.pathname === link.path && (
              <motion.span
                layoutId="navbar-underline"
                className="absolute left-0 -bottom-1 w-full h-0.5 bg-accent"
              />
            )}
          </Link>
        )
      ))}
    </>
  );
};

export default Navbar;