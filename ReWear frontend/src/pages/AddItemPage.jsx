"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, Camera, Plus, Sparkles, X } from "lucide-react"
import { Link } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

const categories = ["Tops", "Dresses", "Pants", "Shoes", "Outerwear", "Accessories"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "6", "7", "8", "9", "10", "11", "12"]
const conditions = ["Like New", "Excellent", "Good", "Fair"]

const AddItemPage = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    size: "",
    condition: "",
    points: "",
    tags: [],
  })
  const [images, setImages] = useState([])
  const [currentTag, setCurrentTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = (e) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages].slice(0, 5)) // Max 5 images
    }
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()],
      })
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Item Listed Successfully!",
      description: "Your item has been submitted for review and will be live soon.",
    })

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      brand: "",
      size: "",
      condition: "",
      points: "",
      tags: [],
    })
    setImages([])
    setIsSubmitting(false)
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
              <h1 className="text-2xl font-bold text-charcoal-black">List New Item</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Images Upload */}
          <Card className="animate-fade-in bg-off-white border-soft-lilac-gray shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5 text-mint-green" />
                <span>Photos</span>
              </CardTitle>
              <p className="text-sm text-gray-600">Add up to 5 high-quality photos of your item</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover rounded-lg border-2 border-soft-lilac-gray"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}

                {images.length < 5 && (
                  <label className="aspect-square border-2 border-dashed border-soft-lilac-gray rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-mint-green hover:bg-mint-green/10 transition-all duration-200 group">
                    <Upload className="h-8 w-8 text-gray-600 group-hover:text-mint-green mb-2" />
                    <span className="text-sm text-gray-600 group-hover:text-mint-green font-medium">Add Photo</span>
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card className="animate-slide-up bg-off-white border-soft-lilac-gray shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-electric-violet" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold text-charcoal-black">
                    Item Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Vintage Denim Jacket"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="h-12 border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand" className="text-sm font-semibold text-charcoal-black">
                    Brand
                  </Label>
                  <Input
                    id="brand"
                    placeholder="e.g., Levi's, Zara, H&M"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="h-12 border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold text-charcoal-black">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item's condition, style, and any special features..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet"
                />
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card
            className="animate-slide-up bg-off-white border-soft-lilac-gray shadow-sm"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-charcoal-black">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="h-12 border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-charcoal-black">Size *</Label>
                  <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
                    <SelectTrigger className="h-12 border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-charcoal-black">Condition *</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) => setFormData({ ...formData, condition: value })}
                  >
                    <SelectTrigger className="h-12 border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet">
                      <SelectValue placeholder="Select condition" />
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="points" className="text-sm font-semibold text-charcoal-black">
                  Points Value *
                </Label>
                <Input
                  id="points"
                  type="number"
                  placeholder="e.g., 45"
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                  required
                  className="h-12 border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet"
                />
                <p className="text-sm text-gray-600 bg-soft-lilac-gray/50 p-3 rounded-lg">
                  💡 <strong>Tip:</strong> Set the point value based on condition and brand (typically 20-80 points)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card
            className="animate-slide-up bg-off-white border-soft-lilac-gray shadow-sm"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <p className="text-sm text-gray-600">Add tags to help others find your item</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a tag..."
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  className="h-12 border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet"
                />
                <Button
                  type="button"
                  onClick={addTag}
                  variant="outline"
                  className="h-12 px-4 bg-off-white border-soft-lilac-gray hover:bg-soft-lilac-gray"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center space-x-1 bg-mint-green/10 text-mint-green hover:bg-mint-green/20"
                    >
                      <span>#{tag}</span>
                      <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-sunset-coral">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4 pt-6">
            <Link to="/">
              <Button
                type="button"
                variant="outline"
                className="bg-off-white border-soft-lilac-gray hover:bg-soft-lilac-gray"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[140px] bg-electric-violet hover:bg-electric-violet-dark text-off-white shadow-lg"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-off-white border-t-transparent"></div>
                  <span>Listing...</span>
                </div>
              ) : (
                <span className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>List Item</span>
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddItemPage
