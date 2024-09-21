import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Home, Search, Compass, Camera, Heart, MessageCircle, Bookmark, Send, PlusSquare, Menu } from "lucide-react"

export default function Component() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white flex flex-col">
        <div className="p-4 border-b">
          <svg
            className="w-28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 6.5H17.51M7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2ZM16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7616 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Compass className="mr-2 h-4 w-4" />
            Explore
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Camera className="mr-2 h-4 w-4" />
            Reels
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <MessageCircle className="mr-2 h-4 w-4" />
            Messages
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Heart className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <PlusSquare className="mr-2 h-4 w-4" />
            Create
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Avatar className="w-4 h-4 mr-2">
              <AvatarImage src="https://i.pravatar.cc/128?img=69" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            Profile
          </Button>
        </nav>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start">
            <Menu className="mr-2 h-4 w-4" />
            More
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto py-8">
          {/* Stories */}
          <ScrollArea className="w-full border rounded-lg mb-8 bg-white">
            <div className="flex p-4 space-x-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex flex-col items-center space-y-1">
                  <Avatar className="w-16 h-16 border-2 border-pink-500 p-1">
                    <AvatarImage src={`https://i.pravatar.cc/128?img=${i + 1}`} alt={`User ${i + 1}`} />
                    <AvatarFallback>U{i + 1}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs">User {i + 1}</span>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* Posts */}
          <div className="space-y-8">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="bg-white">
                <CardHeader className="flex flex-row items-center space-x-4 p-4">
                  <Avatar>
                    <AvatarImage src={`https://i.pravatar.cc/128?img=${i + 20}`} alt={`Post User ${i + 1}`} />
                    <AvatarFallback>P{i + 1}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">post_user_{i + 1}</p>
                    <p className="text-xs text-gray-500">Location {i + 1}</p>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <img
                    src={`https://picsum.photos/seed/${i + 1}/600/600`}
                    alt={`Post ${i + 1}`}
                    className="w-full h-auto"
                  />
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 p-4">
                  <div className="flex justify-between w-full">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Heart className="h-6 w-6" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MessageCircle className="h-6 w-6" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Send className="h-6 w-6" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Bookmark className="h-6 w-6" />
                    </Button>
                  </div>
                  <p className="text-sm font-semibold">{Math.floor(Math.random() * 1000)} likes</p>
                  <p className="text-sm">
                    <span className="font-semibold">post_user_{i + 1}</span> This is a sample caption for post {i + 1}. 
                    #instagram #layout
                  </p>
                  <p className="text-sm text-gray-500">View all {Math.floor(Math.random() * 100)} comments</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}