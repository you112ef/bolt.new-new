import ChatViewStatic from '@/app/components/ChatViewStatic'
import CodeViewStatic from '@/app/components/CodeViewStatic'
import React from 'react'

// Generate static params for static export
export async function generateStaticParams() {
  // Generate some common workspace IDs for static export
  return [
    { id: 'default' },
    { id: 'demo' },
    { id: 'example' }
  ]
}

const Workspace = () => {
  return (
   <div className='p-10'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-7'>
            <ChatViewStatic/>
            <div className='col-span-2'>
            <CodeViewStatic/>
            </div>
        </div>
   </div>
  )
}

export default Workspace