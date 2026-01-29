```sql
create table public.services (
  id uuid not null default gen_random_uuid (),
  business_id uuid null,
  name text not null,
  description text null,
  price numeric null,
  is_active boolean null default false,
  item_type text not null default 'service'::text,
  business_category_id uuid null,
  image_url text null,
  is_featured boolean not null default false,
  product_discounts_id uuid null,
  constraint services_pkey primary key (id),
  constraint services_business_category_id_fkey foreign KEY (business_category_id) references business_categories (id),
  constraint services_business_id_fkey foreign KEY (business_id) references businesses (id) on delete CASCADE,
  constraint services_product_discounts_id_fkey foreign KEY (product_discounts_id) references product_discounts (id),
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
