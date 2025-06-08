"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Home,
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  Settings,
  ChevronRight,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import PropertyList from "@/components/dashboard/property-list"
import RevenueChart from "@/components/dashboard/revenue-chart"
import BookingsList from "@/components/dashboard/bookings-list"
import { NotificationDropdown } from "@/components/notifications/notification-dropdown"
import { MessageButton } from "@/components/messages/message-button"
import { useSearchParams } from "next/navigation"
import { MessageDialog } from "@/components/messages/message-dialog"
import { SettingsButton } from "@/components/settings/settings-button"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  })

  const [activeTab, setActiveTab] = useState<string>("properties")
  const [messageDialogOpen, setMessageDialogOpen] = useState(false)

  // Set the active tab based on URL parameter if present
  useEffect(() => {
    if (tabParam && ["properties", "bookings", "revenue", "insights"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  return (
    <div className="container py-10">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-burnt-orange">
            <AvatarImage src="/confident-professional.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{greeting}, John</h1>
            <p className="text-gray-500 dark:text-gray-400">Here's what's happening with your properties today</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <NotificationDropdown />
          <MessageButton />
          <SettingsButton />
          <Button
            asChild
            className="bg-burnt-orange hover:bg-mustard text-white font-medium transition-all duration-200 hover:shadow-md hover:translate-y-[-1px] px-5 py-2.5"
          >
            <Link href="/dashboard/properties/new" className="flex items-center gap-2">
              <div className="bg-white/20 rounded-full p-1">
                <Plus className="h-4 w-4" />
              </div>
              <span>Add Property</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Performance Summary */}
      <Card className="mb-8 border-burnt-light dark:border-rustic-dark/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-burnt-orange" />
            Performance Summary
          </CardTitle>
          <CardDescription>Your 30-day hosting performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1 p-3 rounded-lg bg-burnt-light/50 dark:bg-rustic-dark/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Properties</span>
                <Home className="h-4 w-4 text-burnt-orange" />
              </div>
              <div className="text-2xl font-bold">3</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+1 from last month</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 p-3 rounded-lg bg-burnt-light/50 dark:bg-rustic-dark/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Bookings</span>
                <Calendar className="h-4 w-4 text-burnt-orange" />
              </div>
              <div className="text-2xl font-bold">12</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+4 from last month</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 p-3 rounded-lg bg-burnt-light/50 dark:bg-rustic-dark/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Revenue</span>
                <DollarSign className="h-4 w-4 text-burnt-orange" />
              </div>
              <div className="text-2xl font-bold">$4,325</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+15% from last month</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 p-3 rounded-lg bg-burnt-light/50 dark:bg-rustic-dark/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Rating</span>
                <Star className="h-4 w-4 text-burnt-orange" />
              </div>
              <div className="text-2xl font-bold">4.8</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+0.2 from last month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center py-6 border-dashed border-2 hover:border-burnt-orange hover:bg-burnt-light/30 dark:hover:border-mustard dark:hover:bg-rustic-dark/20"
            asChild
          >
            <Link href="/dashboard/properties/new">
              <Plus className="h-8 w-8 mb-2 text-burnt-orange dark:text-mustard" />
              <span>Add New Property</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center py-6 border-dashed border-2 hover:border-burnt-orange hover:bg-burnt-light/30 dark:hover:border-mustard dark:hover:bg-rustic-dark/20"
          >
            <Calendar className="h-8 w-8 mb-2 text-burnt-orange dark:text-mustard" />
            <span>Update Calendar</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center py-6 border-dashed border-2 hover:border-burnt-orange hover:bg-burnt-light/30 dark:hover:border-mustard dark:hover:bg-rustic-dark/20"
            onClick={() => setMessageDialogOpen(true)}
          >
            <div className="relative">
              <MessageSquare className="h-8 w-8 mb-2 text-burnt-orange dark:text-mustard" />
            </div>
            <span>Message Guests</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center py-6 border-dashed border-2 hover:border-burnt-orange hover:bg-burnt-light/30 dark:hover:border-mustard dark:hover:bg-rustic-dark/20"
            onClick={() => document.querySelector<HTMLButtonElement>(".settings-button")?.click()}
          >
            <Settings className="h-8 w-8 mb-2 text-burnt-orange dark:text-mustard" />
            <span>Account Settings</span>
          </Button>
        </div>
      </div>

      {/* Upcoming Bookings Preview */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-burnt-orange dark:text-mustard"
            onClick={() => setActiveTab("bookings")}
          >
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <Badge className="mb-2 bg-burnt-light text-burnt-orange dark:bg-rustic-dark/30 dark:text-mustard">
                    Check-in Today
                  </Badge>
                  <h3 className="font-medium">John Smith</h3>
                  <p className="text-sm text-gray-500">Modern Downtown Apartment</p>
                  <p className="text-sm">May 15 - May 20, 2023</p>
                </div>
                <Avatar>
                  <AvatarImage src="/thoughtful-gaze.png" alt="John Smith" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex justify-between mt-4">
                <span className="text-sm font-medium">$750 total</span>
                <Button size="sm" variant="outline" onClick={() => setMessageDialogOpen(true)}>
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <Badge className="mb-2 bg-burnt-light text-burnt-orange dark:bg-rustic-dark/30 dark:text-mustard">
                    Tomorrow
                  </Badge>
                  <h3 className="font-medium">Sarah Johnson</h3>
                  <p className="text-sm text-gray-500">Beachfront Cottage</p>
                  <p className="text-sm">June 1 - June 7, 2023</p>
                </div>
                <Avatar>
                  <AvatarImage src="/serene-gaze.png" alt="Sarah Johnson" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex justify-between mt-4">
                <span className="text-sm font-medium">$1,680 total</span>
                <Button size="sm" variant="outline" onClick={() => setMessageDialogOpen(true)}>
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <Badge className="mb-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    In 3 days
                  </Badge>
                  <h3 className="font-medium">Michael Brown</h3>
                  <p className="text-sm text-gray-500">Mountain Cabin Retreat</p>
                  <p className="text-sm">July 10 - July 15, 2023</p>
                </div>
                <Avatar>
                  <AvatarFallback>MB</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex justify-between mt-4">
                <span className="text-sm font-medium">$1,000 total</span>
                <Button size="sm" variant="outline" onClick={() => setMessageDialogOpen(true)}>
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4" id="bookings">
        <TabsList className="bg-burnt-light/50 dark:bg-rustic-dark/20 p-1">
          <TabsTrigger
            value="properties"
            className="data-[state=active]:bg-burnt-orange data-[state=active]:text-white dark:data-[state=active]:bg-mustard"
          >
            My Properties
          </TabsTrigger>
          <TabsTrigger
            value="bookings"
            className="data-[state=active]:bg-burnt-orange data-[state=active]:text-white dark:data-[state=active]:bg-mustard"
          >
            Bookings
          </TabsTrigger>
          <TabsTrigger
            value="revenue"
            className="data-[state=active]:bg-burnt-orange data-[state=active]:text-white dark:data-[state=active]:bg-mustard"
          >
            Revenue
          </TabsTrigger>
          <TabsTrigger
            value="insights"
            className="data-[state=active]:bg-burnt-orange data-[state=active]:text-white dark:data-[state=active]:bg-mustard"
          >
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Properties</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Sort
              </Button>
            </div>
          </div>
          <PropertyList />
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Bookings</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>
          <BookingsList />
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Your revenue over the last 6 months</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Monthly
                  </Button>
                  <Button variant="outline" size="sm">
                    Yearly
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pl-2">
              <RevenueChart />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Property</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-burnt-orange"></div>
                      <span>Modern Downtown Apartment</span>
                    </div>
                    <span className="font-medium">$3,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-mustard"></div>
                      <span>Beachfront Cottage</span>
                    </div>
                    <span className="font-medium">$5,600</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rustic-brown"></div>
                      <span>Mountain Cabin Retreat</span>
                    </div>
                    <span className="font-medium">$1,800</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Occupancy Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Modern Downtown Apartment</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-burnt-orange h-2.5 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Beachfront Cottage</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-mustard h-2.5 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Mountain Cabin Retreat</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-rustic-brown h-2.5 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
              <CardDescription>Tips to improve your hosting performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg border-burnt-light dark:border-rustic-dark/30">
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-burnt-orange" />
                    Improve your response rate
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Responding quickly to inquiries can increase your booking rate by up to 40%. Try to respond within 1
                    hour for the best results.
                  </p>
                  <Button variant="link" className="text-burnt-orange dark:text-mustard p-0 h-auto mt-2">
                    Learn more
                  </Button>
                </div>

                <div className="p-4 border rounded-lg border-burnt-light dark:border-rustic-dark/30">
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-burnt-orange" />
                    Update your calendar
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Your Mountain Cabin Retreat calendar hasn't been updated in 14 days. Keep your calendar up to date
                    to avoid double bookings.
                  </p>
                  <Button variant="link" className="text-burnt-orange dark:text-mustard p-0 h-auto mt-2">
                    Update now
                  </Button>
                </div>

                <div className="p-4 border rounded-lg border-burnt-light dark:border-rustic-dark/30">
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-burnt-orange" />
                    Optimize your pricing
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Properties in your area are priced 15% higher during summer months. Consider adjusting your rates to
                    maximize revenue.
                  </p>
                  <Button variant="link" className="text-burnt-orange dark:text-mustard p-0 h-auto mt-2">
                    View pricing tools
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Message Dialog */}
      <MessageDialog open={messageDialogOpen} setOpen={setMessageDialogOpen} />
    </div>
  )
}
