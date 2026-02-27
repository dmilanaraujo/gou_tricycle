"use client";

import { Button } from "@/components/ui/button";
import {ChevronDownIcon, CopyIcon, Download, Loader2, ShareIcon} from 'lucide-react';
import {useBusiness} from '@/providers/business-provider';
import {useGenerateMenuPdf} from '@/hooks/api/business';
import {toast} from 'sonner';
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {ButtonGroup} from '@/components/ui/button-group';
import {useCopyToClipboard} from '@/hooks/use-copy-to-clipboard';
import {getPublicMenuUrl} from '@/lib/utils';

export default function GenerateMenuPdfButton() {
	const business = useBusiness();
	const [ copyToClipboard, isCopied ]= useCopyToClipboard()
	const { mutateAsync, isPending } = useGenerateMenuPdf();
	
	const generate = async () => {
		try {
			await mutateAsync(business);
			toast.success("Menú pdf generado. Listo para descargar");
		} catch (e) {
			console.error(e);
			toast.error('No se pudo generar el menú. Intente en unos minutos.')
		}
	}
	return (
		<ButtonGroup>
			{/*<Button variant="outline">Follow</Button>*/}
			<Button
				// size="sm"
				variant="outline"
				onClick={generate}
				disabled={isPending}
				className='cursor-pointer'
			>
				{isPending ? <Loader2 className='animate-spin'/> : <Download />}
				{isPending ? "Generando..." : "Generar pdf del menú"}
			</Button>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="!pl-2">
						<ChevronDownIcon />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-44">
					<DropdownMenuGroup>
						<DropdownMenuItem onClick={async () => {
							const menuUrl = getPublicMenuUrl(business.slug);
							const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(menuUrl)}`;
							window.open(whatsappUrl, "_blank");
						}}>
							<ShareIcon />
							Compartir url
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={async () => {
								await copyToClipboard(getPublicMenuUrl(business.slug));
								toast.info('La url ha sido copiada!')
							}}
						>
							<CopyIcon />
							Copiar url
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</ButtonGroup>
	)
	
}
