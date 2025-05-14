import { ArrowRight, Phone, Home, Sun, MapPin, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CtaSection = () => {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      {/* Imagem de fundo com overlay gradiente */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Interior de Luxo"
          className="w-full h-full object-cover brightness-[1.05] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/75 to-primary/60"></div>
        
        {/* Padrão de fundo para dar textura */}
        <div className="absolute inset-0 pattern-art-deco opacity-10"></div>
      </div>

      {/* Elementos decorativos aprimorados */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary-light/20 rounded-full blur-2xl"></div>
      
      {/* Elemento do sol com animação suave */}
      <motion.div 
        className="absolute top-10 right-10 hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <Sun className="text-accent/40 w-16 h-16" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl border border-white/30 p-12 shadow-2xl relative overflow-hidden">
            {/* Gradiente de fundo do card */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 via-transparent to-accent/10 opacity-50"></div>
            
            {/* Elementos decorativos do card */}
            <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center relative z-10"
            >
              {/* Ícone com efeito de brilho */}
              <div className="mb-6 inline-block bg-accent/70 p-5 rounded-full shadow-lg border-4 border-accent/30 relative">
                <div className="absolute inset-0 rounded-full bg-accent animate-pulse opacity-30"></div>
                <Home className="text-white h-10 w-10 relative z-10" />
              </div>
              
              {/* Badge decorativa */}
              <div className="mb-4 inline-block px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-md">
                <span className="text-white font-display font-medium text-sm tracking-wide uppercase flex items-center">
                  <MapPin size={14} className="mr-1 text-accent" />
                  Seu Futuro Imóvel Aguarda
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 relative inline-block">
                Pronto para Encontrar seu 
                <span className="text-accent ml-2">Imóvel Ideal?</span>
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-white/95 mb-10 text-center max-w-2xl mx-auto relative z-10 leading-relaxed"
            >
              Vamos começar uma conversa sobre seus objetivos imobiliários e como podemos ajudá-lo a alcançá-los com nosso atendimento personalizado.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-5 justify-center relative z-10"
            >
              <Link 
                to="/contact" 
                className="bg-accent hover:bg-accent-light text-white px-8 py-4 rounded-lg inline-flex items-center justify-center font-display font-medium transition-all duration-300 shadow-lg hover:shadow-xl group transform hover:-translate-y-1"
              >
                <Zap className="mr-2" size={20} />
                <span>Agendar uma Consulta</span>
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              
              <Link 
                to="/properties" 
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg inline-flex items-center justify-center font-display font-medium transition-all duration-300 border border-white/30 backdrop-blur-sm group transform hover:-translate-y-1 shadow-md hover:shadow-lg"
              >
                <Home className="mr-2" size={18} />
                <span>Ver Propriedades Disponíveis</span>
                <ArrowRight size={18} className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos nos cantos */}
      <div className="absolute bottom-10 right-10 z-10 hidden lg:block">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 border-2 border-white/20 rounded-full"
        ></motion.div>
      </div>
      
      <div className="absolute top-20 left-20 z-10 hidden lg:block">
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="w-12 h-12 border-2 border-accent/50 rounded-full"
        ></motion.div>
      </div>
      
      {/* Degradê na parte inferior para transição suave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-secondary/30 via-transparent to-transparent"></div>
    </section>
  );
};

export default CtaSection;