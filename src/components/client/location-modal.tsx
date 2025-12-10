"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { provinces, municipalities } from "@/lib/data/locations";
import type { Location } from '@/types';
import {NativeSelect, NativeSelectOption} from '@/components/ui/native-select';

interface LocationModalProps {
  isOpen: boolean;
  onSave: (location: Location) => void;
}

export function LocationModal({ isOpen, onSave }: LocationModalProps) {
  const [selectedProvince, setSelectedProvince] = useState(provinces[0].value);
  const [selectedMunicipality, setSelectedMunicipality] = useState(municipalities[provinces[0].value][0].value);

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    // Resetear municipio cuando la provincia cambia
    setSelectedMunicipality(municipalities[province][0].value);
  };

  const handleSave = () => {
    onSave({ province: selectedProvince, municipality: selectedMunicipality });
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Selecciona tu ubicación</DialogTitle>
          <DialogDescription>
            Por favor, selecciona tu provincia y municipio para encontrar conductores cerca de ti.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4 w-full">
            <label htmlFor="province">Provincia</label>
            <NativeSelect id='province' value={selectedProvince} onChange={(evt) => handleProvinceChange(evt.target.value)} classNameContainer={'col-span-2 w-full'}>
              {provinces.map(p => (
                  <NativeSelectOption key={p.value} value={p.value}>{p.label}</NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div className="grid grid-cols-3 items-center gap-4 w-full">
             <label htmlFor="municipality">Municipio</label>
            <NativeSelect id="municipality" value={selectedMunicipality} onChange={(evt) => setSelectedMunicipality(evt.target.value)} classNameContainer={'col-span-2 w-full'} >
              {(municipalities[selectedProvince] || []).map(m => (
                  <NativeSelectOption key={m.value} value={m.value}>{m.label}</NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Guardar y Continuar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
