"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  Search,
  Filter,
  Tag,
  Ruler,
  Zap,
  Heart,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const categories = ["All", "Tops", "Dresses", "Pants", "Shoes", "Outerwear", "Accessories"]
const sizes = ["All", "XS", "S", "M", "L", "XL", "XXL", "6", "7", "8", "9", "10", "11", "12"]
const conditions = ["All", "Like New", "Excellent", "Good", "Fair"]

const mockItems = [
  {
    id: "1",
    title: "Vintage Denim Jacket",
    image: "/placeholder.svg?height=300&width=300",
    brand: "Levi's",
    size: "M",
    condition: "Good",
    points: 60,
    user: "Alice J.",
  },
  {
    id: "2",
    title: "Boho Floral Maxi Dress",
    image: "/placeholder.svg?height=300&width=300",
    brand: "Zara",
    size: "S",
    condition: "Like New",
    points: 75,
    user: "Bob W.",
  },
  {
    id: "3",
    title: "Striped Cotton Sweater",
    image: "/placeholder.svg?height=300&width=300",
    brand: "Everlane",
    size: "L",
    condition: "Excellent",
    points: 55,
    user: "Charlie B.",
  },
  {
    id: "4",
    title: "High-Waisted Black Jeans",
    image: "/placeholder.svg?height=300&width=300",
    brand: "Madewell",
    size: "28",
    condition: "Good",
    points: 65,
    user: "Diana P.",
  },
  {
    id: "5",
    title: "Cozy Knit Cardigan",
    image: "/placeholder.svg?height=300&width=300",
    brand: "H&M",
    size: "M",
    condition: "Fair",
    points: 30,
    user: "Eve R.",
  },
  {
    id: "6",
    title: "Running Shoes",
    image: "/placeholder.svg?height=300&width=300",
    brand: "Nike",
    size: "9",
    condition: "Good",
    points: 40,
    user: "Frank L.",
  },
]

const BrowsePage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSize, setSelectedSize] = useState("All")
  const [selectedCondition, setSelectedCondition] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6 // Number of items to display per page
  const { toast } = useToast()

  const filteredItems = mockItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSize = selectedSize === "All" || item.size === selectedSize
    const matchesCondition = selectedCondition === "All" || item.condition === selectedCondition
    return matchesSearch && matchesCategory && matchesSize && matchesCondition
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredItems.slice(startIndex, endIndex)

  const handleAddToWishlist = (itemName) => {
    toast({
      title: "Added to Wishlist!",
      description: `${itemName} has been added to your wishlist.`,
    })
  }

  const handleMessageSeller = (sellerName) => {
    toast({
      title: "Message Sent!",
      description: `You've started a conversation with ${sellerName}.`,
    })
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <div className="bg-off-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-sm bg-off-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="hover:bg-soft-lilac-gray">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-charcoal-black">Browse Items</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-fade-in">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search items, brands, users..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-soft-lilac-gray border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="h-12 border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet">
              <Filter className="h-4 w-4 mr-2 text-gray-600" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger className="h-12 border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet">
              <Ruler className="h-4 w-4 mr-2 text-gray-600" />
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              {sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCondition} onValueChange={setSelectedCondition}>
            <SelectTrigger className="h-12 border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet">
              <Tag className="h-4 w-4 mr-2 text-gray-600" />
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              {conditions.map((condition) => (
                <SelectItem key={condition} value={condition}>
                  {condition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Item Grid */}
        {currentItems.length === 0 ? (
          <Card className="text-center py-12 bg-white shadow-sm border-soft-lilac-gray">
            <CardContent className="space-y-4">
              <Search className="h-16 w-16 text-gray-400 mx-auto" />
              <h2 className="text-2xl font-bold text-charcoal-black">No Items Found</h2>
              <p className="text-gray-600">Try adjusting your search or filters.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                  setSelectedSize("All")
                  setSelectedCondition("All")
                }}
                className="bg-electric-violet hover:bg-electric-violet-dark text-off-white"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item, index) => (
              <Card
                key={item.id}
                className="animate-fade-in bg-white shadow-md border-soft-lilac-gray"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Link to={`/item/${item.id}`}>
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg border-b border-soft-lilac-gray"
                  />
                </Link>
                <CardContent className="p-4 space-y-2">
                  <Link to={`/item/${item.id}`}>
                    <h3 className="font-semibold text-lg text-charcoal-black hover:text-electric-violet transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600">
                    {item.brand} • {item.size} • {item.condition}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Zap className="h-5 w-5 text-electric-violet" />
                      <span className="text-xl font-bold text-electric-violet">{item.points} pts</span>
                    </div>
                    <p className="text-sm text-gray-600">by {item.user}</p>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-off-white border-soft-lilac-gray hover:bg-soft-lilac-gray"
                      onClick={() => handleAddToWishlist(item.title)}
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      Wishlist
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-off-white border-soft-lilac-gray hover:bg-soft-lilac-gray"
                      onClick={() => handleMessageSeller(item.user)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-8 animate-fade-in">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="bg-off-white border-soft-lilac-gray hover:bg-soft-lilac-gray"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-lg font-medium text-charcoal-black">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="bg-off-white border-soft-lilac-gray hover:bg-soft-lilac-gray"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BrowsePage
