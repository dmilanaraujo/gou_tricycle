'use client'
import { createContext, useContext } from 'react'
import {Business, Profile} from '@/types';
import * as React from 'react';

const ProfileContext = createContext<Profile>({} as Profile);
const BusinessesContext = createContext<Business[]>([]);

export const useProfile = () => useContext(ProfileContext)
export const useBusinesses = () => useContext(BusinessesContext)

export const ProfileProvider = ({ profile, businesses, children }: { profile: Profile, businesses: Business[], children: React.ReactNode }) => {
	return (
		<ProfileContext.Provider value={profile}>
			<BusinessesContext.Provider value={businesses}>
				{children}
			</BusinessesContext.Provider>
		</ProfileContext.Provider>
	)
}
