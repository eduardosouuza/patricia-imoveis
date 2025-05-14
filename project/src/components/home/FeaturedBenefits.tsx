import { motion } from 'framer-motion';
import { Home, Award, Shield, Clock, Zap, ChevronRight } from 'lucide-react';

const FeaturedBenefits = () => {
  const benefits = [
    {
      title: 'Propriedades Exclusivas',
      description: 'Acesso a imóveis que você não encontrará em outros lugares, com localização privilegiada e acabamento premium',
      icon: <Home className="text-accent w-6 h-6" />,
      delay: 0,
    },
    {
      title: 'Atendimento Premium',
      description: 'Serviço personalizado e consultores especializados para atender todas as suas necessidades imobiliárias',
      icon: <Award className="text-accent w-6 h-6" />,
      delay: 0.1,
    },
    {
      title: 'Transparência Total',
      description: 'Processo claro e honesto do início ao fim, sem surpresas ou taxas ocultas durante a negociação',
      icon: <Shield className="text-accent w-6 h-6" />,
      delay: 0.2,
    },
    {
      title: 'Resposta Rápida',
      description: 'Atendimento ágil e eficiente para todas as suas dúvidas, com canais diretos de comunicação 24/7',
      icon: <Clock className="text-accent w-6 h-6" />,
      delay: 0.3,
    },
  ];

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Efeitos decorativos aprimorados */}
      <div className="absolute -left-20 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -right-20 bottom-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute top-40 left-1/4 w-48 h-48 rounded-full bg-accent/8 blur-2xl"></div>
      <div className="absolute bottom-40 right-1/4 w-56 h-56 rounded-full bg-white/8 blur-2xl"></div>
      
      {/* Padrão de fundo elegante */}
      <div className="absolute inset-0 pattern-art-deco opacity-10"></div>
      
      {/* Gradiente radial para profundidade */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-accent/5 to-transparent opacity-80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16 text-contrast"
          >
            {/* Elementos decorativos ao redor do título */}
            <div className="relative inline-block">
              {/* Linhas decorativas */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -left-20 top-1/2 h-[2px] bg-accent/40"
              ></motion.div>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -right-20 top-1/2 h-[2px] bg-accent/40"
              ></motion.div>
              
              {/* Badge aprimorada */}
              <div className="inline-block mb-3">
                <span className="text-white font-display font-medium text-sm px-5 py-2 rounded-full bg-white/15 backdrop-blur-sm tracking-wide uppercase border border-white/10 shadow-lg">
                  <span className="text-accent">•</span> Por que escolher <span className="text-accent">•</span>
                </span>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white relative mb-4">
              Vantagens 
              <span className="relative ml-2">
                <span className="relative z-10 text-accent">exclusivas</span>
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-1 left-0 h-[3px] bg-accent/40 rounded-full"
                ></motion.span>
              </span>
            </h2>
            
            <p className="text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed font-sans text-lg">
              Descubra por que tantas famílias confiam em nossos serviços para encontrar o imóvel dos seus sonhos
            </p>
          </motion.div>

          {/* Grid de benefícios aprimorado */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: benefit.delay }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-primary-light/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full shadow-md hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 relative overflow-hidden text-contrast">
                  {/* Efeito de brilho no hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-top-left rounded-xl"></div>
                  
                  {/* Borda decorativa */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Ícone aprimorado */}
                    <div className="rounded-xl bg-accent/20 p-3 inline-block mb-4 group-hover:bg-accent/30 transition-colors duration-300 shadow-sm">
                      {benefit.icon}
                    </div>
                    
                    <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    
                    <p className="text-white/90 text-sm leading-relaxed font-sans">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Card de CTA aprimorado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white/15 backdrop-blur-md rounded-xl p-6 mt-16 border border-white/15 relative overflow-hidden text-contrast shadow-lg"
          >
            {/* Fundo com gradiente */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-light/15 via-transparent to-accent/10 opacity-40"></div>
            
            {/* Padrão decorativo */}
            <div className="absolute inset-0 pattern-luxury opacity-5"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-accent p-3 rounded-lg shadow-lg">
                  <Zap className="text-white w-5 h-5" />
                </div>
                <p className="text-white ml-4 font-display font-medium text-lg">
                  Atendimento rápido e personalizado para ajudar na sua busca
                </p>
              </div>
              <div>
                <a 
                  href="https://wa.me/5551984598285" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-lg inline-flex items-center transition-all duration-300 font-display font-medium tracking-wide border border-accent hover:border-accent-light shadow-md hover:shadow-lg transform hover:-translate-y-1 group"
                >
                  <span>Fale Agora</span>
                  <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Degradê de transição para baixo */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-accent/5 via-transparent to-transparent z-[1]"></div>
    </section>
  );
};

export default FeaturedBenefits; 