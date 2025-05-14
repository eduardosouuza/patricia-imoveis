import { MapPin, Mail, Phone, Clock, Linkedin, Facebook, Instagram, ArrowRight, Send, Sun } from 'lucide-react';
import ContactForm from '../components/contact/ContactForm';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 bg-primary overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-primary z-0 opacity-90"></div>
        
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
        
        <div className="absolute top-20 right-20">
          <Sun className="w-12 h-12 text-accent/30 animate-pulse" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl text-center mx-auto"
          >
            <div className="text-white mb-2 inline-block px-4 py-1.5 bg-accent/80 backdrop-blur-sm rounded-full">
              <span className="text-sm font-display font-medium tracking-wide uppercase">Estamos aqui para você</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Entre em <span className="text-accent relative">
                Contato
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute -bottom-2 left-0 h-1 bg-accent/50 rounded-full"
                ></motion.span>
              </span>
            </h1>
            
            <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-8">
              Se você está pensando em comprar, vender ou simplesmente tem dúvidas sobre o mercado imobiliário, 
              estou aqui para ajudar. Entre em contato e vamos começar uma conversa.
            </p>
            
            <a 
              href="https://wa.me/5551991861221" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group font-display font-medium relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Fale Conosco
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </motion.div>
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

      {/* Contact Section */}
      <section className="py-24" id="form">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/3"
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-secondary-dark/10 mb-10 relative">
                <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg">
                  <Phone size={20} className="text-white" />
                </div>
                
                <h2 className="text-2xl font-display font-bold mb-6 text-primary">Informações para Contato</h2>
                <ul className="space-y-6">
                  <li className="flex group">
                    <MapPin size={24} className="text-accent mt-1 mr-4 flex-shrink-0 group-hover:text-accent-dark transition-colors" />
                    <div>
                      <h3 className="font-medium mb-1 text-primary">Endereço</h3>
                      <p className="text-primary/70">
                        Em Breve
                      </p>
                    </div>
                  </li>
                  <li className="flex group">
                    <Phone size={24} className="text-accent mt-1 mr-4 flex-shrink-0 group-hover:text-accent-dark transition-colors" />
                    <div>
                      <h3 className="font-medium mb-1 text-primary">Telefone</h3>
                      <a href="https://wa.me/5551991861221" className="text-primary/70 hover:text-accent transition-colors">
                        (51) 99186-1221
                      </a>
                    </div>
                  </li>
                  <li className="flex group">
                    <Mail size={24} className="text-accent mt-1 mr-4 flex-shrink-0 group-hover:text-accent-dark transition-colors" />
                    <div>
                      <h3 className="font-medium mb-1 text-primary">Email</h3>
                      <a href="mailto:psimoveis1515@gmail.com" className="text-primary/70 hover:text-accent transition-colors">
                        psimoveis1515@gmail.com
                      </a>
                    </div>
                  </li>
                  <li className="flex group">
                    <Clock size={24} className="text-accent mt-1 mr-4 flex-shrink-0 group-hover:text-accent-dark transition-colors" />
                    <div>
                      <h3 className="font-medium mb-1 text-primary">Horário</h3>
                      <p className="text-primary/70">
                        Em Breve
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-secondary-dark/10 relative">
                <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg">
                  <Linkedin size={20} className="text-white" />
                </div>
                
                <h2 className="text-2xl font-display font-bold mb-6 text-primary">Redes Sociais</h2>
                <p className="text-primary/70 mb-6">Conecte-se comigo nas redes sociais para novidades, imóveis exclusivos e dicas sobre o mercado imobiliário.</p>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300 shadow-sm"
                  >
                    <Facebook size={20} />
                  </a>
                  <a 
                    href="#" 
                    className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300 shadow-sm"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href="#" 
                    className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300 shadow-sm"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:w-2/3"
            >
              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-secondary-dark/10 relative">
                <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg">
                  <Send size={20} className="text-white" />
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="h-1 w-12 bg-accent rounded-full mr-4"></div>
                  <span className="text-primary/60 text-sm font-medium uppercase tracking-wider">Fale Conosco</span>
                </div>
                
                <h2 className="text-3xl font-display font-bold mb-6 text-primary">Envie-me uma mensagem</h2>
                <p className="text-primary/70 text-lg mb-8">
                  Preencha o formulário abaixo e entrarei em contato o mais breve possível. 
                  Estou ansioso para saber mais sobre suas necessidades imobiliárias.
                </p>
                
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4">
              <div className="h-1 w-20 bg-accent rounded-full mb-2 mx-auto"></div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">
                Visite-nos
              </h2>
              <div className="h-1 w-20 bg-accent rounded-full mt-2 mx-auto"></div>
            </div>
            <p className="text-primary/70 max-w-2xl mx-auto">
              Em breve, nosso escritório estará pronto para recebê-lo com todo conforto e atenção que você merece.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white shadow-lg rounded-2xl border border-secondary-dark/10 overflow-hidden"
          >
            <div className="h-96 bg-white flex items-center justify-center relative">
              <div className="absolute inset-0 bg-primary/5 z-0"></div>
              <div className="text-center relative z-10">
                <div className="w-20 h-20 rounded-full bg-secondary inline-flex items-center justify-center mb-6">
                  <MapPin size={28} className="text-accent" />
                </div>
                <h3 className="text-xl font-display font-bold text-primary mb-2">Localização</h3>
                <p className="text-primary/70">Nosso escritório estará em breve à sua disposição.</p>
              </div>
            </div>
          </motion.div>
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
                Consultoria <span className="text-accent">Imobiliária Especializada</span>
              </h2>
              <p className="text-white/80 mb-8 leading-relaxed">
                Estou pronta para ajudar você a encontrar o imóvel dos seus sonhos ou a vender seu imóvel pelo melhor valor do mercado.
              </p>
              <Link 
                to="/properties" 
                className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group font-display font-medium"
              >
                Ver Imóveis
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;