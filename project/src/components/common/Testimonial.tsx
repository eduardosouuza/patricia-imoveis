import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, viewportOnce, withDelay } from '../../utils/animations';

interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  delay?: number;
  className?: string;
}

/**
 * Componente para exibir uma citação/depoimento com estilo e animação
 */
const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  role,
  delay = 0.5,
  className = '',
}) => {
  return (
    <motion.div
      {...withDelay(fadeInUp, delay)}
      viewport={viewportOnce}
      className={`max-w-3xl mx-auto text-center ${className}`}
    >
      {/* Card de citação com estilo e elementos decorativos */}
      <div className="p-8 bg-white/80 rounded-xl shadow-md border border-accent/10 relative">
        {/* Gradiente decorativo de fundo */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50"></div>
        {/* Símbolo de aspas decorativo */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-accent/20 text-7xl font-serif">"</div>
        
        {/* Conteúdo da citação com z-index para ficar acima dos elementos decorativos */}
        <div className="relative z-10">
          {/* Texto da citação */}
          <p className="text-xl text-primary/90 italic font-display leading-relaxed mb-6">
            "{quote}"
          </p>
          {/* Nome do autor da citação com linhas decorativas */}
          <div className="flex items-center justify-center">
            <div className="w-12 h-0.5 bg-accent/30 rounded-full mr-4"></div>
            <div>
              <p className="text-primary/80 font-medium">{author}</p>
              {role && <p className="text-primary/60 text-sm">{role}</p>}
            </div>
            <div className="w-12 h-0.5 bg-accent/30 rounded-full ml-4"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonial; 