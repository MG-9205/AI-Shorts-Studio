import React from 'react'
import Header from './_component/Header'
import SideNav from './_component/SideNav'

interface dashboardLayoutProps {
    children: React.ReactNode
}

function dashboardLayout({children}:dashboardLayoutProps) {
  return (
    <div>
        <div className=' hidden md:block fixed h-screen mt-[65px] w-64'>
            <SideNav/>
        </div>
        <div className='pt-[65px]'>
            <Header/>
            <div className='md:ml-64 p-10'>
            {children}
            </div>
        </div>
    </div>
  )
}

export default dashboardLayout