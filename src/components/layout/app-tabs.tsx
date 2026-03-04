"use client"

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs"

import { ScrollArea } from "@/components/ui/scroll-area"

type TabItem = {
	value: string
	name: string
	content: React.ReactNode
}

type VerticalTabsProps = {
	tabs: TabItem[]
	defaultValue?: string
	className?: string
}

export function AppTabs({ tabs, defaultValue, className = "w-full md:w-4xl" }: VerticalTabsProps) {
	return (
		<Tabs
			defaultValue={defaultValue ?? tabs?.[0]?.value}
			orientation="vertical"
			className={className}
		>
			<TabsList variant="line">
				{tabs.map((tab) => (
					<TabsTrigger key={tab.value} value={tab.value}>
						{tab.name}
					</TabsTrigger>
				))}
			</TabsList>
			
			{tabs.map((tab) => (
				<TabsContent
					key={tab.value}
					value={tab.value}
					className="flex w-full px-0 md:px-1"
				>
					<ScrollArea className="w-full md:max-h-[calc(100vh-270px)] md:pr-4">
						{tab.content}
					</ScrollArea>
				</TabsContent>
			))}
		</Tabs>
	)
}
