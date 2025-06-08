import Link from "next/link"
import { ArrowLeft, MapPin, Star, Users, Heart, Share, Bed, Bath, Ruler, Shield, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PropertyBookingForm from "@/components/property-booking-form"
import PropertyAmenities from "@/components/property-amenities"
import PropertyReviews from "@/components/property-reviews"

// This would normally come from a database
const property = {
  id: 1,
  title: "Modern Downtown Apartment",
  description:
    "Enjoy this beautiful modern apartment in the heart of downtown. This spacious 1-bedroom apartment features high ceilings, large windows with city views, and modern furnishings. The fully equipped kitchen includes stainless steel appliances and everything you need to prepare meals. The living area has a comfortable sofa, smart TV, and workspace. The bedroom has a queen-sized bed with premium linens. The bathroom features a walk-in shower and is stocked with essential toiletries. Building amenities include a fitness center, rooftop terrace, and 24-hour security.",
  location: "San Francisco, CA",
  price: 150,
  rating: 4.8,
  reviews: 24,
  bedrooms: 1,
  bathrooms: 1,
  guests: 2,
  sqft: 750,
  yearBuilt: 2015,
  images: ["/urban-loft-living.png", "/urban-loft-retreat.png", "/sleek-city-kitchen.png", "/urban-chic-bathroom.png"],
  amenities: ["WiFi", "Air Conditioning", "Kitchen", "Washer", "Dryer", "TV", "Elevator", "Gym", "Parking"],
  host: {
    name: "Alex Johnson",
    joined: "January 2020",
    response: "100%",
    responseTime: "within an hour",
    image: "/confident-professional.png",
  },
  facts: ["Self check-in", "Great location", "Superhost", "Free cancellation for 48 hours"],
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button
          variant="outline"
          asChild
          className="mb-4 group flex items-center gap-2 border-burnt-orange text-burnt-orange hover:bg-burnt-light hover:border-burnt-orange hover:shadow-md transition-all duration-300 dark:border-mustard dark:text-mustard dark:hover:bg-rustic-dark/30 dark:hover:border-mustard rounded-full px-5 py-2"
        >
          <Link href="/properties" className="flex items-center">
            <span className="bg-burnt-light dark:bg-rustic-dark/30 rounded-full p-1.5 mr-2 group-hover:-translate-x-1 transition-transform duration-300">
              <ArrowLeft className="h-4 w-4" />
            </span>
            <span className="font-medium">Back to Properties</span>
          </Link>
        </Button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-zillow-darkblue dark:text-white">
              {property.title}
            </h1>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4 text-zillow-blue" />
                {property.location}
              </div>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 text-yellow-500" />
                {property.rating} ({property.reviews} reviews)
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-zillow-blue text-zillow-blue hover:bg-zillow-lightblue"
            >
              <Heart className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-zillow-blue text-zillow-blue hover:bg-zillow-lightblue"
            >
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-lg overflow-hidden">
          <img
            src={property.images[0] || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-[400px] object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {property.images.slice(1, 4).map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <img
                src={image || "/placeholder.svg"}
                alt={`${property.title} - image ${index + 2}`}
                className="w-full h-[192px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={property.host.image || "/placeholder.svg"}
              alt={property.host.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-airbnb-red"
            />
            <div>
              <h2 className="text-xl font-semibold">Hosted by {property.host.name}</h2>
              <p className="text-gray-500">Joined in {property.host.joined} · Superhost</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 border-y border-gray-200 dark:border-gray-700 py-6">
            <div className="flex flex-col items-center text-center">
              <Bed className="h-6 w-6 text-zillow-blue mb-2" />
              <div className="text-sm text-gray-500">Bedrooms</div>
              <div className="font-semibold">{property.bedrooms}</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <Bath className="h-6 w-6 text-zillow-blue mb-2" />
              <div className="text-sm text-gray-500">Bathrooms</div>
              <div className="font-semibold">{property.bathrooms}</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="h-6 w-6 text-zillow-blue mb-2" />
              <div className="text-sm text-gray-500">Guests</div>
              <div className="font-semibold">{property.guests}</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <Ruler className="h-6 w-6 text-zillow-blue mb-2" />
              <div className="text-sm text-gray-500">Square Feet</div>
              <div className="font-semibold">{property.sqft}</div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="w-full border-b dark:border-gray-700 rounded-none justify-start bg-transparent dark:bg-transparent h-auto p-0 mb-6">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-airbnb-red data-[state=active]:bg-transparent data-[state=active]:text-airbnb-red dark:data-[state=active]:text-airbnb-red px-4 py-2"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="amenities"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-airbnb-red data-[state=active]:bg-transparent data-[state=active]:text-airbnb-red px-4 py-2"
              >
                Amenities
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-airbnb-red data-[state=active]:bg-transparent data-[state=active]:text-airbnb-red px-4 py-2"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-zillow-darkblue dark:text-white mb-4">About this property</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{property.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {property.facts.map((fact, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-airbnb-red" />
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {["Short-term", "City view", "Workspace", "Self check-in"].map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-zillow-lightblue text-zillow-blue border-zillow-blue/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="amenities">
              <PropertyAmenities amenities={property.amenities} />
            </TabsContent>
            <TabsContent value="reviews">
              <PropertyReviews />
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-8 border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <CardHeader className="bg-zillow-lightblue dark:bg-gray-800">
              <CardTitle className="flex items-center justify-between">
                <span className="text-2xl text-zillow-darkblue dark:text-white">${property.price}</span>
                <span className="text-base font-normal text-gray-600 dark:text-gray-300">/ night</span>
              </CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 text-yellow-500" />
                  <span className="text-zillow-darkblue dark:text-white">{property.rating}</span>
                  <span className="text-gray-600 dark:text-gray-300 ml-1">· {property.reviews} reviews</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <PropertyBookingForm property={property} />
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-6 border-t dark:border-gray-700">
              <div className="flex items-center gap-2 w-full">
                <Shield className="h-5 w-5 text-zillow-blue" />
                <p>Secure blockchain-based booking</p>
              </div>
              <p>No charge until you book</p>
              <p>Taxes and fees will be calculated at checkout</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
