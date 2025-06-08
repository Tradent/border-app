import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

// Sample property data
const properties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "San Francisco, CA",
    status: "Available",
    bookings: 8,
    revenue: "$3,200",
    image: "/urban-loft-living.png",
  },
  {
    id: 2,
    title: "Beachfront Cottage",
    location: "Malibu, CA",
    status: "Booked",
    bookings: 12,
    revenue: "$5,600",
    image: "/seaside-haven.png",
  },
  {
    id: 3,
    title: "Mountain Cabin Retreat",
    location: "Aspen, CO",
    status: "Maintenance",
    bookings: 4,
    revenue: "$1,800",
    image: "/secluded-mountain-cabin.png",
  },
]

export default function PropertyList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden">
          <div className="aspect-video relative">
            <img
              src={property.image || "/placeholder.svg"}
              alt={property.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2">
              <Badge
                variant={
                  property.status === "Available" ? "success" : property.status === "Booked" ? "default" : "destructive"
                }
              >
                {property.status}
              </Badge>
            </div>
          </div>
          <CardHeader className="p-4">
            <h3 className="text-lg font-bold">{property.title}</h3>
            <p className="text-sm text-gray-500">{property.location}</p>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Bookings</p>
                <p className="font-medium">{property.bookings}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="font-medium">{property.revenue}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/properties/${property.id}`}>
                <Eye className="mr-2 h-4 w-4" /> View
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/properties/${property.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Link>
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
