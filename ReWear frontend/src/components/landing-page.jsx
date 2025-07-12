"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import {
  Search,
  Plus,
  User,
  LogOut,
  Recycle,
  Shirt,
  Star,
  Heart,
  Users,
  Leaf,
  TrendingUp,
  Award,
  Sparkles,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Shield,
  Globe,
  Truck,
  RefreshCw,
} from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

const categories = [
  {
    name: "Tops",
    icon: Shirt,
    count: 234,
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    name: "Dresses",
    icon: Shirt,
    count: 156,
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    name: "Pants",
    icon: Shirt,
    count: 189,
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    name: "Shoes",
    icon: Shirt,
    count: 98,
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    name: "Accessories",
    icon: Shirt,
    count: 145,
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    name: "Outerwear",
    icon: Shirt,
    count: 87,
    image: "/placeholder.svg?height=120&width=120",
  },
]

const featuredItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    category: "Outerwear",
    size: "M",
    condition: "Excellent",
    points: 45,
    image: "/placeholder.svg?height=300&width=300",
    user: "Sarah M.",
    rating: 4.8,
    isNew: true,
    isTrending: true,
    brand: "Levi's",
    userAvatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    title: "Floral Summer Dress",
    category: "Dresses",
    size: "S",
    condition: "Good",
    points: 35,
    image: "/placeholder.svg?height=300&width=300",
    user: "Emma K.",
    rating: 4.9,
    isNew: false,
    isTrending: false,
    brand: "Zara",
    userAvatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    title: "Designer Sneakers",
    category: "Shoes",
    size: "8",
    condition: "Like New",
    points: 60,
    image: "/placeholder.svg?height=300&width=300",
    user: "Alex R.",
    rating: 5.0,
    isNew: true,
    isTrending: true,
    brand: "Nike",
    userAvatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    title: "Wool Sweater",
    category: "Tops",
    size: "L",
    condition: "Excellent",
    points: 40,
    image: "/placeholder.svg?height=300&width=300",
    user: "Maya P.",
    rating: 4.7,
    isNew: false,
    isTrending: false,
    brand: "H&M",
    userAvatar: "/placeholder.svg?height=32&width=32",
  },
]

const stats = [
  { label: "Items Exchanged", value: "12,543", icon: Recycle, change: "+23%" },
  { label: "Active Users", value: "3,247", icon: Users, change: "+18%" },
  { label: "CO₂ Saved (kg)", value: "8,921", icon: Leaf, change: "+31%" },
  { label: "Avg Rating", value: "4.8", icon: Star, change: "+0.2" },
]

const features = [
  {
    icon: Recycle,
    title: "Sustainable Exchange",
    description: "Reduce textile waste by giving your clothes a second life through our platform.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join thousands of conscious consumers building a sustainable fashion future.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    icon: CheckCircle,
    title: "Quality Assured",
    description: "Every item is reviewed and verified to ensure the highest quality standards.",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const howItWorks = [
  {
    step: "01",
    title: "List Your Items",
    description: "Upload photos and details of clothes you no longer wear",
    icon: Plus,
  },
  {
    step: "02",
    title: "Browse & Connect",
    description: "Discover items you love and connect with other users",
    icon: Search,
  },
  {
    step: "03",
    title: "Swap or Redeem",
    description: "Exchange directly or use points to get what you want",
    icon: RefreshCw,
  },
  {
    step: "04",
    title: "Enjoy & Rate",
    description: "Receive your new items and rate your experience",
    icon: Star,
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fashion Enthusiast",
    content:
      "ReWear has completely transformed how I think about fashion. I've discovered amazing pieces while reducing my environmental impact.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Sustainable Living Advocate",
    content: "The quality of items and the community here is incredible. It's fashion with a conscience.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Style Blogger",
    content: "I love how easy it is to find unique pieces. The points system makes it so accessible for everyone.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
]

export function LandingPage() {
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredItems.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <header className="bg-off-white shadow-sm border-b border-soft-lilac-gray sticky top-0 z-50 backdrop-blur-sm bg-off-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="bg-electric-violet rounded-full p-2 shadow-lg">
                  <Recycle className="h-6 w-6 text-off-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-charcoal-black">ReWear</h1>
                  <p className="text-xs text-gray-600 font-medium">Sustainable Fashion</p>
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search for clothes, brands, or users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 h-10 border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet bg-off-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-soft-lilac-gray px-4 py-2 rounded-full border border-soft-lilac-gray">
                <div className="w-2 h-2 bg-electric-violet rounded-full"></div>
                <span className="text-sm font-semibold text-charcoal-black">{user?.points} points</span>
              </div>

              <Link to="/messages">
                <Button variant="ghost" size="sm" className="hover:bg-soft-lilac-gray relative">
                  <MessageCircle className="h-4 w-4 text-gray-600" />
                  <Badge className="absolute -top-1 -right-1 bg-electric-violet text-off-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                    3
                  </Badge>
                </Button>
              </Link>

              <Link to="/wishlist">
                <Button variant="ghost" size="sm" className="hover:bg-soft-lilac-gray relative">
                  <Heart className="h-4 w-4 text-gray-600" />
                  <Badge className="absolute -top-1 -right-1 bg-electric-violet text-off-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                    5
                  </Badge>
                </Button>
              </Link>

              <Link to="/add-item">
                <Button size="sm" className="bg-electric-violet hover:bg-electric-violet-dark text-off-white shadow-lg">
                  <Plus className="h-4 w-4 mr-1" />
                  List Item
                </Button>
              </Link>

              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="hover:bg-soft-lilac-gray">
                  <User className="h-4 w-4 text-gray-600" />
                </Button>
              </Link>

              <Button variant="ghost" size="sm" onClick={logout} className="hover:bg-soft-lilac-gray">
                <LogOut className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-charcoal-black text-off-white py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-black via-charcoal-black to-charcoal-black opacity-90"></div>
          <img
            src="/placeholder.svg?height=800&width=1200"
            alt="Sustainable Fashion"
            width={1200}
            height={800}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute top-20 left-20 w-72 h-72 bg-electric-violet rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-mint-green rounded-full opacity-5 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-electric-violet/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-electric-violet/30">
                <Leaf className="h-4 w-4 text-electric-violet" />
                <span className="text-sm font-medium text-electric-violet">Sustainable Fashion Revolution</span>
              </div>

              <h2 className="text-6xl md:text-7xl font-bold mb-8 animate-fade-in leading-tight text-off-white">
                Fashion
                <br />
                <span className="text-electric-violet">Reimagined</span>
              </h2>

              <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-2xl animate-slide-up leading-relaxed">
                Transform your wardrobe sustainably. Exchange unused clothing through direct swaps or our points system.
                Join a community that values quality, style, and environmental responsibility.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 animate-slide-up">
                <Link to="/browse">
                  <Button
                    size="lg"
                    className="bg-electric-violet text-off-white hover:bg-electric-violet-dark text-lg px-10 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Start Exploring
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-10 py-4 border-2 border-electric-violet text-electric-violet hover:bg-electric-violet hover:text-off-white bg-transparent rounded-full shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Browse Collection
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 mt-12 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-600">Verified Quality</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-600">3K+ Community</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-600">Free Shipping</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="/placeholder.svg?height=300&width=250"
                    alt="Fashion Item 1"
                    width={250}
                    height={300}
                    className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                  />
                  <img
                    src="/placeholder.svg?height=200&width=250"
                    alt="Fashion Item 2"
                    width={250}
                    height={200}
                    className="rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img
                    src="/placeholder.svg?height=250&width=250"
                    alt="Fashion Item 3"
                    width={250}
                    height={250}
                    className="rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                  />
                  <img
                    src="/placeholder.svg?height=280&width=250"
                    alt="Fashion Item 4"
                    width={250}
                    height={280}
                    className="rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-soft-lilac-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold text-charcoal-black mb-6">How It Works</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-xl">
              Getting started with sustainable fashion is easier than you think
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div
                key={step.step}
                className="text-center animate-fade-in group relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-8">
                  <div className="bg-electric-violet rounded-full p-8 mx-auto w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <step.icon className="h-8 w-8 text-off-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-off-white border-4 border-soft-lilac-gray rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-charcoal-black">{step.step}</span>
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-electric-violet/30 -translate-x-1/2"></div>
                  )}
                </div>
                <h4 className="text-xl font-bold text-charcoal-black mb-4">{step.title}</h4>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold text-charcoal-black mb-6">Making a Real Impact</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-xl">
              Join thousands of users who are already making a difference in sustainable fashion
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in card-hover p-8 bg-soft-lilac-gray rounded-2xl border border-soft-lilac-gray shadow-sm hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-electric-violet rounded-full p-4 shadow-lg">
                    <stat.icon className="h-8 w-8 text-off-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-charcoal-black mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium uppercase tracking-wide mb-2">{stat.label}</div>
                <div className="text-xs text-mint-green font-semibold bg-mint-green/10 px-2 py-1 rounded-full inline-block">
                  {stat.change} this month
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-soft-lilac-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold text-charcoal-black mb-6">Why Choose ReWear?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-xl">
              We're building the future of fashion through sustainable practices and community-driven exchange
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="animate-fade-in group bg-off-white border-soft-lilac-gray shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-electric-violet/10 group-hover:bg-electric-violet/20 transition-colors duration-300"></div>
                  <div className="absolute top-4 left-4 bg-electric-violet rounded-full p-3 shadow-lg">
                    <feature.icon className="h-6 w-6 text-off-white" />
                  </div>
                </div>
                <CardContent className="p-8">
                  <h4 className="text-2xl font-bold text-charcoal-black mb-4 group-hover:text-charcoal-black transition-colors text-lg">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold text-charcoal-black mb-6">Shop by Category</h3>
            <p className="text-gray-600 text-xl">Discover amazing pieces in every category</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link key={category.name} to={`/browse?category=${category.name.toLowerCase()}`}>
                <Card
                  className="card-hover cursor-pointer group animate-fade-in bg-off-white border-soft-lilac-gray shadow-sm hover:shadow-xl transition-all duration-300 hover:border-electric-violet overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-electric-violet/10 group-hover:bg-electric-violet/20 transition-colors duration-300"></div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h4 className="font-bold text-charcoal-black group-hover:text-charcoal-black transition-colors text-lg">
                      {category.name}
                    </h4>
                    <p className="text-sm text-gray-600 font-medium">{category.count} items</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-24 bg-soft-lilac-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-20">
            <div>
              <h3 className="text-5xl font-bold text-charcoal-black mb-4">Featured Items</h3>
              <p className="text-gray-600 text-xl">Handpicked items from our community</p>
            </div>
            <Link to="/browse">
              <Button
                variant="outline"
                className="bg-transparent border-electric-violet text-electric-violet hover:bg-electric-violet hover:text-off-white transition-all duration-300 px-8 py-4 text-lg"
              >
                View All Items
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((item, index) => (
              <Link key={item.id} to={`/item/${item.id}`}>
                <Card
                  className="card-hover cursor-pointer group animate-fade-in bg-off-white border-soft-lilac-gray shadow-sm hover:shadow-xl transition-all duration-300 hover:border-electric-violet overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-col space-y-2">
                      {item.isNew && <Badge className="bg-electric-violet text-off-white shadow-lg">New</Badge>}
                      {item.isTrending && (
                        <Badge className="bg-mint-green text-off-white shadow-lg">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 bg-off-white/90 hover:bg-off-white shadow-lg backdrop-blur-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toast({
                          title: "Added to wishlist",
                          description: `${item.title} has been added to your wishlist`,
                        })
                      }}
                    >
                      <Heart className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-charcoal-black group-hover:text-gray-600 transition-colors text-lg">
                        {item.title}
                      </h4>
                      <div className="flex items-center space-x-1 bg-electric-violet px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-off-white rounded-full"></div>
                        <span className="text-sm font-bold text-off-white">{item.points} pts</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 font-medium">{item.brand}</p>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span className="font-medium">{item.category}</span>
                      <span className="bg-soft-lilac-gray px-3 py-1 rounded-full text-xs font-medium">
                        Size {item.size}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-charcoal-black font-bold bg-soft-lilac-gray px-3 py-1 rounded-full">
                        {item.condition}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-neon-yellow text-neon-yellow" />
                        <span className="text-gray-600 font-medium">{item.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2 border-t border-soft-lilac-gray">
                      <img
                        src={item.userAvatar || "/placeholder.svg"}
                        alt={item.user}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-sm text-gray-600 font-medium">{item.user}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold text-charcoal-black mb-6">What Our Community Says</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-xl">Real stories from real people making a difference</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className="animate-fade-in bg-soft-lilac-gray border-soft-lilac-gray shadow-sm hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-neon-yellow text-neon-yellow" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-bold text-charcoal-black">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-charcoal-black text-off-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg?height=600&width=1200"
            alt="Join ReWear"
            width={1200}
            height={600}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute top-20 left-20 w-72 h-72 bg-electric-violet rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-mint-green rounded-full opacity-5 blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-electric-violet/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-electric-violet/30">
            <Award className="h-4 w-4 text-electric-violet" />
            <span className="text-sm font-medium text-electric-violet">Join the Movement</span>
          </div>

          <h3 className="text-6xl md:text-7xl font-bold mb-8 leading-tight text-off-white">
            Ready to Make a Difference?
          </h3>
          <p className="text-2xl mb-16 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of users who are already reducing textile waste and discovering amazing clothes while
            building a sustainable future together.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link to="/add-item">
              <Button
                size="lg"
                className="bg-electric-violet text-off-white hover:bg-electric-violet-dark text-xl px-12 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold"
              >
                <Plus className="h-6 w-6 mr-3" />
                List Your First Item
              </Button>
            </Link>
            <Link to="/browse">
              <Button
                size="lg"
                variant="outline"
                className="text-xl px-12 py-6 border-2 border-electric-violet text-electric-violet hover:bg-electric-violet hover:text-off-white bg-transparent rounded-full shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold"
              >
                <Search className="h-6 w-6 mr-3" />
                Start Browsing
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-12 mt-16 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600">Free to Join</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600">Secure Platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600">Global Community</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-off-white border-t border-soft-lilac-gray py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-electric-violet rounded-full p-3">
                  <Recycle className="h-6 w-6 text-off-white" />
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-charcoal-black">ReWear</h4>
                  <p className="text-gray-600 text-sm">Sustainable Fashion Exchange</p>
                </div>
              </div>
              <p className="text-gray-600 mb-8 max-w-md leading-relaxed text-lg">
                Making fashion sustainable, one swap at a time. Join our community of conscious consumers who believe in
                reducing waste and sharing style responsibly.
              </p>
              <div className="flex space-x-4">
                <div className="bg-soft-lilac-gray rounded-lg p-4 hover:bg-electric-violet hover:text-off-white transition-colors duration-300 cursor-pointer">
                  <Users className="h-6 w-6" />
                </div>
                <div className="bg-soft-lilac-gray rounded-lg p-4 hover:bg-electric-violet hover:text-off-white transition-colors duration-300 cursor-pointer">
                  <Leaf className="h-6 w-6" />
                </div>
                <div className="bg-soft-lilac-gray rounded-lg p-4 hover:bg-electric-violet hover:text-off-white transition-colors duration-300 cursor-pointer">
                  <Recycle className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-bold mb-8 text-charcoal-black text-xl">Platform</h5>
              <ul className="space-y-4 text-gray-600">
                <li>
                  <Link to="/browse" className="hover:text-electric-violet transition-colors font-medium text-lg">
                    Browse Items
                  </Link>
                </li>
                <li>
                  <Link to="/add-item" className="hover:text-electric-violet transition-colors font-medium text-lg">
                    List an Item
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-electric-violet transition-colors font-medium text-lg">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="hover:text-electric-violet transition-colors font-medium text-lg">
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-8 text-charcoal-black text-xl">Support</h5>
              <ul className="space-y-4 text-gray-600">
                <li>
                  <Link to="#" className="hover:text-electric-violet transition-colors font-medium text-lg">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-electric-violet transition-colors font-medium text-lg">
                    Safety Guidelines
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-electric-violet transition-colors font-medium text-lg">
                    Community
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-electric-violet transition-colors font-medium text-lg">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-soft-lilac-gray mt-16 pt-8 text-center text-gray-600">
            <p className="font-medium text-lg">
              &copy; 2024 ReWear. All rights reserved. Built for sustainable fashion and a better tomorrow.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
