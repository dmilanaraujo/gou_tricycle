"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { HousePlus, Loader2, X} from 'lucide-react';
import {Button} from "@/components/ui/button";
import { toast } from "sonner"
import {Product} from '@/types';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect} from 'react';
import {showActionErrors} from '@/lib/utils';
import {Input} from '@/components/ui/input';
import * as React from 'react';
import {UpdateStockInput, UpdateStockOutput, UpdateStockSchema} from '@/lib/schemas/product';
import {useUpdateStock} from '@/hooks/api/product';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {ReusableForm} from '@/components/common/reusable-form';

interface UpdateStockDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    product: Product;
    onSuccess?: (product: Product, data: UpdateStockOutput) => void;
    disabled?: boolean;
}

export function UpdateStockDialog({ product, onSuccess, isOpen, onOpenChange, disabled }: UpdateStockDialogProps) {

    const form = useForm<UpdateStockInput,  any, UpdateStockOutput>({
        resolver: zodResolver(UpdateStockSchema),
        defaultValues: {
            quantity: product.stock || '0',
        },
    });
    
    const { isSubmitting } = form.formState;
    const { mutateAsync: updateStock } = useUpdateStock();
    
    
    useEffect(() => {
        if(!isOpen) {
            form.reset();
        }
    }, [form, isOpen]);
    
    
    const onSubmit = async (data: UpdateStockOutput) => {
        const toastId = toast.loading(`Actualizando cantidad...`)
        try {
            const result = await updateStock({
                serviceId: product.id,
                quantity: data.quantity,
            });
            if (!result.success) {
                showActionErrors(result.errors, toastId)
                return;
            }
            toast.success('Cantidad actualizada con éxito.', { id: toastId})
            form.reset();
            onOpenChange(false);
            onSuccess?.(product, data);
        } catch (e) {
            console.log(e);
            toast.error('Error', {
                id: toastId,
                description: 'No se pudo actualizar la cantidad del producto'
            });
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline" disabled={disabled}>
                    <HousePlus className="h-4 w-4" />
                    Stock
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-lg p-0">
                <AlertDialogCancel asChild>
                    <button
                        type="button"
                        className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        onClick={() => onOpenChange(false)}
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </AlertDialogCancel>
                <AlertDialogHeader>
                    <AlertDialogTitle className="border-b p-4">
                        Actualizar cantidad
                        {/*<small className={'text-xs ml-2'}>({product.code})</small>*/}
                    </AlertDialogTitle>
                
                </AlertDialogHeader>
                <ReusableForm form={form}>
                    <div className="p-4  space-y-2">
                        <div className="grid grid-cols-1 items-start">
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Cantidad</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Cantidad en su stock..."
                                                min={0}
                                                type={'number'}
                                                {...field}
                                                value={field.value?.toString() ?? ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    field.onChange(val === '' ? undefined : val); // mandamos string o undefined
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </ReusableForm>
                <AlertDialogFooter className="border-t p-4">
                    <AlertDialogCancel
                        disabled={isSubmitting}
                        onClick={() => onOpenChange(false)}
                    >
                        Cancelar
                    </AlertDialogCancel>
                    <Button
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                    >
                        <>
                            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                            {isSubmitting ? 'Actualizando...' : 'Actualizar'}
                        </>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
