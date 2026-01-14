"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CategoryFilterProps {
  categories: string[]
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
  className?: string
}

export function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryChange,
  className,
}: CategoryFilterProps) {
  const handleToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category))
    } else {
      onCategoryChange([...selectedCategories, category])
    }
  }

  const handleClearAll = () => {
    onCategoryChange([])
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Filter by Category</h3>
        {selectedCategories.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-xs h-7"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category)
          return (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer text-sm px-3 py-1.5"
                onClick={() => handleToggle(category)}
              >
                {category}
                {isSelected && (
                  <X className="w-3 h-3 ml-1.5 inline-block" />
                )}
              </Badge>
            </motion.div>
          )
        })}
      </div>
      {selectedCategories.length > 0 && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            {selectedCategories.length} categor{selectedCategories.length === 1 ? "y" : "ies"} selected
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
