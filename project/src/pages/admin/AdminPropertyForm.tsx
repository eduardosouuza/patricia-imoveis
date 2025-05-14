import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Property } from '../../types/property';
import { Upload, X, Plus, MapPin, Building2, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function AdminPropertyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [property, setProperty] = useState<Partial<Property>>({
    title: '',
    description: '',
    price: 0,
    location: '',
    address: '',
    bedrooms: 0,
    bathrooms: 0,
    size: 0,
    image: '',
    images: [],
    property_type: '',
    status: 'available',
    featured: false
  });

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setProperty(data);
        if (data.image) {
          setImagePreviews([data.image, ...(data.images || [])]);
        }
      }
    } catch (error) {
      toast.error('Erro ao carregar imóvel');
      navigate('/admin');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    const validFiles = files.filter(file => {
      if (!file.type.match(/^image\/(jpeg|png)$/)) {
        toast.error(`${file.name} não é um arquivo de imagem válido (JPG ou PNG)`);
        return false;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} é muito grande (máximo 5MB)`);
        return false;
      }

      return true;
    });

    setImageFiles(prev => [...prev, ...validFiles]);

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map(async (file) => {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('property-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(fileName);

      return publicUrl;
    });

    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validação adicional para localização
      if (!property.location || property.location.trim() === '') {
        toast.error('A localização (bairro/região) é obrigatória');
        setLoading(false);
        return;
      }

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        toast.error('Você precisa estar logado para realizar esta ação');
        return;
      }

      let uploadedUrls: string[] = [];
      if (imageFiles.length > 0) {
        uploadedUrls = await uploadImages(imageFiles);
      }

      const propertyData = {
        ...property,
        image: uploadedUrls[0] || property.image,
        images: uploadedUrls.slice(1),
        property_type: property.property_type || 'Não informado',
        created_by: user.id,
        updated_by: user.id
      };

      console.log('Dados a serem salvos:', propertyData);

      if (id) {
        const { error } = await supabase
          .from('properties')
          .update({
            ...propertyData,
            updated_by: user.id
          })
          .eq('id', id);

        if (error) throw error;
        toast.success('Imóvel atualizado com sucesso');
      } else {
        const { error } = await supabase
          .from('properties')
          .insert([propertyData]);

        if (error) throw error;
        toast.success('Imóvel criado com sucesso');
      }

      navigate('/admin');
    } catch (error) {
      console.error('Erro:', error);
      toast.error(id ? 'Erro ao atualizar imóvel' : 'Erro ao criar imóvel');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setProperty(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg border border-secondary-dark/10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="p-6 border-b border-secondary-dark/10 relative z-10">
        <h2 className="text-2xl font-display font-semibold text-primary flex items-center">
          <Building2 size={22} className="text-accent mr-2.5" />
          {id ? 'Editar Imóvel' : 'Adicionar Novo Imóvel'}
        </h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Imagens do Imóvel</label>
            <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Prévia ${index + 1}`}
                    className="h-32 w-full object-cover rounded-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <label className="relative h-32 flex items-center justify-center border-2 border-neutral-300 border-dashed rounded-sm cursor-pointer hover:border-gold">
                <div className="text-center">
                  <Plus className="mx-auto h-8 w-8 text-neutral-400" />
                  <span className="mt-2 block text-sm font-medium text-neutral-600">
                    Adicionar Imagem
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  className="hidden"
                  onChange={handleImageChange}
                  multiple
                />
              </label>
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              PNG, JPG até 5MB cada. A primeira imagem será a imagem principal do imóvel.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Título</label>
            <input
              type="text"
              name="title"
              value={property.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-sm border-neutral-300 shadow-sm focus:border-gold focus:ring focus:ring-gold focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Descrição</label>
            <textarea
              name="description"
              value={property.description}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full rounded-sm border-neutral-300 shadow-sm focus:border-gold focus:ring focus:ring-gold focus:ring-opacity-50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Localização (Bairro/Região)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin size={16} className="text-accent" />
                </div>
                <input
                  type="text"
                  name="location"
                  value={property.location}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Centro, Moinhos de Vento, Bela Vista"
                  className="mt-1 block w-full pl-10 rounded-sm border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
                />
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                Esta informação será exibida no card do imóvel e é crucial para os compradores.
                Por favor, preencha com o bairro ou região do imóvel.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Endereço Completo</label>
              <textarea
                name="address"
                value={property.address}
                onChange={handleChange}
                rows={1}
                placeholder="Ex: Rua Exemplo, 123, Apto 101, CEP 90000-000"
                className="mt-1 block w-full rounded-sm border-neutral-300 shadow-sm focus:border-gold focus:ring focus:ring-gold focus:ring-opacity-50"
              />
              <p className="mt-1 text-xs text-neutral-500 flex items-center">
                <span className="bg-accent/10 text-accent rounded-sm px-2 py-0.5 mr-2 font-medium">
                  Informação pública
                </span>
                Este endereço será exibido na página do imóvel e visível para todos os visitantes
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Preço</label>
              <input
                type="number"
                name="price"
                value={property.price}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-sm border-neutral-300 shadow-sm focus:border-gold focus:ring focus:ring-gold focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Tipo de Imóvel</label>
              <select
                name="property_type"
                value={property.property_type}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-sm border-neutral-300 shadow-sm focus:border-gold focus:ring focus:ring-gold focus:ring-opacity-50"
              >
                <option value="">Selecione o tipo</option>
                <option value="Casa">Casa</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Cobertura">Cobertura</option>
                <option value="Mansão">Mansão</option>
                <option value="Terreno">Terreno</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Quartos</label>
              <input
                type="number"
                name="bedrooms"
                value={property.bedrooms}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-sm border-neutral-300 shadow-sm focus:border-gold focus:ring focus:ring-gold focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Banheiros</label>
              <input
                type="number"
                name="bathrooms"
                value={property.bathrooms}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-sm border-neutral-300 shadow-sm focus:border-gold focus:ring focus:ring-gold focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Área (m²)</label>
              <input
                type="number"
                name="size"
                value={property.size}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-sm border-neutral-300 shadow-sm focus:border-gold focus:ring focus:ring-gold focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
              <select
                name="status"
                value={property.status}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-sm border-neutral-300 shadow-sm focus:border-gold focus:ring focus:ring-gold focus:ring-opacity-50"
              >
                <option value="available">Disponível</option>
                <option value="sold">Vendido</option>
                <option value="pending">Reservado</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={property.featured}
                onChange={handleChange}
                className="h-4 w-4 text-gold focus:ring-gold border-neutral-300 rounded"
              />
              <label htmlFor="featured" className="text-sm font-medium text-neutral-700">
                Destacar este imóvel na página inicial
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-primary hover:bg-secondary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-300 disabled:opacity-50 flex items-center"
            >
              <Save size={16} className="mr-1.5" />
              {loading ? 'Salvando...' : (id ? 'Atualizar Imóvel' : 'Criar Imóvel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}