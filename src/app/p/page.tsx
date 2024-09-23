"use client";

import { PrimaryDialog } from '@/components/PrimaryDialog';
import React from 'react'

const menus = [
    {
        id : "1",
        title : "Delete",
        onClick : () => {
            alert("delete clicked")
        },
    },
    {
        id : "2",
        title : "Hide like count to others",
        onClick : () => {
            alert("hide like count to others clicked")
        },
    },
    {
        id : "3",
        title : "Turn off commenting" ,
        onClick : () => {
            alert("turn off commenting clicked")
        }
    },
    {
        id : "4",
        title : "Copy link",
        onClick : () => {
            alert("copy link clicked")
        },
    },
    {
        id : "5",
        title : "Cancle",
        onClick : () => {
            alert("cancle clicked")
        }
    }
]


const Page = () => {
  return (
    <div>
        {menus.map((item) => {
            return (
                <p key={item.id} onClick={item.onClick} className='cursor-pointer text-center text-sm font-medium border-t py-2 md:w-52'>{item.title}</p>
            )
        })}
    </div>
  )
}

export default Page