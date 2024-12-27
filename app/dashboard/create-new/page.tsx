'use client'
import React, { useState } from 'react'
import SelectTopic from './_component/SelectTopic'
import SelectStyle from './_component/SelectStyle'
import SelectDuration from './_component/SelectDuration'
import { Button } from '@/components/ui/button'

type HandleInputChange=(fieldName:string,fieldValue:string)=>void

function CreateNew() {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const onHandleInputChange:HandleInputChange=(fieldName,fieldValue)=>{
        setFormData(perv=>({
            ...perv,
            [fieldName]:fieldValue
        }))
    }
  return (
    <div className='md:px-20'>
        <h2 className='font-bold text-primary text-center text-4xl'>
            Create New
        </h2>
        <div>
            {/* select topic */}
                <SelectTopic onUserSelect={onHandleInputChange}/>
            {/* select style */}
                <SelectStyle onUserSelect={onHandleInputChange}/>
            {/* Duration */}
                <SelectDuration onUserSelect={onHandleInputChange}/>
            {/* Create button */}
        </div>
        <Button className='w-full mt-10'>Create Short Video</Button>
    </div>
  )
}

export default CreateNew