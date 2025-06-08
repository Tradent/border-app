"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, MapPin, Home, Building, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Define filter types
type FilterType = {
  id: string
  label: string
  value?: string | number | [number, number]
}

// Property types for filtering
const propertyTypes = [
  { id: "apartment", label: "Apartment" },
  { id: "house", label: "House" },
  { id: "cabin", label: "Cabin" },
  { id: "condo", label: "Condo" },
  { id: "villa", label: "Villa" },
]

// Bedroom options
const bedroomOptions = [
  { id: "any", label: "Any" },
  { id: "1", label: "1+" },
  { id: "2", label: "2+" },
  { id: "3", label: "3+" },
  { id: "4", label: "4+" },
]

export default function HeroSection() {
  // Search query state
  const [searchQuery, setSearchQuery] = useState("")

  // Active filters state
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([])

  // Price range state
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  // Selected property types state
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])

  // Selected bedrooms state
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>("")

  // Handle adding a filter
  const addFilter = (filter: FilterType) => {
    // Check if filter already exists
    if (!activeFilters.some((f) => f.id === filter.id)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  // Handle removing a filter
  const removeFilter = (filterId: string) => {
    setActiveFilters(activeFilters.filter((filter) => filter.id !== filterId))

    // Reset the corresponding filter state
    if (filterId === "price") {
      setPriceRange([0, 1000])
    } else if (filterId === "bedrooms") {
      setSelectedBedrooms("")
    } else if (selectedPropertyTypes.includes(filterId)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter((type) => type !== filterId))
    }
  }

  // Handle property type selection
  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    let newSelectedTypes = [...selectedPropertyTypes]

    if (checked) {
      newSelectedTypes.push(type)
      addFilter({ id: type, label: `Type: ${propertyTypes.find((pt) => pt.id === type)?.label}` })
    } else {
      newSelectedTypes = newSelectedTypes.filter((t) => t !== type)
      removeFilter(type)
    }

    setSelectedPropertyTypes(newSelectedTypes)
  }

  // Handle bedroom selection
  const handleBedroomChange = (value: string) => {
    setSelectedBedrooms(value)

    if (value) {
      const bedroomLabel = bedroomOptions.find((option) => option.id === value)?.label
      addFilter({ id: "bedrooms", label: `Bedrooms: ${bedroomLabel}`, value })
    } else {
      removeFilter("bedrooms")
    }
  }

  // Handle price range change
  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value)
    addFilter({ id: "price", label: `Price: $${value[0]} - $${value[1]}`, value })
  }

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Search query:", searchQuery)
    console.log("Active filters:", activeFilters)
    // Here you would typically redirect to search results page with these parameters
  }

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters([])
    setPriceRange([0, 1000])
    setSelectedPropertyTypes([])
    setSelectedBedrooms("")
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-burnt-light to-white dark:from-rustic-dark dark:to-gray-900 relative">
      <div className="absolute inset-0 overflow-hidden w-full h-full">
        <div className="absolute inset-0 bg-[url('/city-skyline.png')] bg-cover bg-center opacity-30 dark:opacity-20"></div>
      </div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4 mb-8 md:mb-12">
          <div className="mb-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-rustic-brown dark:text-white">
              Discover More Beyond The Border
            </h1>
          </div>
          <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            Find Your Next Place to Stay with Blockchain Security and Privacy Protection
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 search-bar-shadow dark:shadow-gray-900 transition-all hover:shadow-xl">
          <Tabs defaultValue="rent" className="w-full">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground mb-6">
              <TabsTrigger
                value="rent"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-5 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-burnt-orange data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                Rent
              </TabsTrigger>
              <TabsTrigger
                value="buy"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-5 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-burnt-orange data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                Buy
              </TabsTrigger>
              <TabsTrigger
                value="sell"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-5 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-burnt-orange data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                Sell
              </TabsTrigger>
            </TabsList>
            <form onSubmit={handleSearch}>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Enter an address, city, or ZIP code"
                    className="pl-10 py-6 text-base rounded-lg border-gray-300 focus:border-burnt-orange focus:ring-burnt-orange dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="bg-burnt-orange hover:bg-mustard text-white py-6 px-6 rounded-lg flex-grow sm:flex-grow-0"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    Search
                  </Button>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="py-6 px-3 rounded-lg hidden sm:flex" title="Advanced Search">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M3 6h18M6 12h12m-9 6h6"></path>
                        </svg>
                        <span className="sr-only">Advanced Filters</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <h3 className="font-medium">Property Type</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {propertyTypes.map((type) => (
                            <div key={type.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`property-${type.id}`}
                                checked={selectedPropertyTypes.includes(type.id)}
                                onCheckedChange={(checked) => handlePropertyTypeChange(type.id, checked === true)}
                              />
                              <Label htmlFor={`property-${type.id}`}>{type.label}</Label>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-medium">Bedrooms</h3>
                          <div className="flex flex-wrap gap-2">
                            {bedroomOptions.map((option) => (
                              <Button
                                key={option.id}
                                variant={selectedBedrooms === option.id ? "default" : "outline"}
                                size="sm"
                                className={selectedBedrooms === option.id ? "bg-burnt-orange text-white" : ""}
                                onClick={() => handleBedroomChange(option.id === selectedBedrooms ? "" : option.id)}
                              >
                                {option.label}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-medium">Price Range</h3>
                          <div className="flex justify-between text-sm">
                            <span>${priceRange[0]}/night</span>
                            <span>${priceRange[1]}/night</span>
                          </div>
                          <Slider
                            defaultValue={[0, 1000]}
                            max={1000}
                            step={50}
                            value={priceRange}
                            onValueChange={(value) => handlePriceChange(value as [number, number])}
                            className="py-4"
                          />
                        </div>

                        <div className="pt-2 border-t flex justify-between">
                          <Button variant="outline" size="sm" onClick={clearAllFilters}>
                            Clear all
                          </Button>
                          <Button
                            size="sm"
                            className="bg-burnt-orange hover:bg-mustard text-white"
                            onClick={() => {
                              // Close popover (would need a ref to control this properly)
                              document.body.click()
                            }}
                          >
                            Apply filters
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </form>

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {activeFilters.map((filter) => (
                  <div
                    key={filter.id}
                    className="text-xs bg-burnt-light text-burnt-orange px-3 py-1.5 rounded-full dark:bg-rustic-dark/30 dark:text-mustard flex items-center"
                  >
                    <span>{filter.label}</span>
                    <button
                      type="button"
                      className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      onClick={() => removeFilter(filter.id)}
                      aria-label={`Remove ${filter.label} filter`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}

                {activeFilters.length > 1 && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-xs text-burnt-orange dark:text-mustard underline hover:text-burnt-dark dark:hover:text-mustard-light ml-2"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}

            {/* Quick filter buttons */}
            {activeFilters.length === 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-xs bg-burnt-light text-burnt-orange px-3 py-1.5 rounded-full dark:bg-rustic-dark/30 dark:text-mustard flex items-center">
                      <span>Price Range</span>
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h3 className="font-medium">Price Range</h3>
                      <div className="flex justify-between text-sm">
                        <span>${priceRange[0]}/night</span>
                        <span>${priceRange[1]}/night</span>
                      </div>
                      <Slider
                        defaultValue={[0, 1000]}
                        max={1000}
                        step={50}
                        value={priceRange}
                        onValueChange={(value) => handlePriceChange(value as [number, number])}
                        className="py-4"
                      />
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          className="bg-burnt-orange hover:bg-mustard text-white"
                          onClick={() => {
                            // Close popover
                            document.body.click()
                          }}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-xs bg-burnt-light text-burnt-orange px-3 py-1.5 rounded-full dark:bg-rustic-dark/30 dark:text-mustard flex items-center">
                      <span>Bedrooms</span>
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60">
                    <div className="space-y-4">
                      <h3 className="font-medium">Bedrooms</h3>
                      <div className="flex flex-wrap gap-2">
                        {bedroomOptions.map((option) => (
                          <Button
                            key={option.id}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              handleBedroomChange(option.id)
                              // Close popover
                              document.body.click()
                            }}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-xs bg-burnt-light text-burnt-orange px-3 py-1.5 rounded-full dark:bg-rustic-dark/30 dark:text-mustard flex items-center">
                      <span>Property Type</span>
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60">
                    <div className="space-y-4">
                      <h3 className="font-medium">Property Type</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {propertyTypes.map((type) => (
                          <div key={type.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`quick-property-${type.id}`}
                              checked={selectedPropertyTypes.includes(type.id)}
                              onCheckedChange={(checked) => handlePropertyTypeChange(type.id, checked === true)}
                            />
                            <Label htmlFor={`quick-property-${type.id}`}>{type.label}</Label>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          className="bg-burnt-orange hover:bg-mustard text-white"
                          onClick={() => {
                            // Close popover
                            document.body.click()
                          }}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </Tabs>
        </div>

        <div className="flex flex-col items-center mt-12">
          <div className="flex flex-wrap justify-center gap-4 max-w-xl mx-auto">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-burnt-orange text-burnt-orange hover:bg-burnt-light dark:border-mustard dark:text-mustard dark:hover:bg-rustic-dark/30 h-14 px-6 shadow-sm transition-all hover:shadow-md"
              asChild
            >
              <Link href="/properties" className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                <span>Browse Properties</span>
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-burnt-orange hover:bg-mustard text-white h-14 px-6 shadow-sm transition-all hover:shadow-md hover:translate-y-[-2px]"
              asChild
            >
              <Link href="/dashboard" className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                <span>List Your Property</span>
              </Link>
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center max-w-md">
            Join thousands of property owners already maximizing their returns with Border
          </p>
        </div>
      </div>
    </section>
  )
}
