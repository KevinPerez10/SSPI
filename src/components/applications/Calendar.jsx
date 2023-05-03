import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import '../../App.css'

export default function Calendar() {
    const handleDateClick = (arg) => {
        console.log('boom')
    };

    

    return (
        <div className='w-full px-5 sm:mt-10'>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                handleDateClick={handleDateClick}
                headerToolbar={{
                    start: 'title', // will normally be on the left. if RTL, will be on the right
                    center: 'today',
                    end: 'prev,next' // will normally be on the right. if RTL, will be on the left
                }}
            />
        </div>
    )
}
