import { motion } from 'framer-motion';
import { ArrowRight, Award, Clock, User, Heart, Sun, MapPin, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/7641842/pexels-photo-7641842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Consultora Imobiliária" 
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/40"></div>
        </div>
        
        {/* Círculos decorativos com movimento */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.3 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute top-1/3 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-1/3 left-10 w-80 h-80 bg-white/20 rounded-full blur-3xl"
        ></motion.div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-white mb-2 inline-block px-4 py-1.5 bg-accent/80 backdrop-blur-sm rounded-full">
            <span className="text-sm font-display font-medium tracking-wide uppercase">Conheça Nossa História</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
          >
            Experiência e Excelência <br />
            no <span className="text-accent relative">
              Mercado Imobiliário
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute -bottom-2 left-0 h-1 bg-accent/50 rounded-full"
              ></motion.span>
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed font-light"
          >
            Conectando pessoas a lares perfeitos com dedicação, conhecimento e excelência no atendimento.
          </motion.p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="w-2 h-2 bg-white rounded-full"
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="w-2 h-2 bg-accent rounded-full"
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="w-2 h-2 bg-white rounded-full"
          ></motion.div>
        </div>
      </section>

      {/* Sobre a Consultora */}
      <section className="py-24 relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 z-0"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -left-6 -top-6 w-full h-full border-2 border-accent/30 rounded-3xl"></div>
                <img
                  src="https://img.freepik.com/fotos-gratis/mulher-de-tiro-medio-trabalhando-no-laptop_23-2149300643.jpg?t=st=1746496519~exp=1746500119~hmac=16e85181381a4d91341a3f8d93a1d5f961af6aeee9dbc6ae614c325593c3caba&w=996"
                  alt="Patricia - Consultora Imobiliária"
                  className="w-full rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-8 -right-8 bg-white p-6 shadow-lg rounded-2xl border border-secondary-dark/10 flex flex-col items-center">
                  <span className="text-accent font-display text-3xl font-bold mb-1">1+</span>
                  <span className="text-primary text-sm font-medium">Ano de Experiência</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:pl-12"
            >
              <div className="flex items-center mb-4">
                <div className="h-1 w-12 bg-accent rounded-full mr-4"></div>
                <span className="text-primary/60 text-sm font-medium uppercase tracking-wider">Sobre Mim</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Conheça <span className="text-accent">Patricia</span>
              </h2>
              <p className="text-primary/80 text-lg mb-6 leading-relaxed">
                Sou Patricia Souza, iniciante na área de consultoria de imóveis, e escolhi essa profissão por acreditar no poder transformador de encontrar o lar ideal. Meu foco é oferecer um atendimento humano, transparente e dedicado, ajudando cada cliente a realizar seus sonhos com segurança e tranquilidade.
              </p>
              <p className="text-primary/70 mb-8 leading-relaxed">
                Estou em constante aprendizado para crescer na área e entregar sempre o meu melhor em cada etapa da jornada imobiliária.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div className="bg-secondary/50 rounded-xl p-4 border border-secondary-dark/10 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <User size={22} className="text-accent mb-3" />
                  <h3 className="font-medium text-primary mb-1">Especialista em Imóveis</h3>
                  <p className="text-primary/60 text-sm">Domínio técnico e conhecimento de mercado</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 border border-secondary-dark/10 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <Heart size={22} className="text-accent mb-3" />
                  <h3 className="font-medium text-primary mb-1">Consultoria Personalizada</h3>
                  <p className="text-primary/60 text-sm">Atendimento único para cada cliente</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 border border-secondary-dark/10 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <Shield size={22} className="text-accent mb-3" />
                  <h3 className="font-medium text-primary mb-1">Negociação Estratégica</h3>
                  <p className="text-primary/60 text-sm">Habilidade para melhores acordos</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 border border-secondary-dark/10 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <MapPin size={22} className="text-accent mb-3" />
                  <h3 className="font-medium text-primary mb-1">Conhecimento Local</h3>
                  <p className="text-primary/60 text-sm">Profundo entendimento da região</p>
                </div>
              </div>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-display font-medium"
              >
                Agende uma Consulta
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Números e Conquistas */}
      <section className="py-20 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4">
              <div className="h-1 w-20 bg-accent rounded-full mb-2 mx-auto"></div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">
                Compromisso com Resultados
              </h2>
              <div className="h-1 w-20 bg-accent rounded-full mt-2 mx-auto"></div>
            </div>
            <p className="text-primary/70 max-w-3xl mx-auto">
              Cada número representa nossa dedicação em criar experiências excepcionais para nossos clientes.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md border border-secondary-dark/10 text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full">
                <Award size={28} className="text-accent" />
              </div>
              <p className="text-accent text-4xl md:text-5xl font-display font-bold mb-2">100%</p>
              <p className="text-primary/70 font-medium">Comprometimento</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md border border-secondary-dark/10 text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full">
                <User size={28} className="text-accent" />
              </div>
              <p className="text-accent text-4xl md:text-5xl font-display font-bold mb-2">90+</p>
              <p className="text-primary/70 font-medium">Clientes Satisfeitos</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md border border-secondary-dark/10 text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full">
                <Clock size={28} className="text-accent" />
              </div>
              <p className="text-accent text-4xl md:text-5xl font-display font-bold mb-2">1+</p>
              <p className="text-primary/70 font-medium">Ano de Experiência</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md border border-secondary-dark/10 text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full">
                <Heart size={28} className="text-accent" />
              </div>
              <p className="text-accent text-4xl md:text-5xl font-display font-bold mb-2">98%</p>
              <p className="text-primary/70 font-medium">Índice de Satisfação</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20">
          <Sun className="w-12 h-12 text-accent/30 animate-pulse" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-12 shadow-xl"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Pronto para Encontrar <span className="text-accent">seu Imóvel Ideal?</span>
              </h2>
              <p className="text-white/80 mb-8 leading-relaxed">
                Vamos conversar sobre seus objetivos imobiliários e como posso ajudá-lo 
                a encontrar a propriedade perfeita para você e sua família.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group font-display font-medium"
              >
                Agende uma Consulta
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;