import React from 'react'
import Link from 'next/link'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <h1 className='text-2xl font-bold'>Documents Page</h1>
        <p className='mt-4'>This is the documents page.</p>
        <Link href='/documents/123' className='underline'>Go to 123 document</Link>
    </div>
  )
}

export default Home