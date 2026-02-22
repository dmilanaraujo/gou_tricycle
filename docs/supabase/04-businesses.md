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
  exchange_rate numeric null default '0'::numeric,
  constraint businesses_pkey primary key (id),
  constraint businesses_slug_key unique (slug),
  constraint businesses_section_id_fkey foreign KEY (section_id) references sections (id)
) TABLESPACE pg_default;

create index IF not exists idx_businesses_slug on public.businesses using btree (slug) TABLESPACE pg_default;

-------------------Trigger para autogenerar el slug al insertar un nuevo negocio----------------------------------------

CREATE OR REPLACE FUNCTION public.fn_set_business_slug()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    max_suffix INTEGER;
BEGIN

    -- Solo ejecutar:
    -- 1) En INSERT
    -- 2) En UPDATE si el name cambió
    IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.name IS DISTINCT FROM OLD.name) THEN

        -- 1 - generar slug base
        base_slug := lower(trim(regexp_replace(
            NEW.name,
            '[^a-zA-Z0-9]+',
            '-',
            'g'
        ), '-'));

        -- 2 - buscar máximo sufijo existente
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
        WHERE id <> NEW.id
          AND (slug = base_slug OR slug LIKE base_slug || '-%');

        -- 3 - construir slug final
        IF max_suffix = -1 THEN
            final_slug := base_slug;
        ELSE
            final_slug := base_slug || '-' || (max_suffix + 1);
        END IF;

        NEW.slug := final_slug;
    END IF;

    RETURN NEW;
END;
$$;

-- trigger the function every time a user is created
DROP TRIGGER IF EXISTS trg_set_business_slug ON public.businesses;

CREATE TRIGGER trg_set_business_slug
BEFORE INSERT OR UPDATE OF name
ON public.businesses
FOR EACH ROW
EXECUTE FUNCTION public.fn_set_business_slug();


--------------Trigger-para crear la asociacion entre el usuario y el negocio al insertar un nuevo negocio--------
CREATE OR REPLACE FUNCTION public.fn_link_profile_business()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    current_user_id uuid;
BEGIN
    -- Obtener el usuario autenticado
    current_user_id := auth.uid();

    -- Seguridad extra
    IF current_user_id IS NULL THEN
        RAISE EXCEPTION 'No authenticated user found';
    END IF;

    -- Insertar relación
    INSERT INTO public.profile_business (profile_id, business_id)
    VALUES (current_user_id, NEW.id);

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_link_profile_business ON public.businesses;

CREATE TRIGGER trg_link_profile_business
AFTER INSERT ON public.businesses
FOR EACH ROW
EXECUTE FUNCTION public.fn_link_profile_business();

---------trigger Webhook telegram notification--------------

create trigger business_created_and_status_updated
after INSERT
or
update on businesses for EACH row
execute FUNCTION supabase_functions.http_request (
  'https://jcykcenzvyhypdahfyfn.supabase.co/functions/v1/business_telegram_notification',
  'POST',
  '{"Content-type":"application/json","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjeWtjZW56dnloeXBkYWhmeWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5OTgxNzksImV4cCI6MjA4MDU3NDE3OX0.KgAqaHy2nj4-41U7ZKWv8vhIDv1adRRja-10YTI5MVA"}',
  '{}',
  '5000'
);

-----------------------



ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

create policy "businesses_all_select"
on public.businesses
for select
to authenticated, anon
using (
   true
);

alter policy "all permissions businesses"

on "public"."businesses"
to public
using (
  true
) with check (
  true
);

```
