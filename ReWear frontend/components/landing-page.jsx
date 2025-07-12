"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  Package,
  Heart,
  MessageSquare,
  PlusCircle,
  Search,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  BarChart,
  Star,
  Zap,
  ArrowRight,
  Recycle,
  Tag,
  DollarSign,
  Award,
  Info,
  Upload,
} from "lucide-react"
import { useState } from "react"
import { useAuth } from "./auth-provider"

export function LandingPage() {
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Browse", icon: Package, href: "/browse" },
    { name: "Wishlist", icon: Heart, href: "/wishlist" },
    { name: "Messages", icon: MessageSquare, href: "/messages" },
    { name: "Dashboard", icon: BarChart, href: "/dashboard" },
    { name: "List Item", icon: PlusCircle, href: "/add-item" },
  ]

  return (
    <div className="min-h-screen bg-off-white text-charcoal-black">
      {/* Header */}
      <header className="bg-off-white shadow-sm border-b border-soft-lilac-gray sticky top-0 z-50 backdrop-blur-sm bg-off-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Recycle className="h-7 w-7 text-electric-violet" />
                <span className="text-2xl font-extrabold text-charcoal-black">ReWear</span>
              </Link>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search items, brands, categories..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-soft-lilac-gray border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet"
                />
              </div>
            </div>

            {/* Desktop Navigation & User */}
            <nav className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-charcoal-black hover:text-electric-violet transition-colors duration-200 flex items-center space-x-2 font-medium"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name ? user.name[0] : "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-gray-600">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    {user.isAdmin && (
                      <DropdownMenuItem>
                        <Link to="/admin" className="flex items-center w-full">
                          <BarChart className="mr-2 h-4 w-4" />
                          <span>Admin Panel</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/auth">
                  <Button className="bg-electric-violet hover:bg-electric-violet-dark text-off-white">Sign In</Button>
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-4 space-y-2 border-t border-soft-lilac-gray">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search items..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-soft-lilac-gray border-soft-lilac-gray"
              />
            </div>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-charcoal-black hover:bg-soft-lilac-gray hover:text-electric-violet"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="pt-4 border-t border-soft-lilac-gray mt-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name ? user.name[0] : "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-charcoal-black hover:bg-soft-lilac-gray hover:text-electric-violet"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-charcoal-black hover:bg-soft-lilac-gray hover:text-electric-violet"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-charcoal-black hover:bg-soft-lilac-gray hover:text-electric-violet"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <BarChart className="h-5 w-5" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  <Button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full justify-start mt-2 bg-transparent text-charcoal-black hover:bg-soft-lilac-gray"
                    variant="ghost"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Log out</span>
                  </Button>
                </>
              ) : (
                <Link to="/auth" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-electric-violet hover:bg-electric-violet-dark text-off-white">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-electric-violet to-cyan-blue text-off-white py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up">
            Swap, Share, Sustain.
          </h2>
          <p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Discover a vibrant community for exchanging pre-loved fashion. Give your clothes a new life and earn points!
          </p>
          <div className="flex justify-center space-x-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/browse">
              <Button className="bg-mint-green hover:bg-mint-green/90 text-charcoal-black px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                Browse Items
              </Button>
            </Link>
            <Link to="/add-item">
              <Button
                variant="outline"
                className="border-2 border-off-white text-off-white bg-transparent hover:bg-off-white hover:text-electric-violet px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                List Your Item
              </Button>
            </Link>
          </div>
        </div>
        {/* Abstract shapes for background */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-64 h-64 bg-mint-green rounded-full opacity-10 -top-16 -left-16 animate-float"></div>
          <div className="absolute w-96 h-96 bg-sunset-coral rounded-full opacity-10 -bottom-32 -right-32 animate-float-delay"></div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-charcoal-black animate-fade-in">How ReWear Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-white shadow-lg rounded-lg border border-soft-lilac-gray animate-slide-up">
              <CardContent className="flex flex-col items-center">
                <div className="bg-electric-violet/10 p-4 rounded-full mb-4">
                  <Upload className="h-8 w-8 text-electric-violet" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-charcoal-black">1. List Your Items</h4>
                <p className="text-gray-600">
                  Upload photos and details of your pre-loved clothing. Earn points for each approved listing.
                </p>
              </CardContent>
            </Card>
            <Card
              className="p-6 bg-white shadow-lg rounded-lg border border-soft-lilac-gray animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <CardContent className="flex flex-col items-center">
                <div className="bg-mint-green/10 p-4 rounded-full mb-4">
                  <Tag className="h-8 w-8 text-mint-green" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-charcoal-black">2. Browse & Swap</h4>
                <p className="text-gray-600">
                  Explore unique fashion pieces from other users. Use your earned points to claim new items.
                </p>
              </CardContent>
            </Card>
            <Card
              className="p-6 bg-white shadow-lg rounded-lg border border-soft-lilac-gray animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="flex flex-col items-center">
                <div className="bg-sunset-coral/10 p-4 rounded-full mb-4">
                  <Recycle className="h-8 w-8 text-sunset-coral" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-charcoal-black">3. Sustain Fashion</h4>
                <p className="text-gray-600">
                  Join the movement to reduce textile waste and embrace a more sustainable wardrobe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-soft-lilac-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-charcoal-black animate-fade-in">
            Why Choose ReWear?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-4 animate-fade-in-left">
              <div className="bg-electric-violet/10 p-3 rounded-full">
                <Star className="h-6 w-6 text-electric-violet" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1 text-charcoal-black">Quality & Variety</h4>
                <p className="text-gray-600 text-sm">
                  Discover a curated selection of pre-loved clothing, from vintage gems to modern styles.
                </p>
              </div>
            </Card>
            <Card
              className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-4 animate-fade-in-left"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="bg-mint-green/10 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-mint-green" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1 text-charcoal-black">Earn & Spend Points</h4>
                <p className="text-gray-600 text-sm">
                  List items to earn points, then use them to acquire new pieces without spending cash.
                </p>
              </div>
            </Card>
            <Card
              className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-4 animate-fade-in-left"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-cyan-blue/10 p-3 rounded-full">
                <Award className="h-6 w-6 text-cyan-blue" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1 text-charcoal-black">Community Driven</h4>
                <p className="text-gray-600 text-sm">
                  Connect with like-minded fashion enthusiasts and build your sustainable network.
                </p>
              </div>
            </Card>
            <Card
              className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-4 animate-fade-in-left"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="bg-sunset-coral/10 p-3 rounded-full">
                <Info className="h-6 w-6 text-sunset-coral" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1 text-charcoal-black">Transparent & Fair</h4>
                <p className="text-gray-600 text-sm">
                  Our clear guidelines and review process ensure a trustworthy exchange experience.
                </p>
              </div>
            </Card>
            <Card
              className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-4 animate-fade-in-left"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="bg-neon-yellow/10 p-3 rounded-full">
                <Zap className="h-6 w-6 text-neon-yellow" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1 text-charcoal-black">Easy to Use</h4>
                <p className="text-gray-600 text-sm">
                  Intuitive interface makes listing, browsing, and swapping a breeze.
                </p>
              </div>
            </Card>
            <Card
              className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-4 animate-fade-in-left"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="bg-electric-violet/10 p-3 rounded-full">
                <Recycle className="h-6 w-6 text-electric-violet" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1 text-charcoal-black">Eco-Friendly Impact</h4>
                <p className="text-gray-600 text-sm">
                  Contribute to a circular economy and reduce your environmental footprint.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-br from-mint-green to-cyan-blue py-16 text-center text-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">Ready to ReWear?</h3>
          <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Join thousands of fashion lovers giving clothes a second life.
          </p>
          <Link to="/auth">
            <Button
              className="bg-electric-violet hover:bg-electric-violet-dark text-off-white px-10 py-4 text-xl rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-black text-off-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Recycle className="h-7 w-7 text-electric-violet" />
              <span className="text-2xl font-extrabold">ReWear</span>
            </Link>
            <p className="text-gray-400 text-sm">Sustainable fashion, reimagined.</p>
            <div className="flex space-x-4">
              {/* Social Media Icons Placeholder */}
              <Link to="#" className="text-gray-400 hover:text-off-white">
                {/* <Facebook className="h-6 w-6" /> */}
                FB
              </Link>
              <Link to="#" className="text-gray-400 hover:text-off-white">
                {/* <Twitter className="h-6 w-6" /> */}
                TW
              </Link>
              <Link to="#" className="text-gray-400 hover:text-off-white">
                {/* <Instagram className="h-6 w-6" /> */}
                IG
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/browse" className="hover:text-off-white">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/add-item" className="hover:text-off-white">
                  List an Item
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-off-white">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-off-white">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/faq" className="hover:text-off-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-off-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-off-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-off-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Stay updated with our latest items and news.</p>
            <form className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-l-md border-none bg-gray-700 text-off-white placeholder-gray-400 focus:ring-electric-violet"
              />
              <Button type="submit" className="bg-electric-violet hover:bg-electric-violet-dark rounded-r-md px-4">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ReWear. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
