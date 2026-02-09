import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card';
import {Button} from '@/components/ui/button';
import {NotepadText} from 'lucide-react';
import * as React from 'react';

type NotesHoverCardProps = {
	title?: string;
	content: string;
}

export function NotesHoverCard({ content, title }: NotesHoverCardProps) {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button variant="ghost" size="icon">
					<NotepadText/>
				</Button>
			</HoverCardTrigger>
			<HoverCardContent className="w-80">
				<div className="flex justify-between gap-4">
					<div className="space-y-1">
						<h4 className="text-sm font-semibold">{ title || 'Notas'}</h4>
						<p className="text-sm">
							{content}
						</p>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
}
