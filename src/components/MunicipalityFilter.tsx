
"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { municipalities } from "@/lib/locations";

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

  const handleSelect = (currentValue: string) => {
    const newSelection = selectedMunicipalities.includes(currentValue)
      ? selectedMunicipalities.filter((v) => v !== currentValue)
      : [...selectedMunicipalities, currentValue];
    onSelectionChange(newSelection);
  };

  const selectedLabels = availableMunicipalities
    .filter(m => selectedMunicipalities.includes(m.value))
    .map(m => m.label)
    .join(", ");

  return (
    <div className="w-full">
         <h2 className="text-sm font-medium text-muted-foreground mb-2">Filtrar por Municipio(s)</h2>
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            >
            <span className="truncate">
                {selectedMunicipalities.length > 0
                ? selectedLabels
                : "Seleccionar municipio(s)..."}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
            <CommandInput placeholder="Buscar municipio..." />
            <CommandList>
                <CommandEmpty>No se encontró el municipio.</CommandEmpty>
                <CommandGroup>
                {availableMunicipalities.map((municipality) => (
                    <CommandItem
                    key={municipality.value}
                    value={municipality.label}
                    onSelect={() => handleSelect(municipality.value)}
                    >
                    <Check
                        className={cn(
                        "mr-2 h-4 w-4",
                        selectedMunicipalities.includes(municipality.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                    />
                    {municipality.label}
                    </CommandItem>
                ))}
                </CommandGroup>
            </CommandList>
            </Command>
        </PopoverContent>
        </Popover>
    </div>
  );
}
