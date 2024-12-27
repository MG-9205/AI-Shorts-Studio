import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
function Header() {
  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md fixed w-full z-10 bg-white top-0'>
        <div className='flex gap-3 items-center'>
            <Image
            src={'/logo.svg'}
            alt='logo'
            height={40}
            width={40}
            />
            <h2 className='font-bold text-xl'>
                Ai Shorts Studio
            </h2>
        </div>
        <div className='flex gap-3 items-center'>
            <Button className=" rounded-md text-white">Dashboard</Button>
            <UserButton/>
        </div>
    </div>
  )
}

export default Header