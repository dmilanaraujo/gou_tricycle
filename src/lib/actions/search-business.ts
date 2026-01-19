"use server";

import { createClient } from "@/lib/supabase/server";

export type SearchBusinessItem = {
    id: string;
    name: string;
    description: string | null;
    section: string | null; // slug del tab
};

export async function searchBusinesses(query: string): Promise<SearchBusinessItem[]> {
    const supabase = await createClient();

    const q = query.trim();
    if (!q) return [];

    const { data, error } = await supabase
        .from("businesses")
        .select(`
          id,
          name,
          description,
          business_sections(
            section:sections(slug)
          )
        `)
        .eq("is_active", true)
        .or(`name.ilike.%${q}%,description.ilike.%${q}%,phone.ilike.%${q}%,whatsapp.ilike.%${q}%`)
        .limit(25);

    if (error || !data) return [];

    return data.map((b: any) => ({
        id: b.id,
        name: b.name,
        description: b.description ?? null,
        section: b.business_sections?.[0]?.section?.slug ?? null,
    }));
}
