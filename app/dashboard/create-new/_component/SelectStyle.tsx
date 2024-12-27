'use client'
import Image from 'next/image'
import React, { useState } from 'react'
type OnUserSelectType = (fieldName: string, fieldValue: string) => void;

interface SelectTopicProps {
  onUserSelect: OnUserSelectType;
}

function SelectStyle({onUserSelect}:SelectTopicProps) {
    const styleOption=[
        {
            name:'Realistic',
            image:'/real.jpg'
        },
        {
            name:'Cartoon',
            image:'/cartoon.jpg'
        },
        {
            name:'Comic',
            image:'/comic.jpg'
        },
        {
            name:'GTA',
            image:'/gta.jpg'
        },
        {
            name:'Water Color',
            image:'/waterColor.jpg'
        }
    ]

    const [selectedOption, setSelectedOption] = useState<String>();
  return (
    <div className='mt-7'>
        <h2 className="font-bold text-2xl text-primary">Style</h2>
        <p className="text-gray-500">Select your video style</p>
        <div
        className='grid grid-cols-2 md:grid-cols-3
        lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3
        '
        >
            {
                styleOption.map((item,index)=>(
                    <div className={`relative hover:scale-105 
                     transition-all cursor-pointer rounded-xl
                     ${selectedOption==item.name &&'border-4 border-primary'}
                    `} key={index}>
                        <Image src={item.image} alt='image' width={100} height={100}
                        className='h-48 object-cover rounded-lg w-full'
                        onClick={()=>{
                            setSelectedOption(item.name)
                            onUserSelect('imageStyle',item.name)
                        
                        }}
                        />
                        <h2
                        className=' absolute p-1 bg-black bottom-0 w-full text-white rounded-b-lg'
                        >{item.name}</h2>
                    </div>
                ))     

            }
        </div>
    </div>
  )
}

export default SelectStyle