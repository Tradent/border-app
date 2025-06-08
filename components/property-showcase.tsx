import Link from "next/link"
import { Star, Heart, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample property data
const properties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "San Francisco, CA",
    price: "$150/night",
    availability: "May 15 - June 30",
    image: "/urban-loft-living.png",
    tags: ["Apartment", "City View", "1 Bedroom"],
    rating: 4.92,
    reviews: 86,
    isNew: true,
  },
  {
    id: 2,
    title: "Beachfront Cottage",
    location: "Malibu, CA",
    price: "$280/night",
    availability: "June 1 - July 15",
    image: "/seaside-haven.png",
    tags: ["House", "Ocean View", "2 Bedrooms"],
    rating: 4.85,
    reviews: 124,
    isNew: false,
  },
  {
    id: 3,
    title: "Mountain Cabin Retreat",
    location: "Aspen, CO",
    price: "$200/night",
    availability: "July 10 - August 20",
    image: "/secluded-mountain-cabin.png",
    tags: ["Cabin", "Mountain View", "3 Bedrooms"],
    rating: 4.78,
    reviews: 92,
    isNew: false,
  },
]

export default function PropertyShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Link href={`/properties/${property.id}`} key={property.id} className="group">
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
              {property.isNew && <Badge className="absolute top-3 left-3 bg-airbnb-red text-white">New</Badge>}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">({property.reviews})</span>
                </div>
                <div className="text-airbnb-red font-semibold">{property.price}</div>
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
                    className="text-xs bg-zillow-lightblue text-zillow-blue border-zillow-blue/20 dark:bg-blue-900/20 dark:text-blue-400"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
