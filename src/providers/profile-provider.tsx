'use client'
import { createContext, useContext } from 'react'
import {Business} from '@/types';
import * as React from 'react';

const ProfileContext = createContext<any>(null)

export const useProfile = () => useContext(ProfileContext)

export const ProfileProvider = ({ profile, children }: { profile: Business, children: React.ReactNode }) => {
	return (
		<ProfileContext.Provider value={profile}>
			{children}
		</ProfileContext.Provider>
	)
}
