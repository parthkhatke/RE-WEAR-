"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ArrowLeft, Heart, MessageSquare, Share2, Tag, Ruler, Zap, CheckCircle, Clock, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockItems = [
  {
    id: "1",
    title: "Vintage Denim Jacket",
    description:
      "Classic Levi's denim jacket, perfect for layering. Lightly worn with a great faded look. No major flaws, just natural wear.",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    category: "Outerwear",
    brand: "Levi's",
    size: "M",
    condition: "Good",
    points: 60,
    tags: ["denim", "vintage", "jacket", "outerwear", "levis"],
    user: {
      id: "user1",
      name: "Alice J.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      listings: 12,
    },
    postedDate: "2024-07-01T10:00:00Z",
    status: "available",
  },
  {
    id: "2",
    title: "Boho Floral Maxi Dress",
    description:
      "Flowy maxi dress with a beautiful floral print, ideal for summer. Comfortable and breathable fabric. Worn once, like new.",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    category: "Dresses",
    brand: "Zara",
    size: "S",
    condition: "Like New",
    points: 75,
    tags: ["boho", "floral", "maxi dress", "summer", "zara"],
    user: {
      id: "user2",
      name: "Bob W.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
      listings: 8,
    },
    postedDate: "2024-06-28T14:30:00Z",
    status: "available",
  },
]

const ItemPage = () => {
  const { id } = useParams()
  const { toast } = useToast()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true)
      setError(null)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        const foundItem = mockItems.find((i) => i.id === id)
        if (foundItem) {
          setItem(foundItem)
        } else {
          setError("Item not found.")
        }
      } catch (err) {
        setError("Failed to load item.")
      } finally {
        setLoading(false)
      }
    }
    fetchItem()
  }, [id])

  const handleWishlist = () => {
    toast({
      title: "Added to Wishlist!",
      description: `${item.title} has been added to your wishlist.`,
    })
  }

  const handleSwapRequest = () => {
    toast({
      title: "Swap Request Sent!",
      description: `Your request for ${item.title} has been sent to ${item.user.name}.`,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-off-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-electric-violet/30 border-t-electric-violet"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-off-white text-red-500 text-lg">
        {error}
        <Link to="/browse">
          <Button variant="link">Go back to browse</Button>
        </Link>
      </div>
    )
  }

  if (!item) {
    return null // Should not happen if error is handled
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <div className="bg-off-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-sm bg-off-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/browse">
                <Button variant="ghost" size="sm" className="hover:bg-soft-lilac-gray">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Browse
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-charcoal-black">{item.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image Carousel */}
        <div className="lg:col-span-2 animate-fade-in">
          <Card className="overflow-hidden border-soft-lilac-gray shadow-sm">
            <CardContent className="p-0">
              <Carousel className="w-full">
                <CarouselContent>
                  {item.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${item.title} image ${index + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-[400px] md:h-[600px] object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="ml-4" />
                <CarouselNext className="mr-4" />
              </Carousel>
            </CardContent>
          </Card>
        </div>

        {/* Item Details */}
        <div className="lg:col-span-1 space-y-6 animate-fade-in-right">
          <Card className="border-soft-lilac-gray shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-3xl font-bold text-charcoal-black">{item.title}</h2>
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-electric-violet" />
                <span className="text-2xl font-semibold text-electric-violet">{item.points} Points</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Category:</span>
                  <span>{item.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Ruler className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Size:</span>
                  <span>{item.size}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Condition:</span>
                  <span>{item.condition}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Posted:</span>
                  <span>{new Date(item.postedDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-soft-lilac-gray text-charcoal-black">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-3 mt-6">
                <Button
                  className="flex-1 bg-electric-violet hover:bg-electric-violet-dark text-off-white py-3 text-lg"
                  onClick={handleSwapRequest}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Request Swap
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 bg-transparent" onClick={handleWishlist}>
                  <Heart className="h-6 w-6 text-electric-violet" />
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 bg-transparent">
                  <Share2 className="h-6 w-6 text-gray-600" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Seller Information */}
          <Card className="border-soft-lilac-gray shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-charcoal-black" />
                <span>About the Seller</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4 p-6">
              <img
                src={item.user.avatar || "/placeholder.svg"}
                alt={item.user.name}
                width={60}
                height={60}
                className="w-16 h-16 rounded-full object-cover border-2 border-soft-lilac-gray"
              />
              <div>
                <h4 className="font-semibold text-lg text-charcoal-black">{item.user.name}</h4>
                <p className="text-sm text-gray-600">
                  Rating: {item.user.rating} / 5 ({item.user.listings} listings)
                </p>
                <Link to={`/user/${item.user.id}`}>
                  <Button variant="link" className="p-0 h-auto text-electric-violet">
                    View Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ItemPage
