import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';
import { statsData, testimonialData, StatItem } from '../../data/statsData';
import { fadeInUp, viewportOnce } from '../../utils/animations';
import { DecorativeElements } from '../common/DecorativeElements';
import StatCard from '../common/StatCard';
import Testimonial from '../common/Testimonial';

// Componente Stats - exibe estatísticas da empresa imobiliária
const Stats = () => {
  return (
    // Seção principal com estilo de fundo e posicionamento relativo
    <section className="py-24 bg-secondary relative overflow-hidden">
      {/* Elementos decorativos */}
      <DecorativeElements 
        background={{ className: "rich-bg", opacity: 50 }}
        floatingElements={{ variant: "default" }}
      />
      
      {/* Container principal com z-index para manter conteúdo acima dos elementos decorativos */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho da seção com animação */}
        <motion.div 
          {...fadeInUp}
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          {/* Badge estilizado para o título da seção */}
          <div className="inline-block mb-3 px-5 py-2 bg-primary/5 rounded-full">
            <span className="text-primary font-display font-medium text-sm tracking-wide uppercase">
              <span className="text-accent">•</span> Números que orgulham <span className="text-accent">•</span>
            </span>
          </div>
          {/* Título principal da seção com destaque colorido */}
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
            Nossa Trajetória <span className="text-accent">em Números</span>
          </h2>
          {/* Subtítulo/descrição da seção */}
          <p className="text-primary/80 max-w-2xl mx-auto text-lg">
            Resultado de um trabalho dedicado e focado na satisfação dos nossos clientes
          </p>
        </motion.div>
        
        {/* Grid de cards de estatísticas - responsivo para diferentes tamanhos de tela */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <StatCard 
              key={index} 
              stat={stat} 
              index={index} 
              hoverEffect={true}
            />
          ))}
        </div>

        {/* Seção de citação/depoimento */}
        <Testimonial 
          quote={testimonialData.quote}
          author={testimonialData.author}
          role={testimonialData.role}
          className="mt-20"
        />
      </div>
    </section>
  );
};

export default Stats;