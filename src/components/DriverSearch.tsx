"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Driver, Location, VehicleType } from '@/types';
import { getDrivers } from '@/app/actions';
import { Header } from './Header';
import { LocationModal } from './LocationModal';
import { FilterControls } from './FilterControls';
import { DriverList } from './DriverList';
import { provinces, municipalities } from '@/lib/locations';

const LOCATION_STORAGE_KEY = 'localwheels-location';

export default function DriverSearch() {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [combustionTypes, setCombustionTypes] = useState<VehicleType[]>(['electric', 'hybrid', 'combustion']);

  useEffect(() => {
    try {
      const savedLocation = localStorage.getItem(LOCATION_STORAGE_KEY);
      if (savedLocation) {
        setLocation(JSON.parse(savedLocation));
      } else {
        setIsLocationModalOpen(true);
      }
    } catch (error) {
        console.error("Could not access localStorage:", error);
        setIsLocationModalOpen(true);
    }
  }, []);

  const fetchAndSetDrivers = useCallback(async (loc: Location, types: VehicleType[]) => {
    setIsLoading(true);
    const result = await getDrivers(loc.province, loc.municipality, types);
    setDrivers(result);
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    if (location) {
      fetchAndSetDrivers(location, combustionTypes);
    }
  }, [location, combustionTypes, fetchAndSetDrivers]);

  const handleLocationSave = (newLocation: Location) => {
    setLocation(newLocation);
    try {
        localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(newLocation));
    } catch (error) {
        console.error("Could not save to localStorage:", error);
    }
    setIsLocationModalOpen(false);
  };
  
  const handleProvinceChange = (province: string) => {
    const newMunicipality = municipalities[province]?.[0]?.value || '';
    setLocation(prev => ({ ...prev!, province, municipality: newMunicipality }));
  };

  const handleMunicipalityChange = (municipality: string) => {
    setLocation(prev => ({ ...prev!, municipality }));
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
          <DriverList drivers={drivers} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
}
