import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Heart, MessageCircle, Send, MoreHorizontal } from "lucide-react"

export default function PostCard() {
  const [likes, setLikes] = useState(42)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
      setIsLiked(false)
    } else {
      setLikes(likes + 1)
      setIsLiked(true)
    }
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader className="flex flex-row items-center space-x-4 p-4">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1518082593638-b6e73b35d39a?q=80&w=2992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="@johndoe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">johndoe</p>
          <p className="text-xs text-muted-foreground">New York, NY</p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <img
          src="https://images.unsplash.com/photo-1530042051674-e9bbd204ccb7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8"
          alt="Post image"
          className="w-full h-auto"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 space-y-4">
        <div className="flex items-center space-x-4 w-full">
          <Button variant="ghost" size="icon" onClick={handleLike}>
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <div className="space-y-1 w-full">
          <p className="text-sm font-medium">{likes} likes</p>
          <p className="text-sm">
            <span className="font-medium">johndoe</span> Beautiful sunset at the beach! 🌅 #summer #vacation
          </p>
          <p className="text-sm text-muted-foreground">View all 3 comments</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">janedoe</span> Looks amazing! 😍
            </p>
            <p className="text-sm">
              <span className="font-medium">bobsmith</span> Wish I was there!
            </p>
          </div>
          <p className="text-xs text-muted-foreground">2 HOURS AGO</p>
        </div>
      </CardFooter>
    </Card>
  )
}