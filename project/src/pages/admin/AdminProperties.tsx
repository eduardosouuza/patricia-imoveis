import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Property } from '../../types/property';
import { Plus, Pencil, Trash2, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      toast.error('Erro ao carregar imóveis');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este imóvel?')) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProperties(properties.filter(property => property.id !== id));
      toast.success('Imóvel excluído com sucesso');
    } catch (error) {
      toast.error('Erro ao excluir imóvel');
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-sm p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-neutral-600">Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg border border-secondary-dark/10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="p-6 border-b border-secondary-dark/10 relative z-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-display font-semibold text-primary flex items-center">
            <Building2 size={22} className="text-accent mr-2.5" />
            Imóveis
          </h2>
          <Link
            to="/admin/properties/new"
            className="inline-flex items-center px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-300"
          >
            <Plus size={18} className="mr-1.5" />
            Adicionar Imóvel
          </Link>
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="p-12 text-center">
          <Building2 size={60} className="mx-auto text-secondary-dark mb-6" />
          <p className="text-primary/70 mb-4 font-medium">Nenhum imóvel encontrado</p>
          <Link
            to="/admin/properties/new"
            className="inline-flex items-center text-accent hover:text-accent-dark transition-colors font-medium"
          >
            <Plus size={18} className="mr-1.5" />
            Adicione seu primeiro imóvel
          </Link>
        </div>
      ) :
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-dark/10">
            <thead className="bg-secondary">
              <tr>
                <th scope="col" className="px-4 sm:px-6 py-3.5 text-left text-xs font-medium text-primary/70 uppercase tracking-wider">
                  Imóvel
                </th>
                <th scope="col" className="hidden md:table-cell px-6 py-3.5 text-left text-xs font-medium text-primary/70 uppercase tracking-wider">
                  Localização
                </th>
                <th scope="col" className="hidden md:table-cell px-6 py-3.5 text-left text-xs font-medium text-primary/70 uppercase tracking-wider">
                  Preço
                </th>
                <th scope="col" className="hidden md:table-cell px-6 py-3.5 text-left text-xs font-medium text-primary/70 uppercase tracking-wider">
                  Tipo
                </th>
                <th scope="col" className="hidden md:table-cell px-6 py-3.5 text-left text-xs font-medium text-primary/70 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-4 sm:px-6 py-3.5 text-right text-xs font-medium text-primary/70 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-dark/10">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-secondary/40 transition-colors">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0">
                        <img
                          className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-lg shadow-sm"
                          src={property.image}
                          alt={property.title}
                        />
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <div className="text-sm font-medium text-primary">{property.title}</div>
                        <div className="text-xs sm:text-sm text-primary/60">
                          {property.bedrooms} quartos • {property.bathrooms} banheiros • {property.area}m²
                        </div>
                        <div className="md:hidden mt-1">
                          <div className="text-xs text-accent font-medium">{formatPrice(property.price)}</div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize mt-1
                            ${property.status === 'available' ? 'bg-green-100 text-green-800' : ''}
                            ${property.status === 'sold' ? 'bg-red-100 text-red-800' : ''}
                            ${property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                          `}>
                            {property.status === 'available' ? 'Disponível' : ''}
                            {property.status === 'sold' ? 'Vendido' : ''}
                            {property.status === 'pending' ? 'Reservado' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-primary/80">{property.location}</div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-accent font-medium">{formatPrice(property.price)}</div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-primary/80">{property.property_type}</div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${property.status === 'available' ? 'bg-green-100 text-green-800' : ''}
                      ${property.status === 'sold' ? 'bg-red-100 text-red-800' : ''}
                      ${property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    `}>
                      {property.status === 'available' ? 'Disponível' : ''}
                      {property.status === 'sold' ? 'Vendido' : ''}
                      {property.status === 'pending' ? 'Reservado' : ''}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/admin/properties/${property.id}`}
                        className="p-2 text-primary/60 hover:text-accent bg-secondary rounded-lg transition-all duration-300 hover:shadow-sm"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="p-2 text-primary/60 hover:text-red-600 bg-secondary rounded-lg transition-all duration-300 hover:shadow-sm"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
}