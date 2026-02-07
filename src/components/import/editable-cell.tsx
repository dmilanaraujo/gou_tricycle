"use client"

import React from "react"

import { useState, useCallback, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface EditableCellProps {
  value: string | number | boolean
  onChange: (value: string | number | boolean) => void
  type: "text" | "number" | "boolean" | "item_type"
  error?: string
}

export function EditableCell({
  value,
  onChange,
  type,
  error,
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
      />
    )
  }

  if (type === "item_type") {
    return (
      <Select
        value={String(value)}
        onValueChange={(v) => onChange(v)}
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
        className={cn(
          "h-8 text-xs",
          error && "border-destructive focus-visible:ring-destructive"
        )}
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      className={cn(
        "w-full cursor-pointer rounded px-2 py-1 text-left text-xs transition-colors hover:bg-muted",
        error && "text-destructive"
      )}
      title={error || "Click para editar"}
    >
      {value === "" || value === undefined ? (
        <span className="text-muted-foreground italic">-</span>
      ) : (
        String(value)
      )}
    </button>
  )
}
