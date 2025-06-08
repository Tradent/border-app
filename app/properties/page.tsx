"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin, Filter, Grid, MapIcon, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import PropertyCard from "@/components/property-card"
import PropertyCategories from "@/components/property-categories"

// Sample property data with categories
const properties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "San Francisco, CA",
    price: "$150/night",
    priceValue: 150,
    availability: "May 15 - June 30",
    image: "/urban-loft-living.png",
    tags: ["Apartment", "City View", "1 Bedroom"],
    rating: 4.92,
    reviews: 86,
    isNew: true,
    bedrooms: 1,
    bathrooms: 1,
    propertyType: "Apartment",
    categories: ["apartment"],
  },
  {
    id: 2,
    title: "Beachfront Cottage",
    location: "Malibu, CA",
    price: "$280/night",
    priceValue: 280,
    availability: "June 1 - July 15",
    image: "/seaside-haven.png",
    tags: ["House", "Ocean View", "2 Bedrooms"],
    rating: 4.85,
    reviews: 124,
    isNew: false,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: "House",
    categories: ["beach"],
  },
  {
    id: 3,
    title: "Mountain Cabin Retreat",
    location: "Aspen, CO",
    price: "$200/night",
    priceValue: 200,
    availability: "July 10 - August 20",
    image: "/secluded-mountain-cabin.png",
    tags: ["Cabin", "Mountain View", "3 Bedrooms"],
    rating: 4.78,
    reviews: 92,
    isNew: false,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "Cabin",
    categories: ["cabin", "mountain"],
  },
  {
    id: 4,
    title: "Luxury Penthouse with City Views",
    location: "New York, NY",
    price: "$450/night",
    priceValue: 450,
    availability: "June 5 - July 30",
    image: "/luxury-penthouse.png",
    tags: ["Penthouse", "City View", "3 Bedrooms"],
    rating: 4.96,
    reviews: 158,
    isNew: true,
    bedrooms: 3,
    bathrooms: 3,
    propertyType: "Apartment",
    categories: ["apartment"],
  },
  {
    id: 5,
    title: "Cozy Studio in Historic District",
    location: "Boston, MA",
    price: "$120/night",
    priceValue: 120,
    availability: "May 20 - June 25",
    image: "/cozy-studio.png",
    tags: ["Studio", "Historic", "1 Bedroom"],
    rating: 4.7,
    reviews: 65,
    isNew: false,
    bedrooms: 1,
    bathrooms: 1,
    propertyType: "Studio",
    categories: ["historic"],
  },
  {
    id: 6,
    title: "Lakefront Cabin with Dock",
    location: "Lake Tahoe, CA",
    price: "$320/night",
    priceValue: 320,
    availability: "July 1 - August 15",
    image: "/lakefront-cabin.png",
    tags: ["Cabin", "Lake View", "4 Bedrooms"],
    rating: 4.89,
    reviews: 112,
    isNew: false,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: "Cabin",
    categories: ["cabin"],
  },
  {
    id: 7,
    title: "Modern Loft in Arts District",
    location: "Los Angeles, CA",
    price: "$180/night",
    priceValue: 180,
    availability: "June 10 - July 20",
    image: "/modern-loft.png",
    tags: ["Loft", "Arts District", "2 Bedrooms"],
    rating: 4.82,
    reviews: 78,
    isNew: false,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: "Loft",
    categories: ["loft"],
  },
  {
    id: 8,
    title: "Charming Victorian Home",
    location: "San Francisco, CA",
    price: "$250/night",
    priceValue: 250,
    availability: "May 25 - June 30",
    image: "/victorian-home.png",
    tags: ["House", "Historic", "3 Bedrooms"],
    rating: 4.91,
    reviews: 103,
    isNew: false,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "House",
    categories: ["historic"],
  },
  {
    id: 9,
    title: "Tropical Paradise Villa",
    location: "Miami, FL",
    price: "$380/night",
    priceValue: 380,
    availability: "June 15 - August 30",
    image: "/secluded-beachfront-villa.png",
    tags: ["Villa", "Pool", "4 Bedrooms"],
    rating: 4.95,
    reviews: 87,
    isNew: true,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: "Villa",
    categories: ["tropical"],
  },
  {
    id: 10,
    title: "Historic Castle Suite",
    location: "Hudson Valley, NY",
    price: "$420/night",
    priceValue: 420,
    availability: "July 5 - September 15",
    image: "/royal-chamber.png",
    tags: ["Castle", "Historic", "1 Bedroom"],
    rating: 4.88,
    reviews: 45,
    isNew: false,
    bedrooms: 1,
    bathrooms: 1,
    propertyType: "Castle",
    categories: ["mansion", "historic"],
  },
  {
    id: 11,
    title: "Luxury Camping Experience",
    location: "Joshua Tree, CA",
    price: "$190/night",
    priceValue: 190,
    availability: "May 1 - October 30",
    image: "/luxury-desert-retreat.png",
    tags: ["Camping", "Desert View", "1 Bedroom"],
    rating: 4.79,
    reviews: 68,
    isNew: false,
    bedrooms: 1,
    bathrooms: 1,
    propertyType: "Tent",
    categories: ["camping"],
  },
]

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [filteredProperties, setFilteredProperties] = useState(properties)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Filter properties based on active filters, price range, category and search query
  const applyFilters = (filters: string[], priceRange: [number, number], category: string, query: string) => {
    let filtered = properties

    // Apply price filter
    filtered = filtered.filter(
      (property) => property.priceValue >= priceRange[0] && property.priceValue <= priceRange[1],
    )

    // Apply property type filter
    if (filters.length > 0) {
      filtered = filtered.filter((property) => filters.includes(property.propertyType))
    }

    // Apply category filter
    if (category !== "all") {
      filtered = filtered.filter((property) => property.categories.includes(category))
    }

    // Apply search query
    if (query) {
      const lowercaseQuery = query.toLowerCase()
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(lowercaseQuery) ||
          property.location.toLowerCase().includes(lowercaseQuery),
      )
    }

    setFilteredProperties(filtered)
  }

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    applyFilters(activeFilters, priceRange, categoryId, searchQuery)
  }

  const handleFilterToggle = (filter: string) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter((f) => f !== filter)
      : [...activeFilters, filter]

    setActiveFilters(newFilters)
    applyFilters(newFilters, priceRange, selectedCategory, searchQuery)
  }

  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]]
    setPriceRange(newRange)
    applyFilters(activeFilters, newRange, selectedCategory, searchQuery)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    applyFilters(activeFilters, priceRange, selectedCategory, searchQuery)
  }

  const clearFilters = () => {
    setActiveFilters([])
    setPriceRange([0, 500])
    setSearchQuery("")
    setSelectedCategory("all")
    setFilteredProperties(properties)
  }

  const propertyTypes = ["Apartment", "House", "Cabin", "Studio", "Loft"]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Search Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-30">
        <div className="container py-4">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="relative flex-grow">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Enter location, address, or ZIP code"
                className="pl-10 py-6 text-base rounded-lg border-gray-300 focus:border-zillow-blue focus:ring-zillow-blue"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-airbnb-red hover:bg-airbnb-pink text-white py-6 px-6 rounded-lg">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </form>

          {/* Property Categories */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
            <PropertyCategories selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h3 className="font-medium">Property Type</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {propertyTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={type}
                            checked={activeFilters.includes(type)}
                            onCheckedChange={() => handleFilterToggle(type)}
                          />
                          <Label htmlFor={type}>{type}</Label>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Price Range</h3>
                      <div className="flex justify-between text-sm">
                        <span>${priceRange[0]}/night</span>
                        <span>${priceRange[1]}/night</span>
                      </div>
                      <Slider
                        defaultValue={[0, 500]}
                        max={500}
                        step={10}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        className="py-4"
                      />
                    </div>

                    <div className="pt-2 border-t flex justify-between">
                      <Button variant="outline" size="sm" onClick={clearFilters}>
                        Clear all
                      </Button>
                      <Button size="sm" className="bg-airbnb-red hover:bg-airbnb-pink text-white">
                        Show results
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Select defaultValue="recommended">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>

              {(activeFilters.length > 0 || selectedCategory !== "all") && (
                <Button variant="outline" size="sm" onClick={clearFilters} className="gap-1">
                  <X className="h-4 w-4" /> Clear filters
                </Button>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className={viewMode === "grid" ? "bg-zillow-blue text-white" : ""}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4 mr-1" />
                Grid
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                className={viewMode === "map" ? "bg-zillow-blue text-white" : ""}
                onClick={() => setViewMode("map")}
              >
                <MapIcon className="h-4 w-4 mr-1" />
                Map
              </Button>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {activeFilters.map((filter) => (
                <Badge
                  key={filter}
                  className="bg-zillow-lightblue text-zillow-blue hover:bg-zillow-lightblue"
                  onClick={() => handleFilterToggle(filter)}
                >
                  {filter} <X className="h-3 w-3 ml-1 cursor-pointer" />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        {viewMode === "grid" ? (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-zillow-darkblue dark:text-white">
                {filteredProperties.length} Properties Available
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Short-term rentals with blockchain security</p>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2">No properties match your search</h2>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search for a different location</p>
                <Button onClick={clearFilters} className="bg-airbnb-red hover:bg-airbnb-pink text-white">
                  Clear all filters
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex h-[calc(100vh-220px)]">
            <div className="w-1/3 pr-4 overflow-y-auto">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-zillow-darkblue dark:text-white">
                  {filteredProperties.length} Properties Available
                </h1>
                <p className="text-gray-500 dark:text-gray-400">Short-term rentals with blockchain security</p>
              </div>

              <div className="space-y-4">
                {filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    className="flex gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-zillow-blue cursor-pointer"
                  >
                    <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-zillow-darkblue dark:text-white">{property.title}</h3>
                      <p className="text-sm text-gray-500">{property.location}</p>
                      <div className="flex items-center mt-1 text-sm">
                        <span className="font-semibold text-airbnb-red">{property.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-lg relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Map View</h3>
                  <p className="text-gray-500 max-w-md">
                    Interactive map would be displayed here, showing property locations with pins
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
