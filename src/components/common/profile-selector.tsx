"use client"

import * as React from "react"
import {
	Combobox,
	ComboboxInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox"

import {ProfilesFilterValues} from '@/lib/schemas/auth';
import {useGetProfiles} from '@/hooks/api/profile';
import {Profile} from '@/types';
import { Item, ItemContent, ItemDescription, ItemTitle } from "../ui/item";
import {Badge} from '@/components/ui/badge';
import {useEffect, useMemo, useState} from 'react';
import {useProfile} from '@/providers/profile-provider';

type ProfileItem = Profile & { label: string; value: string, description?: string }

type ProfileComboboxProps = {
	value?: string
	onChange: (value: string | null) => void
	filter?: ProfilesFilterValues
	placeholder?: string;
	hideAdminIndicator?: boolean;
	hideMyUserIndicator?: boolean;
	hideMyUser?: boolean;
	defaultSelectAuthUser?: boolean;
	showClear?: boolean;
}
const formatProfileItem = (p: Profile) => {
	return {
		...p,
		label: `${p.name || p.phone || p.email || '-'}`,
		description: p.name ? p.phone || p.email : '',
		value: p.id,
	};
}

export function ProfileSelector({
	                                value,
	                                onChange,
	                                filter = {},
	                                placeholder = "Seleccione un perfil",
	                                hideAdminIndicator = false,
	                                hideMyUserIndicator = false,
	                                hideMyUser = false,
	                                defaultSelectAuthUser = true,
	                                showClear = false
                                }: ProfileComboboxProps) {
	const profile = useProfile();
	const [selected, setSelected] = useState<ProfileItem|null>(null);
	
	const { data: profiles = [], isLoading } = useGetProfiles(filter)
	
	const items: ProfileItem[] = useMemo(() => {
		return profiles
			.filter(p => !hideMyUser || (hideMyUser && p.id != profile.id))
			.sort((a, b) => a.id == profile.id ? -1 : 1)
			.map((p) => formatProfileItem(p))
	}, [profiles])
	
	useEffect(() => {
		if (items.length == 0) return;
		let item;
		if (defaultSelectAuthUser && !value) {
			item = items.find((item) => item.value === profile.id);
		} else if(!!value){
			item = items.find((item) => item.value === value);
		}
		setSelected(!!item ? formatProfileItem(item) : null);
	}, [profiles, value])
	
	return (
		<Combobox
			items={items}
			value={selected}
			onValueChange={(item) => onChange(item?.id ?? null)}
			itemToStringValue={(item) => item.label}
			
		>
			<ComboboxInput placeholder={placeholder} showClear={showClear}/>
			<ComboboxContent>
				{isLoading && <ComboboxEmpty>Cargando perfiles...</ComboboxEmpty>}
				
				{!isLoading && items.length === 0 && (
					<ComboboxEmpty>No se encontraron usuarios</ComboboxEmpty>
				)}
				
				<ComboboxList>
					{(item: ProfileItem) => (
						<ComboboxItem key={item.id} value={item}>
							<Item size="xs" className="p-0">
								<ItemContent>
									<ItemTitle className="whitespace-nowrap">
										{item.label}
									</ItemTitle>
									{!!item.description && (
										<ItemDescription>
											{item.description}
										</ItemDescription>
									)}
								</ItemContent>
								{!hideMyUserIndicator && item.id == profile.id && (
									<ItemContent className="flex-none text-center">
										<ItemDescription>
											<Badge className='bg-blue-600 py-0'>Yo</Badge>
										</ItemDescription>
									</ItemContent>
								)}
								{!hideAdminIndicator && item.is_admin && (
									<ItemContent className="flex-none text-center">
										<ItemDescription>
											<Badge className='bg-green-600 py-0'>admin</Badge>
										</ItemDescription>
									</ItemContent>
								)}
							</Item>
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	)
}
