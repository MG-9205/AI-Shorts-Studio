import React from 'react'
import { Button } from '@/components/ui/button'

function EmptyState() {
  return (
    <div className='p-5 py-24 flex items-center flex-col mt-10 border-2 border-dashed'>
        <h2 className='pb-4'>You don't have any short vedio created</h2>
        <Button>Create New Short Video</Button>
    </div>
  )
}

export default EmptyState