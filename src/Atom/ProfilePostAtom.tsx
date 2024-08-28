import { User } from '@/model/User'
import React from 'react'


const ProfilePostAtom = ({user} : {user : User}) => {
  const Post = user.posts
  console.log("post", Post);
  return (
    <div>ProfilePostAtom</div>
  )
}

export default ProfilePostAtom