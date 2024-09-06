"use client"
import { Button } from '@/components/ui/button'
import { useSocket } from '@/lib/SocketProvider'
import React from 'react'

const Page = () => {
  const {sendFollow} = useSocket()
  return (
    <div>
      <div>
        <h1>All Messages will apear here</h1>
      </div>
      <div>
        <Button onClick={() => sendFollow("utpal", "kancahn")}>Follow</Button>
      </div>
    </div>
  )
}

export default Page