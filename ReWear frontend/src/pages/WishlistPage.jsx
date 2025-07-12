"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, XCircle, Zap, Tag, Ruler } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const initialWishlistItems = [
  {
    id: "w1",
    title: "Classic Leather Boots",
    image: "/placeholder.svg?height=150&width=150",
    brand: "Dr. Martens",
    size: "8",
    condition: "Good",
    points: 70,
  },
  {
    id: "w2",
    title: "Striped Cotton Sweater",
    image: "/placeholder.svg?height=150&width=150",
    brand: "Everlane",
    size: "S",
    condition: "Excellent",
    points: 55,
  },
  {
    id: "w3",
    title: "High-Waisted Jeans",
    image: "/placeholder.svg?height=150&width=150",
    brand: "Madewell",
    size: "28",
    condition: "Like New",
    points: 65,
  },
]

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)
  const { toast } = useToast()

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== itemId))
    toast({
      title: "Item Removed",
      description: "The item has been removed from your wishlist.",
      variant: "destructive",
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
              <h1 className="text-2xl font-bold text-charcoal-black">My Wishlist</h1>
            </div>
            <Badge variant="outline" className="bg-electric-violet/10 text-electric-violet border-electric-violet/30">
              {wishlistItems.length} Items
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wishlistItems.length === 0 ? (
          <Card className="text-center py-12 bg-white shadow-sm border-soft-lilac-gray">
            <CardContent className="space-y-4">
              <Heart className="h-16 w-16 text-gray-400 mx-auto" />
              <h2 className="text-2xl font-bold text-charcoal-black">Your Wishlist is Empty</h2>
              <p className="text-gray-600">Start browsing to add items you love to your wishlist!</p>
              <Link to="/browse">
                <Button className="bg-electric-violet hover:bg-electric-violet-dark text-off-white">
                  Browse Items
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="animate-fade-in bg-white shadow-sm border-soft-lilac-gray">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={150}
                      height={150}
                      className="w-24 h-24 object-cover rounded-lg border border-soft-lilac-gray"
                    />
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-lg text-charcoal-black">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.brand}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Ruler className="h-4 w-4" />
                        <span>Size: {item.size}</span>
                        <Tag className="h-4 w-4 ml-2" />
                        <span>Condition: {item.condition}</span>
                      </div>
                      <div className="flex items-center space-x-2 pt-1">
                        <Zap className="h-5 w-5 text-electric-violet" />
                        <span className="text-xl font-bold text-electric-violet">{item.points} pts</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-sunset-coral"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <XCircle className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Link to={`/item/${item.id}`}>
                      <Button
                        variant="outline"
                        className="bg-off-white border-soft-lilac-gray hover:bg-soft-lilac-gray"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistPage
