import React from 'react'
import { Button } from '../ui/button'
import { Home, PlusCircle, Search, Compass } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const MobileViewSidebar = () => {
  return (
    <footer className="flex justify-around items-center p-4 border-t">
        <Button variant="ghost" size="icon">
          <Home className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Search className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <PlusCircle className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Compass className="h-6 w-6" />
        </Button>
        <Avatar className="w-6 h-6">
          <AvatarImage src="https://i.pravatar.cc/128?img=69" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </footer>
  )
}

export default MobileViewSidebar