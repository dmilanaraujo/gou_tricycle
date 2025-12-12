"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { VehicleType } from "@/types";
import {combustionTypes} from '@/lib/utils';

interface FilterControlsProps {
  selectedTypes: VehicleType[];
  onTypeChange: (types: VehicleType[]) => void;
}

export function FilterControls({ selectedTypes, onTypeChange }: FilterControlsProps) {

  return (
    <div className="w-full">
      <h2 className="text-sm font-medium text-muted-foreground mb-2">Tipo de Combustible</h2>
      <ToggleGroup
        type="multiple"
        variant="outline"
        value={selectedTypes}
        onValueChange={(value: VehicleType[]) => {
            // Ensure at least one is selected
            if (value.length > 0) {
                onTypeChange(value);
            }
        }}
        // className="w-full justify-start gap-2 flex-wrap"
        className="w-full justify-start flex-wrap"
      >
        {combustionTypes.map(({ value, label }) => (
          <ToggleGroupItem key={value} value={value} aria-label={`Filtrar por ${label}`} className="flex-grow sm:flex-grow-0">
            {label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
