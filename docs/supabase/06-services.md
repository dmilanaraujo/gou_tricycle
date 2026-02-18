```sql
CREATE TYPE measure_unit AS ENUM ( 'kg', 'gramo', 'libra', 'onza', 'metro', 'cm', 'mm', 'litro', 'ml', 'galon', 'm2', 'cm2', 'unidad', 'paquete', 'caja');

create table public.services (
  id uuid not null default gen_random_uuid (),
  business_id uuid null,
  name text not null,
  description text null,
  price numeric null default '0'::numeric,
  is_active boolean null default false,
  item_type text not null default 'service'::text,
  business_category_id uuid null,
  is_featured boolean not null default false,
  product_discounts_id uuid null,
  price_usd numeric not null default '0'::numeric,
  sku character varying(255) null,
  um public.measure_unit null,
  constraint services_pkey primary key (id),
  constraint services_business_category_id_fkey foreign KEY (business_category_id) references business_categories (id) on delete set null,
  constraint services_business_id_fkey foreign KEY (business_id) references businesses (id) on delete CASCADE,
  constraint services_product_discounts_id_fkey foreign KEY (product_discounts_id) references product_discounts (id) on delete set null,
  constraint services_item_type_check check (
    (
      item_type = any (array['service'::text, 'product'::text])
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_services_business_id on public.services using btree (business_id) TABLESPACE pg_default;

create index IF not exists idx_services_item_type on public.services using btree (item_type) TABLESPACE pg_default;

create index IF not exists idx_services_business_category_id on public.services using btree (business_category_id) TABLESPACE pg_default;

create index IF not exists idx_services_is_featured on public.services using btree (is_featured) TABLESPACE pg_default;

create unique INDEX IF not exists idx_services_business_external_unique on public.services using btree (business_id, sku) TABLESPACE pg_default
where (sku is not null);

--------------------------------------------------------

---------------Triggers-----------------------------------------

CREATE OR REPLACE FUNCTION public.fn_autogenerate_service_sku()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
    prefix TEXT;
    last_number INTEGER;
    new_number INTEGER;
    new_sku TEXT;
BEGIN
    -- Solo autogenerar si viene NULL o vacío
    IF NEW.sku IS NULL OR NEW.sku = '' THEN

        -- Validar que exista business_id
        IF NEW.business_id IS NULL THEN
            RAISE EXCEPTION 'business_id is required to autogenerate SKU';
        END IF;

        -- Definir prefijo según item_type
        IF NEW.item_type = 'service' THEN
            prefix := 'SRV-';
        ELSE
            prefix := 'PRD-';
        END IF;

        -- Obtener último número usado para ese business_id y prefijo
        SELECT COALESCE(
            MAX(CAST(SUBSTRING(sku FROM 5) AS INTEGER)),
            0
        )
        INTO last_number
        FROM public.services
        WHERE business_id = NEW.business_id
          AND sku LIKE prefix || '%';

        new_number := last_number + 1;

        -- Generar SKU con padding a 5 dígitos
        new_sku := prefix || LPAD(new_number::TEXT, 5, '0');

        -- Verificación extra por seguridad (por concurrencia)
        WHILE EXISTS (
            SELECT 1 
            FROM public.services 
            WHERE business_id = NEW.business_id
              AND sku = new_sku
        ) LOOP
            new_number := new_number + 1;
            new_sku := prefix || LPAD(new_number::TEXT, 5, '0');
        END LOOP;

        NEW.sku := new_sku;
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_autogenerate_service_sku ON public.services;

CREATE TRIGGER trg_autogenerate_service_sku
BEFORE INSERT ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.fn_autogenerate_service_sku();

--------------------------------------------------------

  
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

create policy "all services can read"
on public.services
for select
using (true);

-- Insert primary
create policy "services can insert"
on public.services
for insert
with check (true);

-- UPDATE primary
create policy "services can update"
on public.services
for update
using (true)
with check (true);

```
