import React from 'react'
import Calendar from '../applications/Calendar/Calendar'

export default function Home() {
    return (
        <div className='md:w-4/5 w-full h-full flex sm:flex-row flex-col sm:justify-center overflow-hidden'>
            <aside className='sm:inline sm:w-1/4 hidden bg-gray-800 m-2 p-2'>
                <div className='text-xl font-gilmer'>
                    Events:
                </div>
                <br />
                <ul>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam sint porro earum, adipisci esse ipsam. Minima maxime molestias, sequi eaque perferendis, mollitia, expedita doloribus ut quia dolore amet praesentium soluta.
                </ul>
            </aside>
            <Calendar/>
        </div>
    )
}
