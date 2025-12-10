"use client"

import { Form } from "@/components/ui/form"
import {FieldValues, FormProvider, UseFormReturn} from 'react-hook-form'
import { ReactNode } from "react"

interface ReusableFormProps<T extends FieldValues> {
	// form: ReturnType<typeof useForm<T>>;
	form: UseFormReturn<T>;
	children: ReactNode;
	onSubmit?: (values: T) => void;
	className?: string;
}

// export function ReusableForm<T extends IntrinsicAttributes & { children: ReactNode | ReactNode[] } & UseFormReturn<FieldValues, never, T>>({ form, children, onSubmit, className }: ReusableFormProps<T>) {
export function ReusableForm<T extends FieldValues>({ form, children, onSubmit, className }: ReusableFormProps<T>){
return (
		<FormProvider {...form}>
			<Form {...form}>
				<form onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined} className={className}>
					{children}
				</form>
			</Form>
		</FormProvider>
	)
}
