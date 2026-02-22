'use client'
import { createContext, useContext } from 'react'
import {Business} from '@/types';
import * as React from 'react';

const BusinessContext = createContext<Business>({} as Business);

export const useBusiness = () => useContext(BusinessContext)

export const BusinessProvider = ({ business, children }: { business: Business, children: React.ReactNode }) => {
	return (
		<BusinessContext.Provider value={business}>
			{children}
		</BusinessContext.Provider>
	)
}
