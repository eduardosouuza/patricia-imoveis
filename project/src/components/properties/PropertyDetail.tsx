import { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar, Home, ChevronLeft, ChevronRight, Map, LockKeyhole } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Property } from '../../types/property';
import { motion, AnimatePresence } from 'framer-motion';
import ContactForm from '../contact/ContactForm';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

const PropertyDetail = () => {
  const [searchParams] = useSearchParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { user } = useAuth();
  
  const propertyId = searchParams.get('id');

  useEffect(() => {
    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single();

      if (error) throw error;
      console.log('Dados do imóvel:', data);
      setProperty(data);
    } catch (error) {
      console.error('Erro ao carregar imóvel:', error);
      toast.error('Falha ao carregar detalhes do imóvel');
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousImage = useCallback(() => {
    if (!property) return;
    const allImages = property.image ? [property.image, ...(property.images || [])] : (property.images || []);
    setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [property]);

  const handleNextImage = useCallback(() => {
    if (!property) return;
    const allImages = property.image ? [property.image, ...(property.images || [])] : (property.images || []);
    setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [property]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextImage();
    }
    if (isRightSwipe) {
      handlePreviousImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-12">Carregando...</div>;
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-medium mb-4">Imóvel não encontrado</h2>
        <Link to="/properties" className="text-gold hover:underline">
          Voltar para todos os imóveis
        </Link>
      </div>
    );
  }

  // Combine main image with additional images
  const allImages = property.image ? [property.image, ...(property.images || [])] : (property.images || []);
  console.log('Todas as imagens:', allImages); // Adicionando log para debug

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link to="/properties" className="inline-flex items-center text-gold hover:underline mb-6">
          <ArrowLeft size={18} className="mr-2" />
          Voltar para todos os imóveis
        </Link>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-medium mb-2">{property.title}</h1>
            <div className="flex items-center text-primary bg-accent/10 px-3 py-1.5 rounded-full inline-block">
              <div className="bg-accent rounded-full p-1 mr-2 shadow-sm">
                <MapPin size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-medium">{property.location}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-3xl font-serif text-accent font-bold">{formatPrice(property.price)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {allImages.length > 0 ? (
            <div className="relative">
              <div 
                className="relative overflow-hidden rounded-lg"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={allImages[activeImageIndex]} 
                    alt={`${property.title} - Vista ${activeImageIndex + 1}`} 
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                  />
                </AnimatePresence>

                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePreviousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                      aria-label="Imagem anterior"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                      aria-label="Próxima imagem"
                    >
                      <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {allImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                          aria-label={`Ir para imagem ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              {allImages.length > 1 && (
                <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                  {allImages.map((image, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-full aspect-square overflow-hidden rounded-sm transition-all ${
                        index === activeImageIndex ? 'ring-2 ring-gold' : 'hover:opacity-80'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Miniatura ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-neutral-100 h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center rounded-lg">
              <div className="text-neutral-400">Nenhuma imagem disponível</div>
            </div>
          )}

          <div className="p-6 bg-white shadow-sm mt-8">
            <h2 className="text-2xl font-medium mb-4">Detalhes do Imóvel</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <div className="flex flex-col items-center p-4 bg-neutral-50">
                <Bed size={24} className="text-gold mb-2" />
                <span className="text-lg font-medium">{property.bedrooms}</span>
                <span className="text-neutral-600 text-sm">Quartos</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-neutral-50">
                <Bath size={24} className="text-gold mb-2" />
                <span className="text-lg font-medium">{property.bathrooms}</span>
                <span className="text-neutral-600 text-sm">Banheiros</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-neutral-50">
                <Square size={24} className="text-gold mb-2" />
                <span className="text-lg font-medium">{property.size}</span>
                <span className="text-neutral-600 text-sm">m²</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-neutral-50">
                <Calendar size={24} className="text-gold mb-2" />
                <span className="text-lg font-medium">{property?.property_type || 'Não informado'}</span>
                <span className="text-neutral-600 text-sm">Tipo de Imóvel</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-2">Descrição</h3>
              <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                {property.fullDescription || property.description}
              </p>
              
              {property.address && (
                <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                  <div className="flex items-start">
                    <MapPin className="text-accent mt-0.5 mr-2 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium text-primary text-sm">Endereço completo:</p>
                      <p className="text-primary/80 mt-1">{property.address}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 flex items-center">
                <Map className="mr-2 text-accent" size={20} />
                Localização
              </h3>
              
              <div className="bg-primary/5 p-4 rounded-lg mb-4">
                <div className="flex items-start">
                  <MapPin className="text-accent mt-1 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-primary">{property.location}</p>
                  </div>
                </div>
              </div>
              
              {/* Placeholder para futuro mapa - você pode adicionar uma API de mapas futuramente */}
              <div className="bg-secondary border border-primary/10 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <Map className="mx-auto text-primary/40 mb-2" size={32} />
                  <p className="text-primary/60 text-sm">Mapa disponível em breve</p>
                </div>
              </div>
            </div>

            {property.features && property.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-2">Características</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  {property.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-neutral-600">
                      <div className="h-2 w-2 bg-gold rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 shadow-sm sticky top-24">
            <h3 className="text-xl font-medium mb-4">Interessado neste imóvel?</h3>
            <p className="text-neutral-600 mb-6">
              Preencha o formulário abaixo e entrarei em contato em breve.
            </p>
            
            <ContactForm propertySuggestion={property.title} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;