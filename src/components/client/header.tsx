"use client";

import { provinces, municipalities } from "@/lib/data/locations";
import { Logo } from "@/components/client/brand";
import { DriverButton } from "./driver-button";
import {NativeSelect, NativeSelectOption} from '@/components/ui/native-select';

interface HeaderProps {
  province: string;
  municipality: string;
  onProvinceChange: (province: string) => void;
  onMunicipalityChange: (municipality: string) => void;
}

export function Header({ province, municipality, onProvinceChange, onMunicipalityChange }: HeaderProps) {

  return (
    <header className="w-full bg-card/80 backdrop-blur-sm sticky top-0 z-10 border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="flex justify-between w-full md:w-auto">
            <Logo />
            <span className="md:hidden">
               <DriverButton/>
            </span>
          </span>
          <div className="flex gap-2 w-full sm:w-auto items-center flex-col md:flex-row">
            <span className="font-semibold w-full text-center">
              Dónde te encuentras?
            </span>
            <span className="grid grid-cols-2 md:flex gap-2">
              <NativeSelect className={'md:min-w-[165px]'} value={province} onChange={(evt) => onProvinceChange(evt.target.value)} id={'header-select-province'} >
                {provinces.map(p => (
                    <NativeSelectOption key={p.value} value={p.value}>{p.label}</NativeSelectOption>
                ))}
              </NativeSelect>
               <NativeSelect className={'md:min-w-[165px]'} value={municipality} onChange={(evt) => onMunicipalityChange(evt.target.value)}  id={'header-select-municipality'}>
                {(municipalities[province] || []).map(m => (
                    <NativeSelectOption key={m.value} value={m.value}>{m.label}</NativeSelectOption>
                ))}
              </NativeSelect>
              <span className="hidden md:block">
                <DriverButton/>
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
