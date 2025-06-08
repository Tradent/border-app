import Link from "next/link"
import { Star, Heart, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PropertyCardProps {
  property: {
    id: number
    title: string
    location: string
    price: string
    priceValue: number
    availability: string
    image: string
    tags: string[]
    rating: number
    reviews: number
    isNew: boolean
    bedrooms: number
    bathrooms: number
    propertyType: string
    categories?: string[]
  }
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`}>
      <div className="property-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden h-full border border-gray-200 dark:border-gray-700">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
          <button className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700">
            <Heart className="h-5 w-5 text-gray-500 hover:text-airbnb-red" />
          </button>
          {property.isNew && <Badge className="absolute top-3 left-3 bg-burnt-orange text-white">New</Badge>}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center text-sm">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-medium">{property.rating}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">({property.reviews})</span>
            </div>
            <div className="text-burnt-orange font-semibold">{property.price}</div>
          </div>
          <h3 className="text-lg font-bold text-zillow-darkblue dark:text-white mb-1">{property.title}</h3>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
            <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
            {property.location}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Available: {property.availability}</p>
          <div className="flex flex-wrap gap-2">
            {property.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs bg-burnt-light text-burnt-orange border-burnt-orange/20 dark:bg-rustic-dark/20 dark:text-mustard"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
