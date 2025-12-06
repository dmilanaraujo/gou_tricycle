"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Driver, Location, VehicleType } from '@/types';
import { Header } from './Header';
import { LocationModal } from './LocationModal';
import { FilterControls } from './FilterControls';
import { DriverList } from './DriverList';
import { provinces, municipalities } from '@/lib/data/locations';
import { MunicipalityFilter } from './MunicipalityFilter';
import {getDrivers} from '@/lib/actions/drivers';

const LOCATION_STORAGE_KEY = 'localwheels-location';

export default function DriverSearch() {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [combustionTypes, setCombustionTypes] = useState<VehicleType[]>(['electric', 'hybrid', 'combustion']);
  const [selectedMunicipalities, setSelectedMunicipalities] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedLocation = localStorage.getItem(LOCATION_STORAGE_KEY);
      if (savedLocation) {
        const parsedLocation = JSON.parse(savedLocation);
        setLocation(parsedLocation);
        setSelectedMunicipalities([parsedLocation.municipality]);
      } else {
        setIsLocationModalOpen(true);
      }
    } catch (error) {
        console.error("No se pudo acceder a localStorage:", error);
        setIsLocationModalOpen(true);
    }
  }, []);

  const fetchAndSetDrivers = useCallback(async (loc: Location, types: VehicleType[], searchMunicipalities: string[]) => {
    setIsLoading(true);
    if (searchMunicipalities.length > 0) {
      const result = await getDrivers(loc.province, loc.municipality, searchMunicipalities, types);
      if (result.success) {
        setDrivers(result.data || []);
      }
    } else {
      setDrivers([]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (location && selectedMunicipalities.length > 0) {
      fetchAndSetDrivers(location, combustionTypes, selectedMunicipalities);
    } else if (location && selectedMunicipalities.length === 0) {
        // if no municipalities are selected, clear the list
        setDrivers([]);
    }
  }, [location, combustionTypes, selectedMunicipalities, fetchAndSetDrivers]);

  const handleLocationSave = (newLocation: Location) => {
    setLocation(newLocation);
    setSelectedMunicipalities([newLocation.municipality]);
    try {
        localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(newLocation));
    } catch (error) {
        console.error("No se pudo guardar en localStorage:", error);
    }
    setIsLocationModalOpen(false);
  };

  const handleProvinceChange = (province: string) => {
    const newMunicipality = municipalities[province]?.[0]?.value || '';
    const newLocation = { province, municipality: newMunicipality };
    setLocation(newLocation);
    setSelectedMunicipalities([newMunicipality]); // Reset municipality filter as well
    try {
        localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(newLocation));
    } catch (error) {
        console.error("No se pudo guardar en localStorage:", error);
    }
  };

  const handleMunicipalityChange = (municipality: string) => {
     const newLocation = { ...location!, municipality };
     setLocation(newLocation);
     // Do not reset multi-select here, user might want to keep it
    try {
        localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(newLocation));
    } catch (error) {
        console.error("No se pudo guardar en localStorage:", error);
    }
  };

  return (
    <div className="w-full">
      {location && (
        <Header
            province={location.province}
            municipality={location.municipality}
            onProvinceChange={handleProvinceChange}
            onMunicipalityChange={handleMunicipalityChange}
        />
      )}

      <LocationModal isOpen={isLocationModalOpen} onSave={handleLocationSave} />

      {location && (
        <div className="container mx-auto px-4 py-6 space-y-6">
          <FilterControls selectedTypes={combustionTypes} onTypeChange={setCombustionTypes} />
          <MunicipalityFilter
            province={location.province}
            selectedMunicipalities={selectedMunicipalities}
            onSelectionChange={setSelectedMunicipalities}
          />
          <DriverList drivers={drivers} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
}
