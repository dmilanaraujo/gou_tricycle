"use client"

import { Form } from "@/components/ui/form"
import {FieldValues, FormProvider, UseFormReturn} from 'react-hook-form'
import { ReactNode } from "react"

interface ReusableFormProps<T extends FieldValues, TContext = any, TOutput = T> {
	form: UseFormReturn<T, TContext, TOutput>;
	children: ReactNode;
	onSubmit?: (values: TOutput) => void;
	className?: string;
}

export function ReusableForm<T extends FieldValues, TContext = any, TOutput = T>({ form, children, onSubmit, className }: ReusableFormProps<T, TContext, TOutput>){
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
