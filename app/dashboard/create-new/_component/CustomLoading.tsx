import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
  
interface CustomLoadingPropsType{
    loading:boolean
}

function CustomLoading({loading}:CustomLoadingPropsType) {
  return (
    <AlertDialog open={loading}>
    <AlertDialogContent className='bg-white'>
    <AlertDialogTitle className='hidden'>Are you sure?</AlertDialogTitle>
        <div className='flex flex-col items-center justify-center my-10'>
            <Image src={'/progress.gif'} alt='...loading' height={100} width={100}/>
            <h2>Generating your video donot Refresh..</h2>
        </div>
    </AlertDialogContent>
  </AlertDialog>
  
  )
}

export default CustomLoading