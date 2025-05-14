import { useState, useEffect } from 'react';
import { ArrowRight, Home, Filter, ChevronRight, Search, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Property } from '../../types/property';
import PropertyCard from '../properties/PropertyCard';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      // Primeiro, obter o número total de imóveis em destaque
      const { count, error: countError } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .eq('featured', true)
        .eq('status', 'available');
      
      if (countError) throw countError;
      setTotalCount(count || 0);
      
      // Agora, buscar todos os imóveis em destaque (sem limite)
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('featured', true)
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Erro ao carregar imóveis em destaque:', error);
      toast.error('Falha ao carregar imóveis em destaque');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="loader"></div>
      </div>
    );
  }

  if (properties.length === 0) {
    return null;
  }

  const priceRange = properties.length > 0 
    ? {
        min: Math.min(...properties.map(p => p.price)),
        max: Math.max(...properties.map(p => p.price))
      }
    : { min: 0, max: 0 };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    });
  };

  // Determinar quais propriedades mostrar (todas ou apenas as primeiras 6)
  const displayProperties = showAll ? properties : properties.slice(0, 6);
  const hasMoreProperties = properties.length > 6;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Fundo com gradiente e textura */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary-light rich-bg"></div>
      
      {/* Elementos decorativos aprimorados */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full border-8 border-primary/5 blur-2xl opacity-70"></div>
      <div className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] rounded-full border-8 border-accent/5 blur-2xl opacity-70"></div>
      <div className="absolute top-40 left-1/4 w-32 h-32 rounded-full bg-accent/5 blur-xl"></div>
      <div className="absolute bottom-40 right-1/4 w-48 h-48 rounded-full bg-primary/5 blur-xl"></div>
      
      {/* Padrão de fundo sutil */}
      <div className="absolute inset-0 pattern-luxury opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            {/* Cabeçalho elegante com animação */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative mb-6"
            >
              {/* Elemento decorativo lateral */}
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-3 h-14 bg-gradient-to-b from-accent to-accent-dark rounded-r-md"></div>
              
              <h2 className="section-title relative inline-block">
                Imóveis em Destaque
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: '50%' }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-1 left-0 h-[3px] bg-accent/30 rounded-full"
                ></motion.span>
              </h2>
            </motion.div>
            
            {/* Descrição com estilo aprimorado */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-neutral-900/90 max-w-2xl leading-relaxed text-lg"
            >
              Descubra nossa seleção exclusiva de {totalCount} propriedades extraordinárias em destaque 
              {properties.length > 0 && (
                <>
                  {' '}com valores entre{' '}
                  <span className="text-accent font-semibold gold-metallic">{formatPrice(priceRange.min)}</span> e{' '}
                  <span className="text-accent font-semibold gold-metallic">{formatPrice(priceRange.max)}</span>
                </>
              )}.
            </motion.p>
          </div>
          
          {/* Botão de ação "Ver Todos os Imóveis" */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-6 md:mt-0"
          >
            <Link 
              to="/properties" 
              className="flex items-center bg-gradient-to-r from-accent/20 to-accent/10 hover:from-accent/30 hover:to-accent/20 text-accent rounded-xl px-6 py-3.5 transition-all duration-300 group shadow-md hover:shadow-lg font-medium tracking-wide transform hover:-translate-y-1 border border-accent/10"
            >
              <Search size={18} className="mr-2" />
              <span>Ver Todos os Imóveis</span>
              <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Grade de cards de propriedades com animação */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {displayProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>

        {/* Botão para ver mais imóveis (se existirem mais de 6) */}
        {hasMoreProperties && !showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary/15 to-primary/10 hover:from-primary/25 hover:to-primary/15 text-primary rounded-xl transition-all duration-300 group shadow-md hover:shadow-lg font-medium tracking-wide transform hover:-translate-y-1 border border-primary/10"
            >
              <span>Ver Mais Imóveis em Destaque</span>
              <ChevronRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}

        {/* Card de CTA aprimorado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-accent/20 relative overflow-hidden max-w-2xl w-full">
            {/* Fundo decorativo com gradiente */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50"></div>
            
            {/* Elementos decorativos */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-accent/5 rounded-full translate-x-[-50%] translate-y-[-50%] blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-primary/5 rounded-full translate-x-[30%] translate-y-[30%] blur-xl"></div>
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center">
                <div className="bg-primary/10 p-3 rounded-xl mr-4">
                  <Clock className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-primary font-display font-semibold text-lg mb-1">Não encontrou o que procura?</h3>
                  <p className="text-primary/80">Fale com nossos especialistas para um atendimento personalizado</p>
                </div>
              </div>
              <div>
                <a 
                  href="https://wa.me/5551991861221" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-lg transition-all duration-300 group font-medium tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  <Home className="mr-2" size={18} />
                  <span>Fale Conosco</span>
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Degradê na parte inferior para transição suave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary/5 via-transparent to-transparent"></div>
    </section>
  );
};

export default FeaturedProperties;