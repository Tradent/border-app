"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Home,
  Building,
  Palmtree,
  Mountain,
  Waves,
  Trees,
  Castle,
  Warehouse,
  Tent,
  Landmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Define the category types
export type PropertyCategory = {
  id: string
  label: string
  icon: React.ReactNode
}

// Create the categories array
export const propertyCategories: PropertyCategory[] = [
  { id: "all", label: "All", icon: <Home className="h-6 w-6" /> },
  { id: "apartment", label: "Apartments", icon: <Building className="h-6 w-6" /> },
  { id: "beach", label: "Beach", icon: <Waves className="h-6 w-6" /> },
  { id: "cabin", label: "Cabins", icon: <Trees className="h-6 w-6" /> },
  { id: "mountain", label: "Mountain", icon: <Mountain className="h-6 w-6" /> },
  { id: "tropical", label: "Tropical", icon: <Palmtree className="h-6 w-6" /> },
  { id: "mansion", label: "Mansions", icon: <Castle className="h-6 w-6" /> },
  { id: "loft", label: "Lofts", icon: <Warehouse className="h-6 w-6" /> },
  { id: "camping", label: "Camping", icon: <Tent className="h-6 w-6" /> },
  { id: "historic", label: "Historic", icon: <Landmark className="h-6 w-6" /> },
]

interface PropertyCategoriesProps {
  selectedCategory: string
  onSelectCategory: (categoryId: string) => void
}

export default function PropertyCategories({ selectedCategory, onSelectCategory }: PropertyCategoriesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollAmount = 300

      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }

      // Update arrow visibility after scrolling
      setTimeout(() => {
        if (container) {
          setShowLeftArrow(container.scrollLeft > 0)
          setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
        }
      }, 300)
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      setShowLeftArrow(container.scrollLeft > 0)
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
    }
  }

  return (
    <div className="relative">
      {/* Left scroll button */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full shadow-md p-2 border border-gray-200 dark:border-gray-700"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4 text-burnt-orange dark:text-mustard" />
        </button>
      )}

      {/* Categories container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide py-4 px-2 gap-6 snap-x"
        onScroll={handleScroll}
      >
        {propertyCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              "flex flex-col items-center gap-2 min-w-[80px] snap-start transition-all duration-200",
              selectedCategory === category.id
                ? "text-burnt-orange dark:text-mustard"
                : "text-gray-500 dark:text-gray-400 hover:text-burnt-orange dark:hover:text-mustard",
            )}
          >
            <div
              className={cn(
                "p-3 rounded-full transition-all duration-200",
                selectedCategory === category.id
                  ? "bg-burnt-light dark:bg-rustic-dark/30 text-burnt-orange dark:text-mustard"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
              )}
            >
              {category.icon}
            </div>
            <span className="text-xs font-medium">{category.label}</span>
            {selectedCategory === category.id && (
              <div className="h-0.5 w-6 bg-burnt-orange dark:bg-mustard rounded-full mt-1" />
            )}
          </button>
        ))}
      </div>

      {/* Right scroll button */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full shadow-md p-2 border border-gray-200 dark:border-gray-700"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4 text-burnt-orange dark:text-mustard" />
        </button>
      )}
    </div>
  )
}
