"use client";

import {useState, useEffect, useMemo} from 'react';
import { Location, VehicleType, VehicleTypeEnum} from '@/types';
import { Header } from '@/components/client/header';
import { LocationModal } from './location-modal';
import { FilterControls } from './filter-controls';
import { DriverList } from './driver-list';
import { municipalities } from '@/lib/data/locations';
import { MunicipalityFilter } from './municipality-filter';
import {Button} from '@/components/ui/button';
import {useInView} from 'react-intersection-observer';
import {useInfinityDrivers} from '@/hooks/api/driver';
import {Loader2, RefreshCw} from 'lucide-react'

const LOCATION_STORAGE_KEY = 'localwheels-location';

export default function DriverSearch() {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [combustionTypes, setCombustionTypes] = useState<VehicleType[]>(['electric', 'hybrid', 'combustion']);
  const [selectedMunicipalities, setSelectedMunicipalities] = useState<string[]>([]);
  
  const { ref, inView } = useInView()
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch
  } = useInfinityDrivers({
    province: location?.province!,
    referenceMunicipality: location?.municipality!,
    filterMunicipalities: selectedMunicipalities,
    vehicleTypes: combustionTypes.map(v => v as VehicleTypeEnum),
    limit: 20
  }, {
    enabled: !!location?.province && !!location?.municipality && combustionTypes.length > 0 && selectedMunicipalities.length > 0
  })
  
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage().then()
    }
  }, [inView, hasNextPage, fetchNextPage])

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
  
  const handleReload = () => {
    if (!location) return;
    refetch().then();
  };

  const drivers = useMemo(() => {
    return data?.pages.flatMap(p => p.data || []) || [];
  }, [data?.pages])
  
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
            <div className="grid grid-cols-1 md:flex justify-between md:py-6 space-y-6">
              <FilterControls selectedTypes={combustionTypes} onTypeChange={setCombustionTypes}/>
              <MunicipalityFilter
                  province={location.province}
                  selectedMunicipalities={selectedMunicipalities}
                  onSelectionChange={setSelectedMunicipalities}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <h2 className="text-sm text-muted-foreground">
                {drivers.length || 0} conductores encontrados
              </h2>
              
              <Button
                  onClick={handleReload}
                  disabled={isLoading}
                  className={'cursor-pointer'}
              >
                {isLoading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      Recargando...
                    </>
                ) : (
                    <>
                      <RefreshCw/>
                      Recargar
                    </>
                )}
              </Button>
            </div>
            <DriverList drivers={drivers} isLoading={isLoading}/>
            <div ref={ref} className="h-10 w-full flex justify-center items-center">
              {isFetchingNextPage && <Loader2 className="w-6 h-6 animate-spin text-primary" />}
              {!hasNextPage && drivers.length > 0 && (
                  <p className="text-muted-foreground text-sm py-4">
                    No hay más elementos para mostrar
                  </p>
              )}
            </div>
          </div>
      )}
    </div>
  );
}
