import RsvpForm from '@/components/events/rsvpForm'
import React from 'react'

const page = async ({ params }: any) => {
    const { id } = await params;
    return (
        <div className='flex justify-center items-center h-screen'>
            <RsvpForm id={id} />
        </div>
    )
}

export default page