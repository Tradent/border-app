import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample bookings data
const bookings = [
  {
    id: 1,
    guest: "John Smith",
    property: "Modern Downtown Apartment",
    checkIn: "May 15, 2023",
    checkOut: "May 20, 2023",
    status: "Confirmed",
    amount: "$750",
  },
  {
    id: 2,
    guest: "Sarah Johnson",
    property: "Beachfront Cottage",
    checkIn: "June 1, 2023",
    checkOut: "June 7, 2023",
    status: "Pending",
    amount: "$1,680",
  },
  {
    id: 3,
    guest: "Michael Brown",
    property: "Mountain Cabin Retreat",
    checkIn: "July 10, 2023",
    checkOut: "July 15, 2023",
    status: "Confirmed",
    amount: "$1,000",
  },
  {
    id: 4,
    guest: "Emily Davis",
    property: "Modern Downtown Apartment",
    checkIn: "June 10, 2023",
    checkOut: "June 15, 2023",
    status: "Cancelled",
    amount: "$750",
  },
  {
    id: 5,
    guest: "Robert Wilson",
    property: "Beachfront Cottage",
    checkIn: "July 20, 2023",
    checkOut: "July 27, 2023",
    status: "Pending",
    amount: "$1,960",
  },
]

export default function BookingsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.guest}</TableCell>
                <TableCell>{booking.property}</TableCell>
                <TableCell>{booking.checkIn}</TableCell>
                <TableCell>{booking.checkOut}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      booking.status === "Confirmed"
                        ? "success"
                        : booking.status === "Pending"
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>{booking.amount}</TableCell>
                <TableCell>
                  {booking.status === "Pending" && (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
