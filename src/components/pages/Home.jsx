import React from 'react'
import Calendar from '../applications/Calendar/Calendar'

export default function Home() {
    return (
        <div className='w-full h-full flex sm:flex-row flex-col sm:justify-center overflow-hidden'>
            <aside className='sm:w-1/4 bg-gray-800 m-2 p-2'>
                <div className='text-xl font-gilmer'>
                    Events:
                </div>
                <br />
                <ul>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque nulla necessitatibus dolor eius nemo aut culpa rerum tenetur deleniti hic.
                </ul>
            </aside>
            {/* <section className=''> */}
                <Calendar/>
            {/* </section> */}
        </div>
    )
}
