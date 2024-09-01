import React, { useState } from 'react'

const NotificationAtom = () => {
  console.log("notification");
  const [count, setCount] = useState<number>(0)
  return (
    <div>NotificationAtom</div>
  )
}

export default NotificationAtom