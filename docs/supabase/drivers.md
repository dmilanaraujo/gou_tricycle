```sql

CREATE TYPE vehicle_type_enum AS ENUM ('electric', 'combustion', 'hybrid');

CREATE TABLE public.drivers (
    id uuid not null,
    phone         varchar NOT NULL,
    online        boolean DEFAULT false,
    active_at     timestamp with time zone,
    alias         varchar,
    images        varchar[] DEFAULT '{}',   -- array de path/nombres de imágenes
    province      varchar,
    municipality  varchar,
    vehicle_type  vehicle_type_enum NOT NULL,
    constraint drivers_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE,
    constraint drivers_phone_check check (
      (
        (length((phone)::text) >= 8) and ((phone)::text ~ '^\+?[0-9\s\-\(\)]+$'::text)
      )
    )
) TABLESPACE pg_default;



CREATE OR REPLACE FUNCTION public.fn_handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN

    -- Solo crear driver si el rol es 'driver'
    IF NEW.raw_user_meta_data->>'role' = 'driver' THEN
        INSERT INTO public.drivers (id, phone, alias)
        VALUES (
            NEW.id, 
            (NEW.phone)::VARCHAR,
            (NEW.raw_user_meta_data->>'first_name')::VARCHAR
        );
    END IF;

    RETURN NEW;
END;
$$;

-- trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.fn_handle_new_user();

  
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;

create policy "drivers_all_select"
on public.drivers
for select
to authenticated, anon
using (
   true
);

```
