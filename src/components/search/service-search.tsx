"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {searchBusinesses, SearchBusinessItem} from "@/lib/actions/search-business";
import {Button} from "@/components/ui/button";
// import { searchBusinessesLite, type SearchBusinessItem } from "@/lib/actions/search-businesses";

const TABS = [
    { key: "all", label: "Todos" },
    { key: "transport", label: "Transporte" },
    { key: "market", label: "Mercado" },
    { key: "beauty", label: "Belleza" },
    { key: "restaurant", label: "Restaurantes" },
];

type ServiceSearchProps = {
    onSearch: (value: string | null) => void;
};

export function ServiceSearch({ onSearch }: ServiceSearchProps) {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["key"]>("all");
    const [rect, setRect] = useState<DOMRect | null>(null);

    const [items, setItems] = useState<SearchBusinessItem[]>([]);
    const [loading, setLoading] = useState(false);

    const anchorRef = useRef<HTMLDivElement>(null);
    const hasQuery = query.trim().length > 0;

    useLayoutEffect(() => {
        if (anchorRef.current) setRect(anchorRef.current.getBoundingClientRect());
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        if (open) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    // Debounce de búsqueda real
    useEffect(() => {
        if (!open) return;
        const q = query.trim();
        if (!q) {
            setItems([]);
            return;
        }

        setLoading(true);
        const t = setTimeout(async () => {
            try {
                const res = await searchBusinesses(q);
                setItems(res);
            } finally {
                setLoading(false);
            }
        }, 250);

        return () => clearTimeout(t);
    }, [query, open]);

    const filteredItems = useMemo(() => {
        if (activeTab === "all") return items;
        return items.filter((it) => it.section === activeTab);
    }, [items, activeTab]);

    const SearchInput = (
        <div className="flex items-center gap-3 rounded-full bg-muted px-5 py-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    if (!open) setOpen(true);
                }}
                placeholder="Buscar productos o servicios"
                className="w-full bg-transparent outline-none font-semibold"
                autoFocus={open}
            />
            {query && (
                <button
                    onClick={() => {
                        setQuery("");
                        setItems([]);
                        onSearch(null);
                    }}
                    className="rounded-full p-1 bg-black/10 hover:bg-primary hover:text-white cursor-pointer"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );

    return (
        <>
            <div ref={anchorRef} className="w-full max-w-3xl mx-auto" style={{ height: rect?.height }}>
                {!open && (
                    <div
                        onClick={() => {
                            if (anchorRef.current) setRect(anchorRef.current.getBoundingClientRect());
                            setOpen(true);
                        }}
                    >
                        {SearchInput}
                    </div>
                )}
            </div>

            {open && rect && (
                <>
                    <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setOpen(false)} />

                    <div
                        className="fixed z-50"
                        style={{
                            top: rect.top,
                            left: rect.left,
                            width: rect.width,
                        }}
                    >
                        {SearchInput}

                        {hasQuery && (
                            <div className="mt-3 bg-white rounded-2xl shadow-xl overflow-hidden">
                                <div className="px-3">
                                    <div className="flex border-b">
                                        {TABS.map((tab) => (
                                            <button
                                                key={tab.key}
                                                onClick={() => setActiveTab(tab.key)}
                                                className={cn(
                                                    "px-5 py-3 text-sm font-medium",
                                                    activeTab === tab.key ? "border-b-4 border-primary text-primary" : "text-muted-foreground"
                                                )}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="max-h-[360px] overflow-y-auto">
                                        {loading && (
                                            <div className="px-6 py-4 text-sm text-muted-foreground">
                                                Buscando…
                                            </div>
                                        )}

                                        {!loading && filteredItems.length === 0 && (
                                            <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                                                No se encontraron coincidencias
                                            </div>
                                        )}

                                        {!loading && filteredItems.map((b) => (
                                            <button
                                                key={b.id}
                                                onClick={() => {
                                                    onSearch(b.name);
                                                    setQuery(b.name);
                                                    setOpen(false);
                                                }}
                                                className="flex w-full flex-col gap-1 px-6 py-4 hover:bg-muted text-left"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Search className="h-4 w-4 text-muted-foreground"/>
                                                    <span className="text-sm font-medium">{b.name}</span>
                                                </div>

                                                {b.description && (
                                                    <p className="text-xs text-muted-foreground line-clamp-2 pl-7">
                                                        {b.description}
                                                    </p>
                                                )}
                                            </button>
                                        ))}

                                        {!loading && filteredItems.length > 0 && (
                                            <div className="flex justify-center py-4">
                                                <Button
                                                    onClick={() => {
                                                        onSearch(query);
                                                        setOpen(false);
                                                    }}
                                                    variant="secondary"
                                                    className="px-3 py-1 rounded-full transition hover:cursor-pointer bg-muted hover:bg-primary hover:text-white"
                                                >
                                                    Buscar “{query}”
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
}
