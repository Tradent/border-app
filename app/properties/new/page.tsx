"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { useDemoMode } from "@/lib/demo/demo-context"

export default function NewPropertyPage() {
  const router = useRouter()
  const { isDemoMode } = useDemoMode()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
    amenities: {
      wifi: false,
      parking: false,
      pool: false,
      gym: false,
      airConditioning: false,
    },
    images: [],
    rating: 4.5,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [name]: checked,
      },
    }))
  }

  const handleSliderChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, rating: value[0] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    // In a real app, you would send this data to your API
    if (isDemoMode) {
      // Show success message in demo mode
      alert("Property created successfully in demo mode!")
      router.push("/dashboard")
    } else {
      // In a real app, you would handle the API response here
      alert("Property created successfully!")
      router.push("/dashboard")
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Add New Property</CardTitle>
          <CardDescription>Fill out the form below to list your new property.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter property title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price per Night ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your property"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Enter property location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  placeholder="Number of bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  placeholder="Number of bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => handleSelectChange("propertyType", value)}
                >
                  <SelectTrigger id="propertyType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="cabin">Cabin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wifi"
                    checked={formData.amenities.wifi}
                    onCheckedChange={(checked) => handleCheckboxChange("wifi", checked as boolean)}
                  />
                  <Label htmlFor="wifi" className="cursor-pointer">
                    WiFi
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="parking"
                    checked={formData.amenities.parking}
                    onCheckedChange={(checked) => handleCheckboxChange("parking", checked as boolean)}
                  />
                  <Label htmlFor="parking" className="cursor-pointer">
                    Parking
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pool"
                    checked={formData.amenities.pool}
                    onCheckedChange={(checked) => handleCheckboxChange("pool", checked as boolean)}
                  />
                  <Label htmlFor="pool" className="cursor-pointer">
                    Pool
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="gym"
                    checked={formData.amenities.gym}
                    onCheckedChange={(checked) => handleCheckboxChange("gym", checked as boolean)}
                  />
                  <Label htmlFor="gym" className="cursor-pointer">
                    Gym
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="airConditioning"
                    checked={formData.amenities.airConditioning}
                    onCheckedChange={(checked) => handleCheckboxChange("airConditioning", checked as boolean)}
                  />
                  <Label htmlFor="airConditioning" className="cursor-pointer">
                    A/C
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <span>{formData.rating}</span>
              </div>
              <Slider id="rating" defaultValue={[4.5]} max={5} min={1} step={0.1} onValueChange={handleSliderChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Upload Images</Label>
              <Input
                id="images"
                name="images"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => console.log(e.target.files)}
              />
              <p className="text-sm text-muted-foreground">Upload up to 5 images of your property</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Create Property</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
