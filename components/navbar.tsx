"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, Home, Building, Info, Map } from "lucide-react"
import { WalletButton } from "@/components/wallet/wallet-button"
import { DemoModeBanner } from "@/components/demo/demo-mode-banner"

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      <DemoModeBanner />
      <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:border-gray-800">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="font-bold text-2xl text-burnt-orange dark:text-mustard flex items-center gap-2">
              <Map className="h-6 w-6" />
              Border
            </Link>
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/properties" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-burnt-light hover:text-burnt-orange focus:bg-burnt-light focus:text-burnt-orange focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-burnt-light data-[active]:text-burnt-orange dark:hover:bg-rustic-dark dark:hover:text-mustard dark:focus:bg-rustic-dark dark:focus:text-mustard dark:data-[active]:bg-rustic-dark dark:data-[active]:text-mustard",
                        pathname === "/properties"
                          ? "bg-burnt-light text-burnt-orange dark:bg-rustic-dark dark:text-mustard"
                          : "text-gray-700 dark:text-gray-200",
                      )}
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Properties
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-burnt-light hover:text-burnt-orange focus:bg-burnt-light focus:text-burnt-orange focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-burnt-light data-[active]:text-burnt-orange dark:hover:bg-rustic-dark dark:hover:text-mustard dark:focus:bg-rustic-dark dark:focus:text-mustard dark:data-[active]:bg-rustic-dark dark:data-[active]:text-mustard",
                      "text-gray-700 dark:text-gray-200",
                    )}
                  >
                    <Building className="mr-2 h-4 w-4" />
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-burnt-light to-white p-6 no-underline outline-none focus:shadow-md dark:from-rustic-dark dark:to-gray-900"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-burnt-orange dark:text-mustard flex items-center gap-2">
                              <Map className="h-5 w-5" />
                              Border
                            </div>
                            <p className="text-sm leading-tight text-gray-600 dark:text-gray-300">
                              Unlock your property's potential with blockchain-powered rentals
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/about" title="About" icon={<Info className="h-4 w-4 mr-2" />}>
                        Learn about our mission and vision
                      </ListItem>
                      <ListItem href="/dashboard" title="Dashboard" icon={<Building className="h-4 w-4 mr-2" />}>
                        Manage your properties and bookings
                      </ListItem>
                      <ListItem href="/signin" title="Sign In" icon={<User className="h-4 w-4 mr-2" />}>
                        Connect your wallet and sign in
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-burnt-light hover:text-burnt-orange focus:bg-burnt-light focus:text-burnt-orange focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-burnt-light data-[active]:text-burnt-orange dark:hover:bg-rustic-dark dark:hover:text-mustard dark:focus:bg-rustic-dark dark:focus:text-mustard dark:data-[active]:bg-rustic-dark dark:data-[active]:text-mustard",
                        pathname === "/about"
                          ? "bg-burnt-light text-burnt-orange dark:bg-rustic-dark dark:text-mustard"
                          : "text-gray-700 dark:text-gray-200",
                      )}
                    >
                      <Info className="mr-2 h-4 w-4" />
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-6">
            <ModeToggle />
            <div className="hidden md:flex items-center gap-4">
              <WalletButton />
            </div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex items-center gap-2 mb-8 mt-4">
                  <Map className="h-6 w-6 text-burnt-orange dark:text-mustard" />
                  <span className="font-bold text-2xl text-burnt-orange dark:text-mustard">Border</span>
                </div>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center text-lg font-medium transition-colors hover:text-burnt-orange dark:hover:text-mustard",
                      pathname === "/" ? "text-burnt-orange dark:text-mustard" : "text-gray-600 dark:text-gray-300",
                    )}
                  >
                    <Home className="mr-2 h-5 w-5" />
                    Home
                  </Link>
                  <Link
                    href="/properties"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center text-lg font-medium transition-colors hover:text-burnt-orange dark:hover:text-mustard",
                      pathname === "/properties"
                        ? "text-burnt-orange dark:text-mustard"
                        : "text-gray-600 dark:text-gray-300",
                    )}
                  >
                    <Building className="mr-2 h-5 w-5" />
                    Properties
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center text-lg font-medium transition-colors hover:text-burnt-orange dark:hover:text-mustard",
                      pathname === "/about"
                        ? "text-burnt-orange dark:text-mustard"
                        : "text-gray-600 dark:text-gray-300",
                    )}
                  >
                    <Info className="mr-2 h-5 w-5" />
                    About
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center px-4 py-2 rounded-md bg-burnt-orange hover:bg-mustard text-white font-medium text-lg"
                  >
                    <User className="mr-2 h-5 w-5" />
                    Dashboard
                  </Link>
                  <div className="mt-2">
                    <WalletButton />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-burnt-light hover:text-burnt-orange focus:bg-burnt-light focus:text-burnt-orange dark:hover:bg-rustic-dark dark:hover:text-mustard dark:focus:bg-rustic-dark dark:focus:text-mustard",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none flex items-center">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
