import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Property, PropertyFilter } from '../types/property';
import PropertyFilters from '../components/properties/PropertyFilters';
import PropertyCard from '../components/properties/PropertyCard';
import PropertyDetail from '../components/properties/PropertyDetail';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const Properties = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialFilters, setInitialFilters] = useState<PropertyFilter>({
    search: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: ''
  });
  
  const propertyId = searchParams.get('id');
  const searchTerm = searchParams.get('search');
  const propertyType = searchParams.get('type');

  useEffect(() => {
    fetchProperties();
    
    // Atualizar filtros iniciais com base nos parâmetros da URL
    const updatedFilters: PropertyFilter = {
      search: searchTerm || '',
      priceMin: '',
      priceMax: '',
      bedrooms: '',
      bathrooms: '',
      propertyType: propertyType || ''
    };
    
    setInitialFilters(updatedFilters);
    
    // Se temos filtros na URL, aplicá-los quando a página carregar
    if (searchTerm || propertyType) {
      setTimeout(() => {
        handleFilterChange(updatedFilters);
      }, 500); // Pequeno atraso para garantir que os dados foram carregados
    }
  }, [searchTerm, propertyType]);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const validProperties = data?.filter(property => 
        property && 
        property.id && 
        property.title && 
        property.price && 
        property.location
      ) || [];
      
      // Log para verificar os dados
      console.log('Propriedades carregadas:', validProperties);
      console.log('Localização das propriedades:', validProperties.map(p => p.location));
      
      setProperties(validProperties);
      setFilteredProperties(validProperties);
    } catch (error) {
      console.error('Erro ao carregar imóveis:', error);
      toast.error('Falha ao carregar imóveis');
    } finally {
      setLoading(false);
    }
  };

  // If a specific property is selected, show the property detail view
  if (propertyId) {
    return <PropertyDetail />;
  }

  const handleFilterChange = async (filters: PropertyFilter) => {
    try {
      console.log('Filtros recebidos:', filters);
      
      // Buscar todas as propriedades disponíveis primeiro
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Erro ao buscar propriedades:', error);
        throw error;
      }
      
      // Filtragem no frontend (mais confiável para termos de busca complexos)
      let filteredData = data || [];
      
      // Filtrar por termo de busca com pesquisa avançada e foco em ruas
      if (filters.search && filteredData.length > 0) {
        // Normalizar e dividir termos de busca
        const searchInput = filters.search.toLowerCase().trim();
        const searchTerms = searchInput.split(/\s+/).filter(term => term.length > 0);
        console.log('Termos de busca:', searchTerms);
        
        // Padrões para detecção de ruas e números
        const streetPrefixes = ['r ', 'r. ', 'rua ', 'av ', 'av. ', 'avenida ', 'travessa ', 'alameda ', 'estrada '];
        const isStreetSearch = streetPrefixes.some(prefix => searchInput.includes(prefix));
        
        // Verificar se há busca específica por padrões de rua
        const streetPattern = /\b(r|rua|av|avenida|travessa|alameda|estrada)\b\.?\s+([a-zçáàâãéèêíïóôõöúüñ]+)/i;
        const streetMatch = searchInput.match(streetPattern);
        
        console.log('Detectada busca por rua:', isStreetSearch, streetMatch);
        
        filteredData = filteredData.filter(property => {
          // Extrair textos relevantes do imóvel para busca
          const title = property.title?.toLowerCase() || '';
          const location = property.location?.toLowerCase() || '';
          const description = property.description?.toLowerCase() || '';
          const propertyType = property.property_type?.toLowerCase() || '';
          const features = property.features ? 
            (Array.isArray(property.features) ? property.features.join(' ').toLowerCase() : String(property.features).toLowerCase()) 
            : '';
          
          // Extrair amenidades/características
          const amenities = property.amenities ? 
            (Array.isArray(property.amenities) ? property.amenities.join(' ').toLowerCase() : String(property.amenities).toLowerCase()) 
            : '';
          
          // Texto completo para busca (todas as informações relevantes do imóvel)
          const fullText = `${title} ${location} ${description} ${propertyType} ${features} ${amenities}`;
          
          // Dividir endereço em componentes para busca específica de ruas
          const addressParts = location.split(/,\s*|\s+-\s*|\s+/).map(part => part.trim()).filter(part => part.length > 0);
          
          // Se for busca específica por rua, dar prioridade à correspondência no campo de localização
          if (isStreetSearch && streetMatch && streetMatch.length > 1) {
            const streetTerm = streetMatch[2].toLowerCase(); // A parte do nome da rua
            
            // Procurar especificamente por correspondência de rua no campo de localização
            const hasStreetMatch = addressParts.some((part: string) => {
              // Verificar se a parte é um nome de rua
              const isStreetName = streetPrefixes.some(prefix => 
                part.startsWith(prefix) || 
                (addressParts.indexOf(part) > 0 && addressParts[addressParts.indexOf(part)-1].match(/^(r|rua|av|avenida|travessa|alameda|estrada)\.?$/i))
              );
              
              return isStreetName && part.includes(streetTerm);
            });
            
            // Se temos uma correspondência específica de rua, priorizamos
            if (hasStreetMatch) return true;
          }
          
          // Verificar se cada termo de busca corresponde a pelo menos uma parte do texto
          return searchTerms.every(term => {
            // Verificar correspondência em componentes específicos
            const titleMatch = title.includes(term);
            const locationMatch = location.includes(term);
            const descriptionMatch = description.includes(term);
            const typeMatch = propertyType.includes(term);
            const featuresMatch = features.includes(term);
            const amenitiesMatch = amenities.includes(term);
            
            // Verificar correspondência específica de rua
            const streetMatch = addressParts.some((part: string) => 
              part.includes(term) || // Parte exata
              (part.length > 3 && term.length > 3 && part.includes(term.substring(0, 3))) // Primeiras letras de palavra longa
            );
            
            // Verificar correspondência em qualquer parte do texto completo
            const fullTextMatch = fullText.includes(term);
            
            // Detecção de padrões numéricos (para números de rua, CEP, etc.)
            const isNumeric = /^\d+$/.test(term);
            const hasNumericMatch = isNumeric && location.match(new RegExp(`\\b${term}\\b`));
            
            // Para termos curtos (possíveis códigos, abreviações)
            const isShortTerm = term.length <= 3;
            
            // Verifica cada tipo de correspondência
            return titleMatch || locationMatch || descriptionMatch || typeMatch || 
                   featuresMatch || amenitiesMatch || streetMatch || fullTextMatch || 
                   (isNumeric && hasNumericMatch) || (isShortTerm && fullText.includes(term));
          });
        });
        
        // Se não houver resultados, tente uma busca mais flexível
        if (filteredData.length === 0 && searchTerms.length > 0) {
          console.log('Tentando busca flexível...');
          
          // Tentativa 1: Buscar apenas com o primeiro termo
          let flexibleData = data.filter(property => {
            const fullText = `${property.title || ''} ${property.location || ''} ${property.description || ''} ${property.property_type || ''}`.toLowerCase();
            return fullText.includes(searchTerms[0]);
          });
          
          // Tentativa 2: Se ainda não tem resultados e o termo tem mais de 3 caracteres, buscar por substring
          if (flexibleData.length === 0 && searchTerms[0].length > 3) {
            const substringTerm = searchTerms[0].substring(0, 3); // Primeiras 3 letras
            flexibleData = data.filter(property => {
              const fullText = `${property.title || ''} ${property.location || ''} ${property.description || ''}`.toLowerCase();
              return fullText.includes(substringTerm);
            });
          }
          
          if (flexibleData.length > 0) {
            filteredData = flexibleData;
          }
        }
      }
      
      // Filtrar por tipo de propriedade
      if (filters.propertyType && filteredData.length > 0) {
        filteredData = filteredData.filter(property => 
          property.property_type && 
          property.property_type.toLowerCase() === filters.propertyType?.toLowerCase()
        );
      }
      
      // Filtrar por preço mínimo
      if (filters.priceMin && filteredData.length > 0) {
        const minPrice = parseFloat(filters.priceMin);
        filteredData = filteredData.filter(property => 
          property.price && property.price >= minPrice
        );
      }
      
      // Filtrar por preço máximo
      if (filters.priceMax && filteredData.length > 0) {
        const maxPrice = parseFloat(filters.priceMax);
        filteredData = filteredData.filter(property => 
          property.price && property.price <= maxPrice
        );
      }
      
      // Filtrar por quartos
      if (filters.bedrooms && filteredData.length > 0) {
        const minBedrooms = parseInt(filters.bedrooms);
        filteredData = filteredData.filter(property => 
          property.bedrooms && property.bedrooms >= minBedrooms
        );
      }
      
      // Filtrar por banheiros
      if (filters.bathrooms && filteredData.length > 0) {
        const minBathrooms = parseInt(filters.bathrooms);
        filteredData = filteredData.filter(property => 
          property.bathrooms && property.bathrooms >= minBathrooms
        );
      }

      console.log('Propriedades filtradas:', filteredData);
      setFilteredProperties(filteredData);
    } catch (error) {
      console.error('Erro detalhado ao filtrar imóveis:', error);
      toast.error('Falha ao filtrar imóveis. Por favor, tente novamente.');
    }
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      priceMin: '',
      priceMax: '',
      bedrooms: '',
      bathrooms: '',
      propertyType: ''
    };
    
    // Aplicar os filtros vazios para restaurar todos os imóveis
    handleFilterChange(resetFilters);
  };

  return (
    <div>
      {/* Page Header */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-primary-dark to-primary relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl text-white"
          >
            <div className="inline-block mb-3 bg-accent/80 backdrop-blur-sm px-4 py-1.5 rounded-full">
              <span className="text-sm font-display font-medium tracking-wide uppercase">Nossos Imóveis</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight text-white">
              Encontre seu <br/> 
              <span className="text-accent font-serif italic relative">
                Imóvel Perfeito
                <span className="absolute -bottom-2 left-0 h-1 w-full bg-accent/50 rounded-full"></span>
              </span>
            </h1>
            <p className="text-white/90 text-lg max-w-2xl font-light leading-relaxed">
              Navegue por nossa seleção exclusiva de imóveis de alto padrão. Use os filtros para refinar sua busca e encontrar o imóvel ideal para você e sua família.
            </p>
          </motion.div>
        </div>
        
        {/* Divisor de onda */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="fill-secondary">
            <path d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,48C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Properties Listing */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <PropertyFilters 
            onFilterChange={handleFilterChange}
            initialFilters={initialFilters}
          />

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="loader"></div>
            </div>
          ) : filteredProperties.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-12 text-center my-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-primary mb-3">Nenhum imóvel encontrado</h3>
              <p className="text-primary/70 mb-6">Tente ajustar seus filtros para ver mais resultados</p>
              <button 
                onClick={handleReset}
                className="inline-flex items-center px-5 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Limpar Filtros
              </button>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="bg-accent/10 text-accent rounded-full w-10 h-10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-primary font-medium">
                      Mostrando <span className="text-accent font-semibold">{filteredProperties.length}</span> {filteredProperties.length === 1 ? 'imóvel' : 'imóveis'}
                    </p>
                  </div>
                </div>
                
                <div className="hidden md:block">
                  <select 
                    className="bg-secondary border border-secondary-dark/20 text-primary rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                    onChange={() => {/* Implementar ordenação futura */}}
                  >
                    <option value="newest">Mais recentes</option>
                    <option value="price_asc">Menor preço</option>
                    <option value="price_desc">Maior preço</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Properties;