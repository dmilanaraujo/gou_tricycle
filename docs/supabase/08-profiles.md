```sql

create table public.profiles (
  id uuid not null,
  phone character varying null default ''::character varying,
  name character varying null default ''::character varying,
  is_active boolean null default false,
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

------------------------------------------------------------------

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


-----------------------



ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

create policy "profiles_all_select"
on public.profiles
for select
to authenticated, anon
using (
   true
);
```
