"use client"

import React,{ useState, useCallback, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {cn, slugify} from '@/lib/utils'
import {MeasureUnit} from '@/types';
import {useBusiness} from '@/providers/business-provider';
import {Badge} from '@/components/ui/badge';

interface EditableCellProps {
  value: string | number | boolean
  onChange: (value: string | number | boolean) => void
  type: "text" | "number" | "boolean" | "item_type" | "um" | "business_category"
  error?: string
  disabled?: boolean
  underline?: boolean
  defaultBusinessCategory?: string
}

const measureUnitArray = Object.entries(MeasureUnit).map(([, value]) => ({
  value: value,
  label: value
}));

export function EditableCell({
  value,
  onChange,
  type,
  error,
  disabled,
  underline,
  defaultBusinessCategory
}: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(String(value))
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setEditValue(String(value))
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleSave = useCallback(() => {
    setIsEditing(false)
    if (type === "number") {
      const num = Number.parseFloat(editValue)
      onChange(Number.isNaN(num) ? 0 : num)
    } else {
      onChange(editValue)
    }
  }, [editValue, onChange, type])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleSave()
      if (e.key === "Escape") {
        setEditValue(String(value))
        setIsEditing(false)
      }
    },
    [handleSave, value]
  )

  if (type === "boolean") {
    return (
      <Switch
        checked={Boolean(value)}
        onCheckedChange={(checked) => onChange(checked)}
        aria-label="Toggle value"
        disabled={disabled}
      />
    )
  }

  if (type === "item_type") {
    return (
      <Select
        value={String(value)}
        onValueChange={(v) => onChange(v)}
        disabled={disabled}
      >
        <SelectTrigger className="h-8 w-[110px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="service">Servicio</SelectItem>
          <SelectItem value="product">Producto</SelectItem>
        </SelectContent>
      </Select>
    )
  }

  if (type === "um") {
    return (
      <Select
        value={String(value)}
        onValueChange={(v) => onChange(v)}
        disabled={disabled}
      >
        <SelectTrigger className="h-8 w-[110px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {measureUnitArray.map(ft => (
              <SelectItem key={ft.value} value={ft.value}>{ft.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }
  
  if (type === "business_category") {
    return (
      <BusinessCategoryCell value={value.toString()} onChange={(v) => onChange(v)} disabled={disabled || false} defaultValueName={defaultBusinessCategory}/>
    )
  }

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        type={type === "number" ? "number" : "text"}
        step={type === "number" ? "0.01" : undefined}
        disabled={disabled}
        className={cn(
          "h-8 text-xs",
          error && "border-destructive focus-visible:ring-destructive",
            underline && 'line-through'
        )}
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      disabled={disabled}
      className={cn(
        "w-full rounded px-2 py-1 text-left text-xs transition-colors hover:bg-muted",
        !disabled && ' cursor-pointer',
        error && "text-destructive",
        underline && 'line-through'
      )}
      title={disabled ? '' : (error || "Click para editar")}
    >
      {value === "" || value === undefined ? (
        <span className="text-muted-foreground italic">-</span>
      ) : (
        String(value)
      )}
    </button>
  )
}

function BusinessCategoryCell({ value, onChange, disabled, defaultValueName }: { value: string, onChange: (v: string) => void, disabled: boolean, defaultValueName?: string}) {
  const business = useBusiness();
  const [valueSelected, setValueSelected] = useState(value);
  const [categories, setCategories] = useState(business.business_categories || []);
  
  useEffect(() => {
    const defaultCategory = categories.find(c => c.name == defaultValueName);
    if (defaultCategory) {
      setValueSelected(defaultCategory.id)
    } else {
      if (defaultValueName) {
        setCategories([{ id: defaultValueName, name: defaultValueName, slug: slugify(defaultValueName) }, ...categories] )
        setValueSelected(defaultValueName);
      }
    }
  }, []);

  return (
      <Select
          value={String(valueSelected)}
          onValueChange={(v) => {
            setValueSelected(v);
            onChange(v)
          }}
          disabled={disabled}
      >
        <SelectTrigger className="h-8 w-[110px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map((ft, i) => (
              <SelectItem key={`cat-${i}`} value={ft.id} className='flex justify-between w-full'>
                {ft.name}
                {ft.id == ft.name && (
                    <Badge variant='outline' className='bg-green-500'>
                      Nuevo
                    </Badge>
                )}
              </SelectItem>
          ))}
        </SelectContent>
      </Select>
  )
}
