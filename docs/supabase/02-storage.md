```sql

-- Crear bucket si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('driver_images', 'driver_images', true);

-- Política para subir imágenes (solo usuarios autenticados)
CREATE POLICY "Usuarios pueden subir sus propias imágenes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'driver_images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Política para leer imágenes (público)
CREATE POLICY "Cualquiera puede ver imágenes"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'driver_images');

-- Política para eliminar imágenes (solo propietario)
CREATE POLICY "Usuarios pueden eliminar sus propias imágenes"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'driver_images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-------------------------------------------------------------------------------

-- Crear bucket si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('business_images', 'business_images', true);

-- Política para subir imágenes (solo usuarios autenticados)
CREATE POLICY "Negocios pueden subir sus propias imágenes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'business_images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Política para leer imágenes (público)
CREATE POLICY "Cualquiera puede ver imágenes de los negocios"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'business_images');

-- Política para eliminar imágenes (solo propietario)
CREATE POLICY "Negocios pueden eliminar sus propias imágenes"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'business_images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```
