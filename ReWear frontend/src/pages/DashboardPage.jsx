"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Zap, Package, Heart, MessageSquare, PlusCircle, CheckCircle, Eye } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useState } from "react"

const mockUser = {
  id: "1",
  name: "Jane Doe",
  email: "jane.doe@example.com",
  avatar: "/placeholder.svg?height=80&width=80",
  points: 150,
  level: "Bronze",
  nextLevelPoints: 200,
  totalListings: 15,
  activeListings: 8,
  swapsCompleted: 5,
  rating: 4.7,
}

const mockListings = [
  {
    id: "l1",
    title: "Vintage Denim Jacket",
    image: "/placeholder.svg?height=100&width=100",
    status: "active",
    points: 60,
    views: 120,
    wishlists: 5,
    postedDate: "2024-06-15",
  },
  {
    id: "l2",
    title: "Boho Floral Maxi Dress",
    image: "/placeholder.svg?height=100&width=100",
    status: "pending",
    points: 75,
    views: 30,
    wishlists: 2,
    postedDate: "2024-07-01",
  },
  {
    id: "l3",
    title: "Striped Cotton Sweater",
    image: "/placeholder.svg?height=100&width=100",
    status: "swapped",
    points: 50,
    views: 80,
    wishlists: 3,
    postedDate: "2024-05-20",
  },
]

const mockActivity = [
  {
    id: "a1",
    type: "swap_completed",
    description: "Completed swap for 'Leather Boots'",
    date: "2024-07-10",
    points: "+70",
    icon: CheckCircle,
    color: "mint-green",
  },
  {
    id: "a2",
    type: "item_listed",
    description: "Listed 'Boho Floral Maxi Dress'",
    date: "2024-07-01",
    points: "+10",
    icon: PlusCircle,
    color: "electric-violet",
  },
  {
    id: "a3",
    type: "item_approved",
    description: "'Vintage Denim Jacket' approved",
    date: "2024-06-16",
    icon: CheckCircle,
    color: "mint-green",
  },
  {
    id: "a4",
    type: "swap_requested",
    description: "New swap request for 'Striped Sweater'",
    date: "2024-06-05",
    icon: MessageSquare,
    color: "cyan-blue",
  },
]

const DashboardPage = () => {
  const { user: authUser } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Use mockUser if authUser is null, otherwise use authUser
  const currentUser = authUser || mockUser

  const pointsToNextLevel = currentUser.nextLevelPoints - currentUser.points
  const progressPercentage = (currentUser.points / currentUser.nextLevelPoints) * 100

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
              <h1 className="text-2xl font-bold text-charcoal-black">My Dashboard</h1>
            </div>
            <Button className="bg-electric-violet hover:bg-electric-violet-dark text-off-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              List New Item
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile & Stats */}
        <Card className="mb-8 bg-white shadow-lg border-soft-lilac-gray animate-fade-in">
          <CardContent className="p-6 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-24 w-24 border-4 border-electric-violet shadow-md">
              <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
              <AvatarFallback className="text-4xl font-bold bg-electric-violet/20 text-electric-violet">
                {currentUser.name ? currentUser.name[0] : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-charcoal-black">{currentUser.name}</h2>
              <p className="text-gray-600 text-lg">{currentUser.email}</p>
              <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                <Zap className="h-5 w-5 text-electric-violet" />
                <span className="text-2xl font-bold text-electric-violet">{currentUser.points} Points</span>
                <Badge variant="outline" className="bg-mint-green/10 text-mint-green border-mint-green/30">
                  Level: {currentUser.level}
                </Badge>
              </div>
              <div className="mt-4 w-full max-w-md md:max-w-none">
                <p className="text-sm text-gray-600 mb-1">
                  Points to next level: {pointsToNextLevel} (Total: {currentUser.nextLevelPoints})
                </p>
                <Progress value={progressPercentage} className="w-full h-2 bg-soft-lilac-gray" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center md:text-right">
              <div className="flex flex-col items-center md:items-end">
                <span className="text-2xl font-bold text-charcoal-black">{currentUser.totalListings}</span>
                <span className="text-sm text-gray-600">Total Listings</span>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <span className="text-2xl font-bold text-charcoal-black">{currentUser.swapsCompleted}</span>
                <span className="text-sm text-gray-600">Swaps Completed</span>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <span className="text-2xl font-bold text-charcoal-black">{currentUser.rating}</span>
                <span className="text-sm text-gray-600">Rating</span>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <span className="text-2xl font-bold text-charcoal-black">{currentUser.activeListings}</span>
                <span className="text-sm text-gray-600">Active Listings</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Listings and Activity */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">My Listings ({mockListings.length})</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity ({mockActivity.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm border-soft-lilac-gray">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/add-item">
                    <Button className="w-full justify-start bg-electric-violet hover:bg-electric-violet-dark text-off-white">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      List a New Item
                    </Button>
                  </Link>
                  <Link to="/browse">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Package className="h-4 w-4 mr-2" />
                      Browse Items
                    </Button>
                  </Link>
                  <Link to="/messages">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      View Messages
                    </Button>
                  </Link>
                  <Link to="/wishlist">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Heart className="h-4 w-4 mr-2" />
                      My Wishlist
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-soft-lilac-gray">
                <CardHeader>
                  <CardTitle>Points Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Earned from listings:</span>
                    <span className="font-semibold text-mint-green">+250 pts</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Spent on swaps:</span>
                    <span className="font-semibold text-sunset-coral">-100 pts</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Referral bonus:</span>
                    <span className="font-semibold text-mint-green">+50 pts</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold border-t pt-4">
                    <span>Current Balance:</span>
                    <span className="text-electric-violet">{currentUser.points} pts</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <h3 className="text-lg font-semibold text-charcoal-black">My Listed Items</h3>
            <div className="space-y-4">
              {mockListings.map((item) => (
                <Card key={item.id} className="animate-fade-in bg-white shadow-sm border-soft-lilac-gray">
                  <CardContent className="p-4 flex items-center space-x-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-lg border border-soft-lilac-gray"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-charcoal-black">{item.title}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Zap className="h-4 w-4 text-electric-violet" />
                        <span>{item.points} pts</span>
                        <Eye className="h-4 w-4 ml-2" />
                        <span>{item.views} views</span>
                        <Heart className="h-4 w-4 ml-2" />
                        <span>{item.wishlists} wishlists</span>
                      </div>
                      <p className="text-sm text-gray-600">Posted: {new Date(item.postedDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge
                        className={`${
                          item.status === "active"
                            ? "bg-mint-green/10 text-mint-green"
                            : item.status === "pending"
                              ? "bg-neon-yellow/10 text-neon-yellow"
                              : "bg-soft-lilac-gray text-gray-600"
                        }`}
                      >
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                      <Link to={`/item/${item.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-off-white border-soft-lilac-gray hover:bg-soft-lilac-gray"
                        >
                          View
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <h3 className="text-lg font-semibold text-charcoal-black">Recent Activity</h3>
            <div className="space-y-4">
              {mockActivity.map((activity) => (
                <Card key={activity.id} className="animate-fade-in bg-white shadow-sm border-soft-lilac-gray">
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className={`p-3 rounded-full bg-${activity.color}/10`}>
                      <activity.icon className={`h-5 w-5 text-${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-charcoal-black">{activity.description}</p>
                      <p className="text-sm text-gray-600">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                    {activity.points && (
                      <span className={`font-bold text-${activity.color}`}>{activity.points} pts</span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default DashboardPage
