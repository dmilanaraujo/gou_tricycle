"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { provinces, municipalities } from "@/lib/data/locations";
import { Logo } from "./Logo";

interface HeaderProps {
  province: string;
  municipality: string;
  onProvinceChange: (province: string) => void;
  onMunicipalityChange: (municipality: string) => void;
}

export function Header({ province, municipality, onProvinceChange, onMunicipalityChange }: HeaderProps) {

  return (
    <header className="w-full bg-card/80 backdrop-blur-sm sticky top-0 z-10 border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Logo />
          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={province} onValueChange={onProvinceChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Seleccionar Provincia" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map(p => (
                  <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={municipality} onValueChange={onMunicipalityChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Seleccionar Municipio" />
              </SelectTrigger>
              <SelectContent>
                {(municipalities[province] || []).map(m => (
                  <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
}
