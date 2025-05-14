import { motion } from 'framer-motion';
import { Home, Building2, Shield, Heart, Quote, Star, Sun, Award } from 'lucide-react';

const Testimonials = () => {
  const features = [
    {
      icon: <Home className="w-10 h-10 text-accent" />,
      title: <span><span className="text-white">Imóveis</span> <span className="text-accent">Exclusivos</span></span>,
      description: 'Seleção criteriosa das melhores propriedades do mercado.'
    },
    {
      icon: <Building2 className="w-10 h-10 text-accent" />,
      title: <span><span className="text-white">Localização</span> <span className="text-accent">Premium</span></span>,
      description: 'Propriedades em áreas nobres e valorizadas.'
    },
    {
      icon: <Shield className="w-10 h-10 text-accent" />,
      title: <span><span className="text-white">Segurança</span> <span className="text-accent">Garantida</span></span>,
      description: 'Processo seguro e transparente em todas as etapas.'
    },
    {
      icon: <Heart className="w-10 h-10 text-accent" />,
      title: <span><span className="text-white">Atendimento</span> <span className="text-accent">Personalizado</span></span>,
      description: 'Dedicação total para encontrar o imóvel ideal para você.'
    }
  ];

  return (
    <section className="py-28 bg-primary text-white relative overflow-hidden">
      {/* Fundo com padrões */}
      <div className="absolute inset-0 pattern-art-deco opacity-5"></div>
      
      {/* Efeitos de luz aprimorados */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-20 bottom-40 w-60 h-60 bg-accent/5 rounded-full blur-2xl"></div>
      <div className="absolute top-1/3 right-10 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
      
      {/* Elementos decorativos */}
      <motion.div 
        className="absolute top-20 right-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <Sun className="w-20 h-20 text-accent/20" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 left-20"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <Award className="w-16 h-16 text-white/10" />
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Badge decorativa */}
          <div className="inline-block mb-4 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 shadow-lg">
            <span className="text-white font-display font-medium text-sm tracking-wide uppercase">
              <span className="text-accent">•</span> Excelência em Serviços <span className="text-accent">•</span>
            </span>
          </div>
          
          {/* Título com efeitos */}
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 relative inline-block">
            Por que Escolher a 
            <span className="text-accent ml-2 relative">
              Patricia
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -bottom-2 left-0 h-1 bg-accent/50 rounded-full"
              ></motion.span>
            </span>
          </h2>
          
          <p className="text-white/90 max-w-3xl mx-auto text-lg font-medium">
            Com 1 ano de experiência no mercado imobiliário, 
            ofereço um serviço exclusivo e personalizado para cada cliente.
          </p>
        </motion.div>

        {/* Cards de benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 transition-all duration-300 group-hover:bg-white/15 group-hover:-translate-y-2 shadow-lg hover:shadow-xl h-full flex flex-col items-center justify-center relative overflow-hidden">
                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-top-left rounded-xl"></div>
                
                {/* Elemento decorativo superior */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
                <div className="bg-primary-light/40 inline-flex rounded-xl p-4 mb-6 relative z-10 group-hover:bg-accent/20 transition-colors duration-300 shadow-md">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-display font-semibold mb-4 text-center relative z-10">{feature.title}</h3>
                
                <p className="text-white/80 text-center relative z-10">{feature.description}</p>
                
                {/* Elemento decorativo no canto do card */}
                <div className="absolute bottom-2 right-2 opacity-20 group-hover:opacity-50 transition-opacity duration-300">
                  <Star className="w-6 h-6 text-accent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Depoimento com design sofisticado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 relative"
        >
          <div className="max-w-4xl mx-auto bg-white/15 backdrop-blur-md border border-white/20 rounded-xl p-10 md:p-12 text-center relative shadow-xl">
            {/* Elementos decorativos do card */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 via-transparent to-accent/10 opacity-50 rounded-xl"></div>
            
            {/* Ícone de aspas ornamentado */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-accent rounded-full p-4 shadow-lg border-4 border-primary">
              <Quote className="w-6 h-6 text-white" />
            </div>
            
            {/* Padrão decorativo */}
            <div className="absolute top-0 left-0 w-full h-full pattern-luxury opacity-5 rounded-xl"></div>
            
            <div className="relative z-10">
              <p className="text-2xl font-display italic text-white leading-relaxed mb-8">
                "Meu compromisso é transformar sonhos em realidade, oferecendo não apenas 
                imóveis excepcionais, mas uma experiência completa de consultoria imobiliária."
              </p>
              
              <div className="flex items-center justify-center">
                <div className="w-14 h-0.5 bg-accent/40 rounded-full mr-4"></div>
                <div className="text-center">
                  <p className="font-display font-semibold text-white text-lg">Patricia</p>
                  <p className="text-accent">Consultora Imobiliária</p>
                </div>
                <div className="w-14 h-0.5 bg-accent/40 rounded-full ml-4"></div>
              </div>
              
              {/* Avaliação com estrelas */}
              <div className="flex items-center justify-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent mx-0.5 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Degradê para transição suave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-secondary/10 via-transparent to-transparent"></div>
    </section>
  );
};

export default Testimonials;