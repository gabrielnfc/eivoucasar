-- =====================================================
-- REABILITAR RLS APÓS TESTES
-- Execute este script após testar o upload
-- =====================================================

-- 1. Reabilitar RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

-- 2. Recriar políticas básicas
DROP POLICY IF EXISTS "wedding_upload" ON storage.objects;
DROP POLICY IF EXISTS "wedding_view" ON storage.objects;
DROP POLICY IF EXISTS "wedding_update" ON storage.objects;
DROP POLICY IF EXISTS "wedding_delete" ON storage.objects;

-- 3. Políticas permissivas para wedding-images
CREATE POLICY "wedding_upload" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'wedding-images');

CREATE POLICY "wedding_view" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'wedding-images');

CREATE POLICY "wedding_update" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'wedding-images');

CREATE POLICY "wedding_delete" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'wedding-images');

-- 4. Política para buckets
CREATE POLICY "Allow public to read buckets" ON storage.buckets
FOR SELECT TO public
USING (true);

-- 5. Verificar status final
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'storage' 
  AND tablename IN ('objects', 'buckets');

-- Resultado
SELECT '✅ RLS reabilitado com políticas configuradas!' as resultado; 