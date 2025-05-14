import { useState, useEffect } from 'react';
import { Search, Home, Bed, Bath, Tag, Filter, Sliders, HelpCircle } from 'lucide-react';
import { PropertyFilter } from '../../types/property';
import { motion } from 'framer-motion';

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilter) => void;
  initialFilters?: PropertyFilter;
}

const PropertyFilters = ({ onFilterChange, initialFilters }: PropertyFiltersProps) => {
  const [filters, setFilters] = useState<PropertyFilter>({
    search: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: ''
  });
  
  const [isAdvancedVisible, setIsAdvancedVisible] = useState(false);
  
  // Aplicar filtros iniciais quando disponíveis
  useEffect(() => {
    if (initialFilters) {
      const hasInitialFilters = 
        initialFilters.search || 
        initialFilters.propertyType || 
        initialFilters.priceMin || 
        initialFilters.priceMax || 
        initialFilters.bedrooms || 
        initialFilters.bathrooms;
        
      if (hasInitialFilters) {
        setFilters(prev => ({
          ...prev,
          ...initialFilters
        }));
      }
    }
  }, [initialFilters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onFilterChange(filters);
    }
  };

  const handleReset = () => {
    setFilters({
      search: '',
      priceMin: '',
      priceMax: '',
      bedrooms: '',
      bathrooms: '',
      propertyType: ''
    });
    onFilterChange({
      search: '',
      priceMin: '',
      priceMax: '',
      bedrooms: '',
      bathrooms: '',
      propertyType: ''
    });
  };

  return (
    <div className="relative mb-12">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-secondary-dark/20"
      >
        <div className="flex items-center mb-6">
          <div className="flex-1">
            <h3 className="text-xl font-display font-semibold text-primary flex items-center">
              <Filter size={20} className="mr-2 text-accent" />
              Encontre Seu Imóvel Ideal
            </h3>
            <p className="text-primary/70 text-sm mt-1">Use os filtros para refinar sua busca</p>
          </div>
          <button 
            onClick={() => setIsAdvancedVisible(!isAdvancedVisible)}
            className="text-sm flex items-center font-medium text-accent hover:text-accent-dark transition-colors"
          >
            <Sliders size={16} className="mr-1" />
            {isAdvancedVisible ? 'Ocultar Filtros' : 'Mostrar Todos Filtros'}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Barra de Busca Principal */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-accent" />
              </div>
              <input
                type="text"
                id="search"
                name="search"
                value={filters.search}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Buscar por localização, título ou características..."
                className="w-full pl-10 py-3 pr-4 rounded-lg border border-secondary-dark/30 focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all font-sans"
                aria-label="Pesquisar imóveis"
                title="Dicas: Busque por nome de rua, bairro, cidade ou características. Pode usar múltiplas palavras."
              />
              <div className="absolute inset-y-0 right-10 flex items-center group">
                <HelpCircle size={14} className="text-primary/40 cursor-help" />
                <div className="absolute bottom-full right-0 mb-2 w-72 bg-white p-3 rounded-md shadow-lg text-xs text-primary/80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <p className="mb-1 font-bold text-primary">Dicas de busca avançada:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><span className="font-medium">Busca por rua:</span> Digite "Rua" ou "Av" seguido do nome (ex: "Rua Ipanema")</li>
                    <li><span className="font-medium">Palavras do anúncio:</span> Busque por palavras que aparecem na descrição (ex: "jardim", "varanda")</li>
                    <li><span className="font-medium">Múltiplas palavras:</span> Use espaços para combinar termos (ex: "Porto Alegre 3 quartos")</li>
                    <li><span className="font-medium">Palavras parciais:</span> Use parte de uma palavra (ex: "apart" para "apartamento")</li>
                  </ul>
                </div>
              </div>
            </div>
            <button 
              type="submit"
              className="bg-accent hover:bg-accent-light text-white rounded-lg px-8 py-3 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg font-display font-medium"
            >
              <Search size={18} className="mr-2" />
              Buscar
            </button>
          </div>

          {/* Filtros Rápidos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-secondary rounded-lg p-3 flex items-center border border-secondary-dark/10">
              <Home size={18} className="text-accent mr-2" />
              <select
                id="propertyType"
                name="propertyType"
                value={filters.propertyType}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:ring-0 text-primary py-1 font-sans text-sm"
              >
                <option value="">Todos os tipos</option>
                <option value="Casa">Casa</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Terreno">Terreno</option>
              </select>
            </div>
            
            <div className="bg-secondary rounded-lg p-3 flex items-center border border-secondary-dark/10">
              <Bed size={18} className="text-accent mr-2" />
              <select
                id="bedrooms"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:ring-0 text-primary py-1 font-sans text-sm"
              >
                <option value="">Quartos</option>
                <option value="1">1 ou mais</option>
                <option value="2">2 ou mais</option>
                <option value="3">3 ou mais</option>
                <option value="4">4 ou mais</option>
              </select>
            </div>
            
            <div className="bg-secondary rounded-lg p-3 flex items-center border border-secondary-dark/10">
              <Bath size={18} className="text-accent mr-2" />
              <select
                id="bathrooms"
                name="bathrooms"
                value={filters.bathrooms}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:ring-0 text-primary py-1 font-sans text-sm"
              >
                <option value="">Banheiros</option>
                <option value="1">1 ou mais</option>
                <option value="2">2 ou mais</option>
                <option value="3">3 ou mais</option>
                <option value="4">4 ou mais</option>
              </select>
            </div>
            
            <div className="bg-secondary rounded-lg p-3 flex items-center border border-secondary-dark/10">
              <Tag size={18} className="text-accent mr-2" />
              <select
                id="priceRange"
                name="priceRange"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value) {
                    const [min, max] = value.split('-');
                    setFilters(prev => ({ ...prev, priceMin: min, priceMax: max || '' }));
                  } else {
                    setFilters(prev => ({ ...prev, priceMin: '', priceMax: '' }));
                  }
                }}
                value={filters.priceMin && filters.priceMax ? `${filters.priceMin}-${filters.priceMax}` : 
                       filters.priceMin ? `${filters.priceMin}-` : ''}
                className="w-full bg-transparent border-none focus:ring-0 text-primary py-1 font-sans text-sm"
              >
                <option value="">Faixa de preço</option>
                <option value="0-500000">Até R$ 500.000</option>
                <option value="500000-1000000">R$ 500.000 - R$ 1.000.000</option>
                <option value="1000000-2000000">R$ 1.000.000 - R$ 2.000.000</option>
                <option value="2000000-">Acima de R$ 2.000.000</option>
              </select>
            </div>
          </div>

          {/* Filtros Avançados */}
          {isAdvancedVisible && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-secondary-dark/10 pt-6 mt-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div>
                  <label htmlFor="priceMin" className="block text-sm font-medium text-primary/80 mb-2">
                    Preço Mínimo
                  </label>
                  <input
                    type="number"
                    id="priceMin"
                    name="priceMin"
                    value={filters.priceMin}
                    onChange={handleChange}
                    placeholder="Ex: 500000"
                    min="0"
                    step="1000"
                    className="w-full p-3 border border-secondary-dark/30 rounded-lg focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all font-sans text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="priceMax" className="block text-sm font-medium text-primary/80 mb-2">
                    Preço Máximo
                  </label>
                  <input
                    type="number"
                    id="priceMax"
                    name="priceMax"
                    value={filters.priceMax}
                    onChange={handleChange}
                    placeholder="Ex: 1000000"
                    min="0"
                    step="1000"
                    className="w-full p-3 border border-secondary-dark/30 rounded-lg focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all font-sans text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button 
                  type="button"
                  onClick={handleReset}
                  className="text-primary hover:text-accent mr-4 font-medium text-sm"
                >
                  Limpar Filtros
                </button>
                <button 
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white rounded-lg px-6 py-2 text-sm transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                >
                  Aplicar Filtros
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>

      {/* Elemento decorativo */}
      <div className="absolute -z-10 w-64 h-64 bg-accent/5 rounded-full -top-10 -right-10 blur-3xl"></div>
      <div className="absolute -z-10 w-64 h-64 bg-primary/5 rounded-full -bottom-10 -left-10 blur-3xl"></div>
    </div>
  );
};

export default PropertyFilters;