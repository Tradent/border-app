"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Bell, CreditCard, Lock, User, Wallet } from "lucide-react"
import { useDemoMode } from "@/lib/demo/demo-context"

interface SettingsDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function SettingsDialog({ open, setOpen }: SettingsDialogProps) {
  const { isDemoMode } = useDemoMode()
  const [activeTab, setActiveTab] = useState("profile")
  const [formState, setFormState] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Property owner and host with 3 years of experience.",
    language: "english",
    timezone: "pst",
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    twoFactorAuth: false,
    darkMode: false,
    currency: "usd",
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // In a real app, this would save to a backend
    console.log("Saving settings:", formState)
    // Show success message
    alert("Settings saved successfully!")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Settings</DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="wallet" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">Wallet</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
                  <Avatar className="h-20 w-20 border-2 border-burnt-orange">
                    <AvatarImage src="/confident-professional.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="font-medium">Profile Photo</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formState.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formState.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" value={formState.bio} onChange={(e) => handleInputChange("bio", e.target.value)} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Manage your language and regional settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={formState.language} onValueChange={(value) => handleInputChange("language", value)}>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={formState.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                        <SelectItem value="cst">Central Time (CST)</SelectItem>
                        <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={formState.twoFactorAuth}
                    onCheckedChange={(checked) => handleInputChange("twoFactorAuth", checked)}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-medium">Password</h3>
                  <Button variant="outline">Change Password</Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-medium text-destructive">Danger Zone</h3>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={formState.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={formState.pushNotifications}
                    onCheckedChange={(checked) => handleInputChange("pushNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={formState.smsNotifications}
                    onCheckedChange={(checked) => handleInputChange("smsNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive emails about new features and promotions</p>
                  </div>
                  <Switch
                    id="marketing-emails"
                    checked={formState.marketingEmails}
                    onCheckedChange={(checked) => handleInputChange("marketingEmails", checked)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border p-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
                <Button className="w-full" variant="outline">
                  Add Payment Method
                </Button>
                <Separator />
                <div className="grid gap-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={formState.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                      <SelectItem value="gbp">GBP - British Pound</SelectItem>
                      <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Wallet Settings */}
          <TabsContent value="wallet" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Settings</CardTitle>
                <CardDescription>Manage your blockchain wallet settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isDemoMode ? (
                  <div className="rounded-md border p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-100 p-2 rounded-md">
                        <Wallet className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium">Demo Wallet</p>
                        <p className="text-sm text-muted-foreground">8xzt...3kPq</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Wallet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-medium text-lg mb-2">No Wallet Connected</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Connect your blockchain wallet to enable crypto payments and NFT features
                    </p>
                    <Button>Connect Wallet</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
