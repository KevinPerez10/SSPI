import React from 'react'
import Calendar from '../applications/Calendar/Calendar'

export default function Home() {
    return (
        <div className='w-full h-full flex sm:flex-row flex-col sm:justify-center overflow-hidden'>
            <aside className='sm:w-1/4 border-2'>
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
            <section className='w-full flex flex-col items-center bg-slate-50 sm:rounded-2xl sm:m-5 sm:shadow-lg overflow-auto'>
                <Calendar/>
            </section>
        </div>
    )
}
