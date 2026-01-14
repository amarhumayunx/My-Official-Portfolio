"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, Loader2, Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface FormFieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  required?: boolean
  autoSave?: boolean
  onSave?: () => void
  isSaved?: boolean
}

export function EnhancedFormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required,
  autoSave,
  onSave,
  isSaved,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(!!value)
  const saveTimeoutRef = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    setHasValue(!!value)
  }, [value])

  React.useEffect(() => {
    if (autoSave && value && onSave) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
      saveTimeoutRef.current = setTimeout(() => {
        onSave?.()
      }, 1000)
    }
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [value, autoSave, onSave])

  const InputComponent = type === "textarea" ? Textarea : Input

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="relative">
        <span className={cn("transition-all duration-200", isFocused || hasValue ? "text-sm" : "")}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </span>
      </Label>
      <div className="relative">
        <motion.div
          initial={false}
          animate={{
            scale: isFocused ? 1.01 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <InputComponent
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "transition-all duration-200",
              error && "border-destructive focus-visible:ring-destructive",
              isFocused && "ring-2 ring-primary/20"
            )}
          />
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-1 mt-1 text-sm text-destructive"
            >
              <XCircle className="w-4 h-4" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {autoSave && isSaved && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <CheckCircle className="w-4 h-4 text-green-500" />
          </motion.div>
        )}
      </div>
    </div>
  )
}

interface FormSuccessProps {
  message: string
  onClose?: () => void
}

export function FormSuccess({ message, onClose }: FormSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-background border border-border rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">Success!</h3>
        <p className="text-muted-foreground">{message}</p>
        {onClose && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Close
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  )
}
