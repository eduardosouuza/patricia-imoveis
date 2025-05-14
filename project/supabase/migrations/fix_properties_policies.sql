-- Ajuste nas políticas de segurança para permitir operações de atualização e exclusão
-- Estas políticas precisam ser aplicadas na tabela 'properties' no Supabase

-- Política para permitir atualização por usuários autenticados
CREATE POLICY update_properties_policy ON properties
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Política para permitir exclusão por usuários autenticados
CREATE POLICY delete_properties_policy ON properties
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- Política para permitir inserção por usuários autenticados
CREATE POLICY insert_properties_policy ON properties
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Ativar RLS (Row Level Security) na tabela properties, caso ainda não esteja ativado
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Verificar e ajustar permissões para o papel anônimo
GRANT SELECT ON properties TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON properties TO authenticated; 