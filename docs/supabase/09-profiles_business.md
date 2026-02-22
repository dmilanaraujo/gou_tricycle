```sql

create table public.profile_business (
  profile_id uuid not null,
  business_id uuid not null,
  constraint profile_business_pkey primary key (profile_id, business_id),
  constraint profile_business_business_id_fkey foreign KEY (business_id) references businesses (id) on update CASCADE on delete CASCADE,
  constraint profile_business_profile_id_fkey1 foreign KEY (profile_id) references profiles (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;

```
