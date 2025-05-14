import React from 'react';
import { motion } from 'framer-motion';
import { StatItem } from '../../data/statsData';
import { fadeInUp, viewportOnce } from '../../utils/animations';

interface StatCardProps {
  stat: StatItem;
  index: number;
  hoverEffect?: boolean;
  className?: string;
}

/**
 * Componente para exibir um card de estatística com animação e efeitos de hover
 */
const StatCard: React.FC<StatCardProps> = ({
  stat,
  index,
  hoverEffect = true,
  className = '',
}) => {
  return (
    <motion.div
      key={index}
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
      viewport={viewportOnce}
      className={`text-center relative group ${className}`}
    >
      {/* Card com efeitos de hover e transição */}
      <div 
        className={`p-8 rounded-xl bg-white shadow-md ${
          hoverEffect ? 'hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2' : ''
        } border border-accent/10 relative overflow-hidden`}
      >
        {/* Elementos decorativos do card que aparecem no hover */}
        {hoverEffect && (
          <>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 h-1.5 w-16 bg-accent/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -right-12 -bottom-12 w-24 h-24 bg-accent/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
          </>
        )}
        
        {/* Conteúdo do card: ícone, valor estatístico, label e descrição */}
        <div className="relative">
          {/* Container circular para o ícone com efeitos de hover */}
          <div className={`bg-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${
            hoverEffect ? 'group-hover:bg-accent/10 transition-colors duration-300' : ''
          } shadow-sm`}>
            {hoverEffect && (
              <div className="absolute inset-0 rounded-full bg-accent/5 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            )}
            <div className="relative z-10">{stat.icon}</div>
          </div>
          
          {/* Valor numérico da estatística */}
          <h3 className="text-accent text-3xl font-display font-bold mb-2 gold-metallic">{stat.value}</h3>
          {/* Label da estatística */}
          <p className="text-primary font-medium text-lg mb-1">{stat.label}</p>
          {/* Descrição da estatística */}
          <p className="text-primary/70 text-sm">{stat.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard; 