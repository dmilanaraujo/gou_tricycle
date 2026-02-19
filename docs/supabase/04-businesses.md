```sql

CREATE TYPE promotion_type AS ENUM ('nuevo', 'destacado', 'popular', 'recomendado', 'en_oferta', 'envio_gratis', 'top_valorado');

create table public.businesses (
  id uuid not null default gen_random_uuid (),
  name text not null,
  description text null,
  province character varying null,
  municipality character varying null,
  phone text null,
  whatsapp text null,
  is_active boolean null default false,
  created_at timestamp with time zone null default now(),
  logo text null,
  banner text null,
  rating numeric null default '5'::numeric,
  reviews numeric null default '0'::numeric,
  promotion public.promotion_type null default 'nuevo'::promotion_type,
  featured boolean null default false,
  address text null,
  section_id uuid null,
  slug text null,
  constraint businesses_pkey primary key (id),
  constraint businesses_slug_key unique (slug),
  constraint businesses_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE,
  constraint businesses_section_id_fkey foreign KEY (section_id) references sections (id)
) TABLESPACE pg_default;

create index IF not exists idx_businesses_slug on public.businesses using btree (slug) TABLESPACE pg_default;

CREATE OR REPLACE FUNCTION public.fn_handle_new_user_business()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    max_suffix INTEGER;
BEGIN

    -- Solo crear driver si el rol es 'business'
    IF NEW.raw_user_meta_data->>'role' = 'business' THEN
    
        -- 1 - generar slug base
        base_slug := lower(trim(regexp_replace(
            NEW.raw_user_meta_data->>'name',
            '[^a-zA-Z0-9]+',
            '-',
            'g'
        ), '-'));
        
       -- 2 - buscar máximo sufijo existente en una sola query
        SELECT COALESCE(MAX(
            CASE 
                WHEN slug = base_slug THEN 0
                WHEN slug ~ ('^' || base_slug || '-[0-9]+$')
                THEN (regexp_replace(slug, '^' || base_slug || '-', ''))::int
                ELSE NULL
            END
        ), -1)
        
        INTO max_suffix
        FROM public.businesses
        WHERE slug = base_slug
           OR slug LIKE base_slug || '-%';

        -- 3 - construir slug final
        IF max_suffix = -1 THEN
            final_slug := base_slug;
        ELSE
            final_slug := base_slug || '-' || (max_suffix + 1);
        END IF;

        INSERT INTO public.businesses (id, phone, name, slug)
        VALUES (
            NEW.id, 
            (NEW.phone)::VARCHAR,
            (NEW.raw_user_meta_data->>'name')::VARCHAR,
            final_slug
        );
    END IF;

    RETURN NEW;
END;
$$;

-- trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created_business ON auth.users;

CREATE TRIGGER on_auth_user_created_business
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.fn_handle_new_user_business();


-----------------------



ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

create policy "businesses_all_select"
on public.businesses
for select
to authenticated, anon
using (
   true
);
```
