"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Send, Search, Paperclip, Smile } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { MessageSquare } from "lucide-react" // Import MessageSquare

const mockConversations = [
  {
    id: "c1",
    user: {
      id: "u1",
      name: "Alice Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "Sounds good! When can you ship?",
    lastMessageTime: "2h ago",
    unread: true,
    messages: [
      {
        id: "m1",
        sender: "u1",
        text: "Hi! I'm interested in your vintage denim jacket.",
        time: "2024-07-10T10:00:00Z",
      },
      {
        id: "m2",
        sender: "me",
        text: "Great! It's still available. Do you have any questions?",
        time: "2024-07-10T10:05:00Z",
      },
      { id: "m3", sender: "u1", text: "What's the exact chest measurement?", time: "2024-07-10T10:10:00Z" },
      {
        id: "m4",
        sender: "me",
        text: "It's 22 inches flat. Let me know if you need more details.",
        time: "2024-07-10T10:15:00Z",
      },
      { id: "m5", sender: "u1", text: "Sounds good! When can you ship?", time: "2024-07-10T10:20:00Z" },
    ],
  },
  {
    id: "c2",
    user: {
      id: "u2",
      name: "Bob Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "Thanks for the dress!",
    lastMessageTime: "1d ago",
    unread: false,
    messages: [
      { id: "m6", sender: "u2", text: "Received the dress today, it's perfect!", time: "2024-07-09T15:00:00Z" },
      { id: "m7", sender: "me", text: "Glad to hear it! Enjoy!", time: "2024-07-09T15:05:00Z" },
    ],
  },
  {
    id: "c3",
    user: {
      id: "u3",
      name: "Charlie Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "Is the sweater still available?",
    lastMessageTime: "3d ago",
    unread: false,
    messages: [
      { id: "m8", sender: "u3", text: "Hi, is the striped sweater still available?", time: "2024-07-07T09:00:00Z" },
    ],
  },
]

const MessagesPage = () => {
  const { user: currentUser } = useAuth()
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messageInput, setMessageInput] = useState("")
  const [conversations, setConversations] = useState(mockConversations)

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      const newMessage = {
        id: `m${selectedConversation.messages.length + 1}`,
        sender: "me", // Assuming "me" is the current user
        text: messageInput.trim(),
        time: new Date().toISOString(),
      }

      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === selectedConversation.id
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
                lastMessage: newMessage.text,
                lastMessageTime: "Just now",
              }
            : conv,
        ),
      )
      setSelectedConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
        lastMessage: newMessage.text,
        lastMessageTime: "Just now",
      }))
      setMessageInput("")
    }
  }

  const formatMessageTime = (isoString) => {
    const date = new Date(isoString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMinutes = Math.round(diffMs / (1000 * 60))
    const diffHours = Math.round(diffMs / (1000 * 60 * 60))
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

    if (diffMinutes < 1) return "Just now"
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-off-white flex flex-col">
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
              <h1 className="text-2xl font-bold text-charcoal-black">Messages</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-6">
        {/* Conversation List (Desktop & Mobile) */}
        <Card
          className={`flex-shrink-0 w-full md:w-80 border-soft-lilac-gray shadow-sm ${
            selectedConversation ? "hidden md:flex flex-col" : "flex flex-col"
          }`}
        >
          <CardContent className="p-0 flex flex-col flex-1">
            <div className="p-4 border-b border-soft-lilac-gray">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-soft-lilac-gray border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`flex items-center space-x-3 p-4 border-b border-soft-lilac-gray cursor-pointer hover:bg-soft-lilac-gray/50 transition-colors ${
                    selectedConversation?.id === conv.id ? "bg-soft-lilac-gray/70" : ""
                  }`}
                  onClick={() => setSelectedConversation(conv)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conv.user.avatar || "/placeholder.svg"} alt={conv.user.name} />
                    <AvatarFallback>{conv.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-charcoal-black">{conv.user.name}</h3>
                      <span className="text-xs text-gray-500">{conv.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread && <span className="w-2 h-2 bg-electric-violet rounded-full flex-shrink-0"></span>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Pane */}
        <Card
          className={`flex-1 flex flex-col border-soft-lilac-gray shadow-sm ${
            selectedConversation ? "flex" : "hidden md:flex"
          }`}
        >
          {selectedConversation ? (
            <>
              {/* CardHeader is not defined in the existing code, so it's added here */}
              <div className="flex flex-row items-center space-x-3 p-4 border-b border-soft-lilac-gray">
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedConversation(null)}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={selectedConversation.user.avatar || "/placeholder.svg"}
                    alt={selectedConversation.user.name}
                  />
                  <AvatarFallback>{selectedConversation.user.name[0]}</AvatarFallback>
                </Avatar>
                <h2 className="font-bold text-lg text-charcoal-black flex-1">{selectedConversation.user.name}</h2>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
              <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender === "me"
                          ? "bg-electric-violet text-off-white rounded-br-none"
                          : "bg-soft-lilac-gray text-charcoal-black rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span
                        className={`block mt-1 text-xs ${
                          message.sender === "me" ? "text-off-white/80" : "text-gray-500"
                        }`}
                      >
                        {formatMessageTime(message.time)}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="p-4 border-t border-soft-lilac-gray flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5 text-gray-600" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5 text-gray-600" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  className="flex-1 h-12 rounded-full bg-soft-lilac-gray border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full bg-electric-violet hover:bg-electric-violet-dark"
                  onClick={handleSendMessage}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <MessageSquare className="h-20 w-20 mb-4" />
              <p className="text-lg">Select a conversation to start chatting</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default MessagesPage
