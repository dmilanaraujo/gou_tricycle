"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Driver, Location, VehicleType } from '@/types';
import { Header } from '@/components/client/header';
// import { LocationModal } from './location-modal';
// import { FilterControls } from './filter-controls';
// import { DriverList } from './driver-list';
import { provinces, municipalities } from '@/lib/data/locations';
// import { MunicipalityFilter } from './municipality-filter';
import {getDrivers} from '@/lib/actions/drivers';
import {Button} from '@/components/ui/button';
import {LocationModal} from "@/components/client/location-modal";
import {FilterControls} from "@/components/client/filter-controls";
import {MunicipalityFilter} from "@/components/client/municipality-filter";
import {DriverList} from "@/components/client/driver-list";

const LOCATION_STORAGE_KEY = 'localwheels-location';

export default function NavBar() {
    const [location, setLocation] = useState<Location | null>(null);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
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
        </div>
    );
}
