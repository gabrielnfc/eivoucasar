-- TEMPORARIAMENTE desabilitar RLS para resolver o problema

-- Verificar estado atual
SELECT 
  'Estado atual RLS' as info,
  relname as table_name,
  relrowsecurity as rls_enabled
FROM pg_class 
WHERE relname = 'couples';

-- Desabilitar RLS temporariamente
ALTER TABLE couples DISABLE ROW LEVEL SECURITY;

-- Verificar se foi desabilitado
SELECT 
  'RLS desabilitado' as info,
  relname as table_name,
  relrowsecurity as rls_enabled
FROM pg_class 
WHERE relname = 'couples';

-- Teste: buscar casal agora
SELECT 
  'Teste após desabilitar RLS' as info,
  id,
  user_id,
  bride_name,
  groom_name,
  slug
FROM couples 
WHERE id = '6d2aeed0-bd69-48bd-b2aa-ef9e9e2e15f7';

-- Mensagem de sucesso
SELECT 'RLS temporariamente desabilitado. Agora teste o sistema!' as resultado; 