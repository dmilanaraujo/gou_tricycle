```sql

create table public.profiles (
  id uuid not null,
  phone character varying null default ''::character varying,
  name character varying null default ''::character varying,
  is_active boolean null default true,
  created_at timestamp with time zone not null default now(),
  constraint profile_pkey primary key (id),
  constraint profile_phone_key unique (phone),
  constraint profile_id_fkey foreign KEY (id) references auth.users (id) on update CASCADE on delete CASCADE,
  constraint profiles_phone_check check (
    (
      (length((phone)::text) >= 8)
      and ((phone)::text ~ '^\+?[0-9\s\-\(\)]+$'::text)
    )
  )
) TABLESPACE pg_default;

----------------------trigger para crear el profile automaticamente al crearse un nuevo user (enviando raw_user_meta_data->>'role' = 'business_admin')--------------------------------------------

CREATE OR REPLACE FUNCTION public.fn_handle_new_user_profiles()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN

    -- Solo crear profiles si el rol es 'business_admin'
    IF NEW.raw_user_meta_data->>'role' = 'business_admin' THEN
    
        INSERT INTO public.profiles (id, phone, name)
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
DROP TRIGGER IF EXISTS on_auth_user_created_profiles ON auth.users;

CREATE TRIGGER on_auth_user_created_profiles
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.fn_handle_new_user_profiles();

----------------------Trigger para actualizar el phone del profile cuando se actualiza el phone del usuario------------------------------------------

CREATE OR REPLACE FUNCTION public.fn_handle_update_phone_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN

    UPDATE public.profiles
    SET
        phone = (NEW.phone)::VARCHAR
    WHERE id = NEW.id;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_phone_updated ON auth.users;

CREATE TRIGGER on_auth_user_phone_updated
AFTER UPDATE ON auth.users
FOR EACH ROW
WHEN (OLD.phone IS DISTINCT FROM NEW.phone)
EXECUTE PROCEDURE public.fn_handle_update_phone_user();
-----------------------



ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

create policy "profiles_all_select"
on public.profiles
for select
to authenticated, anon
using (
   true
);

create policy "update profile"
on "public"."profiles"
as PERMISSIVE
for UPDATE
to public
using (
    true
) with check (
    true
);
```
