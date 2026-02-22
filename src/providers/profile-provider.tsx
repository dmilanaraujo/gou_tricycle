'use client'
import { createContext, useContext } from 'react'
import {Profile} from '@/types';
import * as React from 'react';

const ProfileContext = createContext<Profile>({} as Profile);

export const useProfile = () => useContext(ProfileContext)

export const ProfileProvider = ({ profile, children }: { profile: Profile, children: React.ReactNode }) => {
	return (
		<ProfileContext.Provider value={profile}>
			{children}
		</ProfileContext.Provider>
	)
}
