"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Package, CheckCircle, XCircle, ArrowLeft, AlertTriangle, TrendingUp, Flag, Eye } from "lucide-react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

const pendingItems = [
  {
    id: 1,
    title: "Vintage Band T-Shirt",
    user: "John D.",
    category: "Tops",
    condition: "Good",
    points: 25,
    image: "/placeholder.svg?height=100&width=100",
    submittedDate: "2024-01-16",
    status: "pending",
  },
  {
    id: 2,
    title: "Designer Handbag",
    user: "Emma K.",
    category: "Accessories",
    condition: "Excellent",
    points: 80,
    image: "/placeholder.svg?height=100&width=100",
    submittedDate: "2024-01-15",
    status: "pending",
  },
]

const reportedItems = [
  {
    id: 3,
    title: "Suspicious Listing",
    user: "Unknown User",
    reason: "Inappropriate content",
    reportedBy: "Sarah M.",
    reportDate: "2024-01-14",
    image: "/placeholder.svg?height=100&width=100",
  },
]

const stats = [
  { label: "Total Users", value: "3,247", change: "+12%", icon: Users },
  { label: "Active Listings", value: "1,856", change: "+8%", icon: Package },
  { label: "Pending Reviews", value: "23", change: "-5%", icon: AlertTriangle },
  { label: "Monthly Growth", value: "15.3%", change: "+2.1%", icon: TrendingUp },
]

const AdminPage = () => {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  const handleApprove = (itemId) => {
    toast({
      title: "Item Approved",
      description: "The item has been approved and is now live on the platform.",
    })
  }

  const handleReject = (itemId) => {
    toast({
      title: "Item Rejected",
      description: "The item has been rejected and the user has been notified.",
      variant: "destructive",
    })
  }

  const handleRemoveReported = (itemId) => {
    toast({
      title: "Item Removed",
      description: "The reported item has been removed from the platform.",
      variant: "destructive",
    })
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <div className="bg-off-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-charcoal-black">Admin Panel</h1>
            </div>
            <Badge variant="outline" className="bg-sunset-coral/10 text-sunset-coral border-sunset-coral/30">
              Admin Access
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-charcoal-black">{stat.value}</p>
                  </div>
                  <div className="bg-electric-violet/10 rounded-full p-3">
                    <stat.icon className="h-6 w-6 text-electric-violet" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-mint-green mr-1" />
                  <span className="text-mint-green">{stat.change} from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pending">Pending Items ({pendingItems.length})</TabsTrigger>
            <TabsTrigger value="reported">Reported Items ({reportedItems.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-mint-green/10 rounded-lg">
                    <div className="bg-mint-green rounded-full p-2">
                      <CheckCircle className="h-4 w-4 text-off-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">5 items approved today</p>
                      <p className="text-xs text-gray-600">Last approval 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-sunset-coral/10 rounded-lg">
                    <div className="bg-sunset-coral rounded-full p-2">
                      <XCircle className="h-4 w-4 text-off-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">2 items rejected today</p>
                      <p className="text-xs text-gray-600">Last rejection 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-neon-yellow/10 rounded-lg">
                    <div className="bg-neon-yellow rounded-full p-2">
                      <Flag className="h-4 w-4 text-charcoal-black" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">1 new report received</p>
                      <p className="text-xs text-gray-600">Needs review</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" onClick={() => setActiveTab("pending")}>
                    <Package className="h-4 w-4 mr-2" />
                    Review Pending Items
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => setActiveTab("reported")}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Handle Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Items Pending Approval</h3>
              <Badge variant="outline">{pendingItems.length} items</Badge>
            </div>

            <div className="space-y-4">
              {pendingItems.map((item) => (
                <Card key={item.id} className="animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span>by {item.user}</span>
                          <span>{item.category}</span>
                          <span>{item.condition}</span>
                          <span className="font-medium text-electric-violet">{item.points} pts</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Submitted on {new Date(item.submittedDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          className="bg-mint-green hover:bg-mint-green/90"
                          onClick={() => handleApprove(item.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleReject(item.id)}>
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reported" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Reported Items</h3>
              <Badge variant="destructive">{reportedItems.length} reports</Badge>
            </div>

            <div className="space-y-4">
              {reportedItems.map((item) => (
                <Card key={item.id} className="border-sunset-coral/30 animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span>by {item.user}</span>
                          <Badge variant="destructive" className="text-xs">
                            {item.reason}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Reported by {item.reportedBy} on {new Date(item.reportDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Investigate
                        </Button>
                        <Button variant="outline" size="sm">
                          Dismiss
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleRemoveReported(item.id)}>
                          <XCircle className="h-4 w-4 mr-1" />
                          Remove Item
                        </Button>
                      </div>
                    </div>
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

export default AdminPage
