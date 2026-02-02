"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import {cn} from '@/lib/utils';

interface DatePickerProps {
    value?: Date | undefined;
    onSelect: (value?: Date) => void;
    fromDate?: Date;
    className?: string;
    placeholder?: string;
}

export function DatePicker({ value, onSelect, fromDate, className, placeholder, ...props }: DatePickerProps) {
    
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!value}
                    className={cn(
                        "w-full justify-between text-left font-normal shadow-xs",
                        !value && "text-muted-foreground",
                        className
                    )}
                    // className="data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal"
                >
                    {/*{value ? format(value, "PPP") : <span>Pick a value</span>}*/}
                    {value ? format(value, 'dd/MM/yyyy') : <span>{placeholder || 'Fecha'}</span>}
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onSelect}
                    defaultMonth={value}
                    {...props}
                />
            </PopoverContent>
        </Popover>
    )
}
