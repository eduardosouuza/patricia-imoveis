-- Função para excluir um imóvel pelo ID
CREATE OR REPLACE FUNCTION delete_property(property_id UUID)
RETURNS VOID AS $$
BEGIN
  DELETE FROM properties WHERE id = property_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para atualizar um imóvel pelo ID
CREATE OR REPLACE FUNCTION update_property(
  p_id UUID,
  p_title TEXT,
  p_description TEXT,
  p_price NUMERIC,
  p_location TEXT,
  p_address TEXT,
  p_bedrooms INTEGER,
  p_bathrooms INTEGER,
  p_size NUMERIC,
  p_property_type TEXT,
  p_status TEXT,
  p_featured BOOLEAN,
  p_updated_by UUID
)
RETURNS VOID AS $$
BEGIN
  UPDATE properties
  SET 
    title = p_title,
    description = p_description,
    price = p_price,
    location = p_location,
    address = p_address,
    bedrooms = p_bedrooms,
    bathrooms = p_bathrooms,
    size = p_size,
    area = p_size,
    property_type = p_property_type,
    status = p_status,
    featured = p_featured,
    updated_at = NOW(),
    updated_by = p_updated_by
  WHERE id = p_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ajuste nas políticas de segurança para permitir operações de atualização e exclusão
-- Estas políticas precisam ser aplicadas na tabela 'properties' no Supabase

-- Política para permitir atualização por usuários autenticados
CREATE POLICY update_properties_policy ON properties
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Política para permitir exclusão por usuários autenticados
CREATE POLICY delete_properties_policy ON properties
  FOR DELETE USING (auth.uid() IS NOT NULL); 