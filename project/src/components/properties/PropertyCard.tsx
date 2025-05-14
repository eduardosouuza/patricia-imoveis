import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize2, MapPin, Tag, Sun, ArrowRight } from 'lucide-react';
import { Property } from '../../types/property';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    });
  };

  const formatNumber = (num: number | undefined) => {
    if (num === undefined || num === null) return '0';
    return num.toString();
  };

  // Garantindo que a área seja um número válido, utilizando qualquer um dos campos área ou tamanho conforme disponibilidade
  const areaValue = property.area || property.size || 0;

  return (
    <div className="card-modern group h-full flex flex-col rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
      <div className="property-image rounded-t-2xl">
        <Link to={`/properties?id=${property.id}`}>
          <div className="w-full h-80 bg-primary-light relative overflow-hidden rounded-t-2xl">
            <img 
              src={property.image || 'images/casa2.jpg'} 
              alt={property.title} 
              className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110 brightness-105"
              onError={(e) => {
                e.currentTarget.src = 'images/casa2.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/30 to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>
          </div>
        </Link>
        
        {property.featured && (
          <div className="property-badge">
            <Sun size={14} className="mr-1.5" strokeWidth={2.5} />
            Destaque
          </div>
        )}
        
        <div className="property-price group-hover:-translate-y-1">
          <Tag size={16} className="mr-1.5 text-accent" strokeWidth={2.5} />
          <span className="font-semibold">{formatPrice(property.price)}</span>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 pt-16">
          <div className="flex items-center text-white text-sm mb-2">
            <div className="bg-accent/80 rounded-full p-1.5 mr-2 shadow-md backdrop-blur-sm">
              <MapPin size={14} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-medium tracking-wide truncate text-white drop-shadow-md">
              {property.location || 'Localização não informada'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 relative flex-grow flex flex-col bg-white rounded-b-2xl">
        <Link to={`/properties?id=${property.id}`}>
          <h3 className="text-xl font-serif font-medium text-primary group-hover:text-accent transition-colors mb-3 pr-4">
            {property.title}
          </h3>
        </Link>
        <p className="text-primary/85 mb-6 text-sm line-clamp-2 leading-relaxed font-medium tracking-wide">
          {property.description}
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="property-info flex flex-col items-center justify-center bg-primary/5 rounded-xl py-4 group-hover:bg-primary/10 transition-colors">
            <Bed size={22} className="text-accent mb-2" />
            <span className="text-primary text-sm font-semibold">{formatNumber(property.bedrooms)}</span>
            <span className="text-primary/70 text-xs mt-1">Quartos</span>
          </div>
          <div className="property-info flex flex-col items-center justify-center bg-primary/5 rounded-xl py-4 group-hover:bg-primary/10 transition-colors">
            <Bath size={22} className="text-accent mb-2" />
            <span className="text-primary text-sm font-semibold">{formatNumber(property.bathrooms)}</span>
            <span className="text-primary/70 text-xs mt-1">Banheiros</span>
          </div>
          <div className="property-info flex flex-col items-center justify-center bg-primary/5 rounded-xl py-4 group-hover:bg-primary/10 transition-colors">
            <Maximize2 size={22} className="text-accent mb-2" />
            <span className="text-primary text-sm font-semibold">{formatNumber(areaValue)}</span>
            <span className="text-primary/70 text-xs mt-1">m²</span>
          </div>
        </div>

        <div className="mt-auto flex justify-center">
          <Link 
            to={`/properties?id=${property.id}`}
            className="bg-primary hover:bg-primary-dark text-white font-medium text-sm rounded-lg px-6 py-3 flex items-center justify-center transition-all duration-300 w-full"
          >
            <span>Ver Detalhes</span>
            <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;