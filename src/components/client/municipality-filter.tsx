
"use client";
import * as React from "react";
import { municipalities } from "@/lib/data/locations";
import {MultiSelect} from '@/components/ui/multi-select';

interface MunicipalityFilterProps {
  province: string;
  selectedMunicipalities: string[];
  onSelectionChange: (selected: string[]) => void;
}

export function MunicipalityFilter({
  province,
  selectedMunicipalities,
  onSelectionChange,
}: MunicipalityFilterProps) {
  const [open, setOpen] = React.useState(false);
  const availableMunicipalities = municipalities[province] || [];

  const handleSelect = (value: string[]) => {
    onSelectionChange(value);
  };

  return (
    <div className="w-full">
         <h2 className="text-sm font-medium text-muted-foreground mb-2">Filtrar por Municipio(s)</h2>
        <MultiSelect
            defaultValue={selectedMunicipalities}
            options={availableMunicipalities}
            placeholder="Seleccionar municipio(s)..."
            className="w-full sm:w-auto"
            maxCount={2} // Fewer items on small screens
            searchable={false}
            hideSelectAll={true}
            onValueChange={handleSelect}
            animationConfig={{
                badgeAnimation: "fade",
                popoverAnimation: "scale",
            }}
        />
    </div>
  );
}
