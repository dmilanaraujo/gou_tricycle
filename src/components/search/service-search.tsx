"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
    { key: "all", label: "Todos" },
    { key: "transport", label: "Transporte" },
    { key: "market", label: "Mercado" },
    { key: "beauty", label: "Belleza" },
];

const MOCK_SUGGESTIONS = [
    "pistachios",
    "pistachio cream",
    "pistachio chocolate",
    "pisano",
    "pistachio milk",
];

export function ServiceSearch() {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("all");
    const [rect, setRect] = useState<DOMRect | null>(null);

    const anchorRef = useRef<HTMLDivElement>(null);
    const hasQuery = query.trim().length > 0;

    /* Medir posición exacta */
    useLayoutEffect(() => {
        if (anchorRef.current) {
            setRect(anchorRef.current.getBoundingClientRect());
        }
    }, []);

    /* Bloquear scroll */
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    /* ESC */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        if (open) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const suggestions = hasQuery
        ? MOCK_SUGGESTIONS.filter((s) =>
            s.toLowerCase().includes(query.toLowerCase()),
        )
        : [];

    /* INPUT ÚNICO */
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
                    onClick={() => setQuery("")}
                    className="rounded-full p-1 bg-black/10 hover:bg-primary hover:text-white cursor-pointer"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );

    return (
        <>
            {/* Anchor original */}
            <div
                ref={anchorRef}
                className="w-full max-w-3xl mx-auto"
                style={{ height: rect?.height }}
            >
                {!open && (
                    <div
                        onClick={() => {
                            if (anchorRef.current) {
                                setRect(anchorRef.current.getBoundingClientRect());
                            }
                            setOpen(true);
                        }}
                    >
                        {SearchInput}
                    </div>
                )}
            </div>

            {/* Modal */}
            {open && rect && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={() => setOpen(false)}
                    />

                    {/* CONTENEDOR POSICIONADO (SIN PADDING) */}
                    <div
                        className="fixed z-50"
                        style={{
                            top: rect.top,
                            left: rect.left,
                            width: rect.width,
                        }}
                    >
                        {/* INPUT EXACTO */}
                        {SearchInput}

                        {/* CONTENIDO CON PADDING */}
                        {hasQuery && (
                            <div className="mt-3 bg-white rounded-2xl shadow-xl overflow-hidden">
                                <div className="px-3">
                                    {/* TABS */}
                                    <div className="flex border-b">
                                        {TABS.map((tab) => (
                                            <button
                                                key={tab.key}
                                                onClick={() => setActiveTab(tab.key)}
                                                className={cn(
                                                    "px-5 py-3 text-sm font-medium",
                                                    activeTab === tab.key
                                                        ? "border-b-4 border-primary text-primary"
                                                        : "text-muted-foreground",
                                                )}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* RESULTS */}
                                    <div className="max-h-[360px] overflow-y-auto">
                                        {suggestions.map((item) => (
                                            <button
                                                key={item}
                                                className="flex w-full items-center gap-4 px-6 py-4 hover:bg-muted text-left"
                                            >
                                                <Search className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">{item}</span>
                                            </button>
                                        ))}

                                        <button className="flex w-full items-center gap-4 px-6 py-4 hover:bg-muted">
                                            <Search className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">
                        Buscar “{query}”
                      </span>
                                        </button>
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
