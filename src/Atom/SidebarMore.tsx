import React from 'react'

const SidebarMore = () => {
    const liClass = "py-4 hover:bg-zinc-200 cursor-pointer px-2 rounded-lg " 
  return (
    <div className='w-60 py-2'>
        <ul>
            <li  className={liClass}>Setting</li>
            <li className={liClass}>Saved</li>
            <li className={liClass}>Switch appearance</li>
            <li className={liClass}>Switch accounts</li>
            <li className={liClass}>Log Out</li>
        </ul>
    </div>
  )
}

export default SidebarMore