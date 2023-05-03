import React from 'react'
import Calendar from '../applications/Calendar'

export default function Home() {
    return (
        <div className='w-full h-full flex sm:flex-row flex-col sm:justify-center'>
            <aside className='sm:w-1/4 h-1/2 border-2'>
                <ul>
                    1
                </ul>
                <ul>
                    1
                </ul>
                <ul>
                    1
                </ul>
                <ul>
                    1
                </ul>
            </aside>
            <section className='w-full flex flex-col items-center bg-slate-50 rounded-2xl m-5 shadow-lg'>
                <Calendar/>
            </section>
        </div>
    )
}
