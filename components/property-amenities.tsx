import type React from "react"
import {
  Wifi,
  Tv,
  Car,
  Snowflake,
  Flame,
  Shirt,
  Utensils,
  Dumbbell,
  CableCarIcon as Elevator,
  Lock,
} from "lucide-react"

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-5 w-5 text-burnt-orange" />,
  TV: <Tv className="h-5 w-5 text-burnt-orange" />,
  Parking: <Car className="h-5 w-5 text-burnt-orange" />,
  "Air Conditioning": <Snowflake className="h-5 w-5 text-burnt-orange" />,
  Heating: <Flame className="h-5 w-5 text-burnt-orange" />,
  Washer: <Shirt className="h-5 w-5 text-burnt-orange" />,
  Dryer: <Shirt className="h-5 w-5 text-burnt-orange" />,
  Kitchen: <Utensils className="h-5 w-5 text-burnt-orange" />,
  Gym: <Dumbbell className="h-5 w-5 text-burnt-orange" />,
  Elevator: <Elevator className="h-5 w-5 text-burnt-orange" />,
  Security: <Lock className="h-5 w-5 text-burnt-orange" />,
}

export default function PropertyAmenities({ amenities }: { amenities: string[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-zillow-darkblue dark:text-white mb-6">Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {amenities.map((amenity) => (
          <div
            key={amenity}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            {amenityIcons[amenity] || <div className="h-5 w-5" />}
            <span className="font-medium">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
