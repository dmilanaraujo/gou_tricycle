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
  is_active boolean null default true,
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


CREATE OR REPLACE FUNCTION public.fn_handle_new_user_business()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN

    -- Solo crear driver si el rol es 'business'
    IF NEW.raw_user_meta_data->>'role' = 'business' THEN
        INSERT INTO public.businesses (id, phone, name)
        VALUES (
            NEW.id, 
            (NEW.phone)::VARCHAR,
            (NEW.raw_user_meta_data->>'name')::VARCHAR
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
