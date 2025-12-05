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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { provinces, municipalities } from "@/lib/locations";
import type { Location } from '@/types';

interface LocationModalProps {
  isOpen: boolean;
  onSave: (location: Location) => void;
}

export function LocationModal({ isOpen, onSave }: LocationModalProps) {
  const [selectedProvince, setSelectedProvince] = useState(provinces[0].value);
  const [selectedMunicipality, setSelectedMunicipality] = useState(municipalities[provinces[0].value][0].value);

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    // Reset municipality when province changes
    setSelectedMunicipality(municipalities[province][0].value);
  };

  const handleSave = () => {
    onSave({ province: selectedProvince, municipality: selectedMunicipality });
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Select Your Location</DialogTitle>
          <DialogDescription>
            Please select your province and municipality to find drivers near you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="province" className="text-right">Province</label>
            <Select value={selectedProvince} onValueChange={handleProvinceChange}>
              <SelectTrigger id="province" className="col-span-3">
                <SelectValue placeholder="Select Province" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map(p => (
                  <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
             <label htmlFor="municipality" className="text-right">Municipality</label>
            <Select value={selectedMunicipality} onValueChange={setSelectedMunicipality}>
              <SelectTrigger id="municipality" className="col-span-3">
                <SelectValue placeholder="Select Municipality" />
              </SelectTrigger>
              <SelectContent>
                {municipalities[selectedProvince]?.map(m => (
                  <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save and Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
