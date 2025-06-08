"use client"

import React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, differenceInDays } from "date-fns"
import { Loader2, CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const bookingFormSchema = z.object({
  dateRange: z.object({
    from: z.date({
      required_error: "Check-in date is required.",
    }),
    to: z.date({
      required_error: "Check-out date is required.",
    }),
  }),
  guests: z.string({
    required_error: "Number of guests is required.",
  }),
})

type BookingFormValues = z.infer<typeof bookingFormSchema>

export default function PropertyBookingForm({ property }: { property: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      guests: "1",
      dateRange: {
        from: undefined,
        to: undefined,
      },
    },
  })

  // Watch for changes to calculate price
  const dateRange = form.watch("dateRange")

  // Calculate total price when dates change
  React.useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      const nights = differenceInDays(dateRange.to, dateRange.from)
      if (nights > 0) {
        const subtotal = property.price * nights
        const serviceFee = Math.round(subtotal * 0.12)
        const cleaningFee = 50
        setTotalPrice(subtotal + serviceFee + cleaningFee)
      }
    }
  }, [dateRange, property.price])

  async function onSubmit(data: BookingFormValues) {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(data)
    setIsSubmitting(false)

    // Show success message or redirect
    alert("Booking request submitted successfully!")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="grid grid-cols-2">
                  <div className="border-r border-b border-gray-200 dark:border-gray-700">
                    <FormLabel className="px-4 pt-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                      Check in
                    </FormLabel>
                    <div className="px-4 py-2 text-sm">
                      {field.value?.from ? (
                        format(field.value.from, "MMM d, yyyy")
                      ) : (
                        <span className="text-muted-foreground">Select date</span>
                      )}
                    </div>
                  </div>
                  <div className="border-b border-gray-200 dark:border-gray-700">
                    <FormLabel className="px-4 pt-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                      Check out
                    </FormLabel>
                    <div className="px-4 py-2 text-sm">
                      {field.value?.to ? (
                        format(field.value.to, "MMM d, yyyy")
                      ) : (
                        <span className="text-muted-foreground">Select date</span>
                      )}
                    </div>
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full border-0 border-t rounded-none h-10 px-4 justify-between font-normal hover:bg-burnt-light dark:hover:bg-rustic-dark/30",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <span>
                          {field.value?.from && field.value?.to
                            ? `${format(field.value.from, "MMM d")} - ${format(field.value.to, "MMM d, yyyy")}`
                            : "Select dates"}
                        </span>
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      mode="range"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      numberOfMonths={2}
                      className="border-none"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="px-4 pb-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="px-4 pt-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  Guests
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-0 h-12 px-4 rounded-none focus:ring-0">
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: property.guests }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "guest" : "guests"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="px-4 pb-2" />
              </FormItem>
            )}
          />
        </div>

        {dateRange?.from && dateRange?.to && totalPrice > 0 && (
          <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>
                ${property.price} × {differenceInDays(dateRange.to, dateRange.from)} nights
              </span>
              <span>${property.price * differenceInDays(dateRange.to, dateRange.from)}</span>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Cleaning fee</span>
              <span>$50</span>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Service fee</span>
              <span>${Math.round(property.price * differenceInDays(dateRange.to, dateRange.from) * 0.12)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t text-gray-700 dark:text-gray-300">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-burnt-orange hover:bg-mustard text-white py-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Reserve"
          )}
        </Button>
      </form>
    </Form>
  )
}
