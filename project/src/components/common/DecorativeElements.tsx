import React from 'react';
import { Sun } from 'lucide-react';

interface DecorativeBordersProps {
  topColor?: string;
  bottomColor?: string;
}

interface DecorativeBackgroundProps {
  color?: string;
  opacity?: number;
  className?: string;
}

interface DecorativeFloatingElementsProps {
  variant?: 'default' | 'minimal' | 'extensive';
  className?: string;
}

/**
 * Componente para exibir bordas decorativas no topo e na base da seção
 */
export const DecorativeBorders: React.FC<DecorativeBordersProps> = ({
  topColor = 'accent',
  bottomColor = 'primary',
}) => {
  return (
    <>
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${topColor}/0 via-${topColor}/30 to-${topColor}/0`}></div>
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${bottomColor}/0 via-${bottomColor}/10 to-${bottomColor}/0`}></div>
    </>
  );
};

/**
 * Componente para exibir um fundo decorativo
 */
export const DecorativeBackground: React.FC<DecorativeBackgroundProps> = ({
  color = 'accent',
  opacity = 50,
  className = '',
}) => {
  return (
    <div className={`absolute inset-0 ${className}`} style={{ opacity: opacity / 100 }}></div>
  );
};

/**
 * Componente para exibir elementos flutuantes decorativos
 */
export const DecorativeFloatingElements: React.FC<DecorativeFloatingElementsProps> = ({
  variant = 'default',
  className = '',
}) => {
  // Elementos básicos para todas as variantes
  const baseElements = (
    <>
      <div className="absolute -left-10 -bottom-10 w-56 h-56 bg-primary/5 rounded-full blur-xl"></div>
      <div className="absolute right-1/4 bottom-1/4 w-24 h-24 bg-accent/5 rounded-full blur-lg"></div>
      <div className="absolute left-1/3 top-1/4 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
    </>
  );

  // Variante padrão com ícone decorativo
  if (variant === 'default') {
    return (
      <div className={className}>
        {baseElements}
        <div className="absolute -right-20 top-20 rotate-12 opacity-20">
          <Sun className="text-accent w-40 h-40" />
        </div>
      </div>
    );
  }

  // Variante extensa com mais elementos
  if (variant === 'extensive') {
    return (
      <div className={className}>
        {baseElements}
        <div className="absolute -right-20 top-20 rotate-12 opacity-20">
          <Sun className="text-accent w-40 h-40" />
        </div>
        <div className="absolute right-1/4 top-1/3 w-40 h-40 bg-primary/3 rounded-full blur-xl"></div>
        <div className="absolute left-1/5 bottom-1/3 w-28 h-28 bg-accent/3 rounded-full blur-xl"></div>
      </div>
    );
  }

  // Variante minimalista apenas com os elementos básicos
  return <div className={className}>{baseElements}</div>;
};

/**
 * Componente combinado que reúne todos os elementos decorativos
 */
interface DecorativeElementsProps {
  borders?: DecorativeBordersProps;
  background?: DecorativeBackgroundProps;
  floatingElements?: DecorativeFloatingElementsProps;
}

export const DecorativeElements: React.FC<DecorativeElementsProps> = ({
  borders = {},
  background = {},
  floatingElements = {},
}) => {
  return (
    <>
      <DecorativeBorders {...borders} />
      <DecorativeBackground {...background} />
      <DecorativeFloatingElements {...floatingElements} />
    </>
  );
};

export default DecorativeElements; 