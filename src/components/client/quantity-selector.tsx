"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {Button} from "@/components/ui/button";

interface QuantitySelectorProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    className?: string;
}

export function QuantitySelector({
                                    value,
                                    onChange,
                                    min = 1,
                                    max = 99,
                                    className,
                                }: QuantitySelectorProps) {
    const decrease = () => onChange(Math.max(min, value - 1));
    const increase = () => onChange(Math.min(max, value + 1));

    return (
        <div
            className={cn(
                "flex items-center rounded-lg border bg-background shadow-none",
                "overflow-hidden",
                className
            )}
        >
            <Button
                size="lg"
                variant="secondary"
                onClick={decrease}
                disabled={value <= min}
                className="text-muted-foreground text-xl rounded-r-none hover:bg-muted hover:cursor-pointer disabled:opacity-50"
            >
                <span className="text-lg font-bold">-</span>
            </Button>

            <div className="min-w-10 text-center text-lg font-medium">
                {value}
            </div>

            <Button
                size="lg"
                variant="secondary"
                onClick={increase}
                disabled={value >= max}
                className="text-muted-foreground text-xl rounded-l-none hover:bg-muted hover:cursor-pointer disabled:opacity-50"
            >
                +
            </Button>
        </div>
    );
}
