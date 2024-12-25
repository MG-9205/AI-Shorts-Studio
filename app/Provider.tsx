'use client'
import { db } from '@/configs/db'
import { Users } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useEffect } from 'react'

interface providerProps {
    children : React.ReactNode;
}

function Provider({children}:providerProps) {
    const{user}=useUser();

    useEffect(()=>{
        user&&isNewUser();
    },[user])

    const isNewUser = async () => {
        const email = user?.primaryEmailAddress?.emailAddress!;
        const name = user?.fullName!;
        const imageUrl = user?.imageUrl!;
    
        const result = await db.select().from(Users).where(eq(Users.email, email));
    
        if (!result[0]) {
            await db.insert(Users).values({
                name,
                email,
                imageUrl,
            });
        }
    };
    

  return (
    <div>
        {children}
    </div>
  )
}

export default Provider