import { ArrowRight, Search, Home, MapPin, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Property } from '../../types/property';
import { supabase } from '../../lib/supabase';

const Hero = () => {
  const [featuredProperty, setFeaturedProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProperty = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('featured', true)
          .eq('status', 'available')
          .order('price', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.error('Erro ao buscar imóvel em destaque:', error);
        } else if (data) {
          setFeaturedProperty(data);
        }
      } catch (error) {
        console.error('Erro ao buscar imóvel em destaque:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperty();
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="relative min-h-screen flex items-center pt-8 overflow-hidden">
      {/* Background da seção Hero */}
      <div className="absolute inset-0 z-0 bg-primary">
        {/* Vídeo ou Imagem principal */}
        <img 
          src="images/chave-de-mao.jpg" 
          alt="Casa de Luxo" 
          className="w-full h-full object-cover brightness-105 scale-105 object-[37%_center]"
        />
        {/* Overlay com gradiente aprimorado */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/65 to-transparent"></div>
        
        {/* Padrão sutil sobreposto na imagem de fundo */}
        <div className="absolute inset-0 pattern-art-deco opacity-10"></div>
      </div>

      {/* Elementos decorativos flutuantes com animação */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 0.35 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-1/3 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
      ></motion.div>
      
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 0.25 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-1/3 left-10 w-96 h-96 bg-white/20 rounded-full blur-3xl"
      ></motion.div>
      
      {/* Elemento decorativo adicional */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0.1 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full bg-gradient-to-br from-primary-light/15 via-transparent to-accent/15 blur-3xl"
      ></motion.div>

      <div className="container mx-auto px-4 relative z-10 pt-16 md:pt-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mb-12 lg:mb-0"
          >
            {/* Badge decorativa no topo */}
            <div className="text-white mb-3 inline-block px-5 py-2 bg-accent/90 backdrop-blur-sm rounded-full shadow-lg">
              <span className="text-sm font-display font-medium tracking-wide uppercase flex items-center">
                <Gem size={16} className="mr-2" />
                Experiência Imobiliária Premium
              </span>
            </div>
            
            {/* Título principal com efeitos visuais aprimorados */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
              Descubra seu 
              <div className="relative inline-block mt-2">
                <span className="relative z-10 text-accent font-display font-bold">
                  Imóvel dos Sonhos
                </span>
                {/* Linha decorativa animada sob o texto */}
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute -bottom-3 left-0 h-1.5 bg-accent/60 rounded-full"
                ></motion.span>
                {/* Segunda linha decorativa para efeito de profundidade */}
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: '80%' }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="absolute -bottom-6 left-[10%] h-1 bg-accent/30 rounded-full"
                ></motion.span>
              </div>
            </h1>
            
            {/* Subtítulo com efeito de sombra para melhor legibilidade */}
            <p className="text-lg md:text-xl text-white/95 mb-8 max-w-xl leading-relaxed font-sans font-medium tracking-wide text-shadow-sm">
              Conectamos você aos melhores imóveis do mercado, com atendimento personalizado e exclusivo para realizar seu sonho.
            </p>
            
            {/* Botões de ação aprimorados */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/properties" 
                className="bg-accent hover:bg-accent-light text-white px-8 py-4 rounded-lg flex items-center justify-center sm:justify-start transition-all duration-300 shadow-lg hover:shadow-xl group font-display font-medium tracking-wide relative overflow-hidden"
              >
                {/* Efeito de brilho no hover */}
                <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-500 ease-out group-hover:w-full"></span>
                <span className="relative z-10 flex items-center">
                  <Search size={18} className="mr-2" />
                  Buscar Imóveis
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
              
              <Link 
                to="/contact" 
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg flex items-center justify-center sm:justify-start transition-all duration-300 border border-white/40 backdrop-blur-sm font-display font-medium tracking-wide group relative overflow-hidden"
              >
                {/* Efeito sutile de borda brilhante */}
                <span className="absolute inset-0 border border-white/0 group-hover:border-white/40 rounded-lg scale-90 group-hover:scale-100 transition-all duration-500"></span>
                <span className="relative z-10 flex items-center">
                  <Home size={18} className="mr-2" />
                  Falar com Corretor
                </span>
              </Link>
            </div>
            
            {/* Indicador de rolagem animado */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="hidden sm:flex items-center mt-12 text-white/70"
            >
              <div className="flex flex-col items-center mr-3">
                <div className="w-5 h-10 border border-white/30 rounded-full flex justify-center p-1">
                  <motion.div 
                    initial={{ y: 0 }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 bg-white rounded-full"
                  />
                </div>
              </div>
              <span className="text-sm font-medium">Role para descobrir</span>
            </motion.div>
          </motion.div>

          {/* Card de imóvel em destaque aprimorado */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative z-50 lg:-mt-20"
          >
            {!loading && featuredProperty && (
              <div className="relative mt-0 mb-[-60px]">
                {/* Elementos decorativos */}
                <div className="absolute -left-12 -top-12 w-32 h-32 bg-accent/15 rounded-full blur-xl"></div>
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary-light/25 rounded-full blur-xl"></div>
                
                {/* Padrão decorativo */}
                <div className="absolute inset-4 -z-10 pattern-art-deco opacity-5 rounded-xl"></div>
                
                {/* Border decorativa animada */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -left-4 -top-4 w-full h-full border-2 border-accent/30 rounded-2xl"
                  style={{ 
                    background: 'linear-gradient(120deg, rgba(210, 176, 72, 0.1), rgba(210, 176, 72, 0), rgba(210, 176, 72, 0.1))',
                  }}
                ></motion.div>
                
                {/* Segunda borda decorativa com efeito de rotação */}
                <motion.div 
                  initial={{ opacity: 0, rotate: -5 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="absolute -left-2 -top-8 w-full h-full border border-white/20 rounded-2xl"
                ></motion.div>
                
                {/* Card principal */}
                <div className="bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] relative overflow-hidden">
                  {/* Fundo do card com gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 via-transparent to-accent/10 opacity-70"></div>
                  
                  <div className="relative z-10">
                    {/* Faixa de destaque redesenhada */}
                    <div className="absolute -top-6 -left-6 w-28 h-16 bg-accent/90 rotate-[-45deg] flex items-center justify-center shadow-lg">
                      <span className="text-xs font-display font-medium text-white transform rotate-[45deg] ml-5 mt-1 flex items-center">
                        <Gem size={12} className="mr-1" />
                        Destaque
                      </span>
                    </div>

                    {/* Contêiner da imagem com mais efeitos */}
                    <div className="relative w-72 h-72 overflow-hidden rounded-xl shadow-lg group">
                      {/* Imagem com efeito zoom suave no hover */}
                      <img 
                        src={featuredProperty.image || 'images/casa2.jpg'} 
                        alt={featuredProperty.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = 'images/casa2.jpg';
                        }}
                      />
                      
                      {/* Gradiente sobre a imagem aprimorado */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-70"></div>
                      
                      {/* Badge de localização */}
                      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                        <MapPin size={14} className="mr-1 text-accent" />
                        <span className="text-white text-xs font-medium">{featuredProperty.location || 'Centro'}</span>
                      </div>
                      
                      {/* Informações do imóvel com animação no hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300 text-contrast">
                        <div className="text-white font-display font-medium text-lg">
                          {featuredProperty.title}
                        </div>
                        <div className="flex items-center mt-2">
                          <span className="text-white/90 text-xs mr-2 flex items-center">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full mr-1"></span>
                            {featuredProperty.bedrooms} quartos
                          </span>
                          <span className="w-1 h-1 bg-accent rounded-full"></span>
                          <span className="text-white/90 text-xs ml-2 flex items-center">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full mr-1"></span>
                            {featuredProperty.area || featuredProperty.size || 0} m²
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Seção de informações e CTA */}
                    <div className="mt-4 bg-white/10 p-4 rounded-xl border border-white/15 backdrop-blur-sm">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs text-white/80 font-sans uppercase tracking-wide">Valor a partir de</div>
                          <div className="text-2xl text-accent font-display font-semibold gold-metallic">
                            {formatPrice(featuredProperty.price)}
                          </div>
                        </div>
                        <Link 
                          to={`/properties/${featuredProperty.id}`}
                          className="bg-accent hover:bg-accent-light text-white text-xs px-4 py-2.5 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center font-display group"
                        >
                          Ver detalhes
                          <ArrowRight size={14} className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Indicadores decorativos na parte inferior */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="w-3 h-3 bg-white/70 rounded-full"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="w-5 h-5 bg-accent/80 rounded-full ring-4 ring-accent/20"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="w-3 h-3 bg-white/70 rounded-full"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="w-3 h-3 bg-white/70 rounded-full"
        ></motion.div>
      </div>

      {/* Degradê na divisão entre Hero e FeaturedBenefits */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent z-[1]"></div>
    </div>
  );
};

export default Hero;