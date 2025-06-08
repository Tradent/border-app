import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

// Sample reviews data
const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    date: "March 2023",
    rating: 5,
    comment:
      "This place was amazing! The location is perfect, right in the heart of downtown with easy access to restaurants, shops, and public transportation. The apartment was clean, modern, and had all the amenities we needed. The host was very responsive and helpful. Would definitely stay here again!",
    avatar: "/serene-gaze.png",
  },
  {
    id: 2,
    name: "Michael Brown",
    date: "February 2023",
    rating: 4,
    comment:
      "Great apartment in a convenient location. The place was clean and comfortable. The only minor issue was some street noise at night, but that's expected in a downtown location. The host provided earplugs which was a nice touch. Would recommend!",
    avatar: "/thoughtful-gaze.png",
  },
  {
    id: 3,
    name: "Emily Davis",
    date: "January 2023",
    rating: 5,
    comment:
      "Absolutely loved staying here! The apartment is beautifully decorated and has everything you need. The bed was super comfortable and the kitchen was well-equipped. The building amenities like the gym and rooftop were a great bonus. The host was very accommodating with our check-in and check-out times.",
    avatar: "/serene-gaze.png",
  },
]

export default function PropertyReviews() {
  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-zillow-darkblue dark:text-white">Reviews</h2>
        <div className="flex items-center bg-burnt-light dark:bg-rustic-dark/30 text-burnt-orange dark:text-mustard px-3 py-1 rounded-full">
          <Star className="h-5 w-5 mr-1 fill-current" />
          <span className="font-bold">{averageRating.toFixed(1)}</span>
          <span className="text-gray-600 dark:text-gray-400 ml-1">({reviews.length})</span>
        </div>
      </div>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-burnt-orange dark:hover:border-mustard transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="border-2 border-burnt-orange">
                <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{review.name}</div>
                <div className="text-sm text-gray-500">{review.date}</div>
              </div>
              <div className="ml-auto flex items-center bg-burnt-light text-burnt-orange px-2 py-1 rounded-full">
                <Star className="h-4 w-4 mr-1 fill-current" />
                <span>{review.rating}</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
