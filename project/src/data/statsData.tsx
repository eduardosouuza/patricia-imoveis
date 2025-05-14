import { Users, Clock, Award, Star } from 'lucide-react';

// Interface para definir a estrutura de dados das estatísticas
export interface StatItem {
  value: string;
  label: string;
  description: string;
  icon: JSX.Element;
}

// Dados de estatísticas da imobiliária
export const statsData: StatItem[] = [
  { 
    value: '100%', 
    label: 'Comprometimento', 
    description: 'Dedicação total ao cliente',
    icon: <Award className="text-accent w-6 h-6" />
  },
  { 
    value: '90+', 
    label: 'Clientes Satisfeitos', 
    description: 'Histórico de sucesso',
    icon: <Users className="text-accent w-6 h-6" />
  },
  { 
    value: '1+', 
    label: 'Ano de Experiência', 
    description: 'No mercado imobiliário',
    icon: <Clock className="text-accent w-6 h-6" />
  },
  { 
    value: '98%', 
    label: 'Satisfação dos Clientes', 
    description: 'Avaliações positivas',
    icon: <Star className="text-accent w-6 h-6" />
  },
];

// Dados do depoimento
export const testimonialData = {
  quote: "Nossa missão é encontrar o imóvel perfeito para você, com toda a clareza e transparência que você merece.",
  author: "Patricia Souza",
  role: "Corretora"
}; 