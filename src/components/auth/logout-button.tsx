'use client'

import * as React from 'react'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logout } from '@/lib/actions/auth'
import {useConfirm} from '@/components/common/confirm-dialog-provider';
import {useLoadingRouter} from '@/providers/navigation-loading-provider';

interface LogoutButtonProps {
	className?: string
	iconClassName?: string
	children?: React.ReactNode
}

export function LogoutButton({ className, iconClassName, children }: LogoutButtonProps) {
	const [loading, setLoading] = React.useState(false)
	const confirm = useConfirm();
	const router = useLoadingRouter();
	
	const handleLogout = async () => {
		try {
			const prompt = await confirm({
				dialogTitle: 'Confirme',
				description: 'Desea cerrar la session?'
			})
			if (prompt) {
				setLoading(true)
				await logout();
				router.push('/')
			}
		} finally {
			setLoading(false)
		}
	}
	
	return (
		<Button
			type="button"
			disabled={loading}
			onClick={handleLogout}
			className={className}
		>
			<LogOut className={iconClassName ?? 'h-4 w-4'} />
			{children}
		</Button>
	)
}
