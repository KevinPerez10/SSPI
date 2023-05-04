import React, {useState} from 'react'
import dayjs from 'dayjs'

//material ui
import {
    Modal,
    Box, 
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

//fullcalendar
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import '../../../App.css'

export default function Calendar() {
    
    //fullcalendar functions
    const [events, setEvents] = useState([
        {
            id: '1',
            title: 'Event 1',
            start: '2023-05-05T10:00:00',
            end: '2023-05-05T12:00:00'
        },
        {
            id: '2',
            title: 'Event 2',
            start: '2023-05-05T14:00:00',
            end: '2023-05-05T16:00:00'
        },
    ])

    const handleEventAdd = ({ newEvent }) => {
        setEvents([...events, newEvent])
    }

    const handleEventChange = ({ event }) => {
        const index = events.findIndex((e) => e.id === event.id)
        const newEvents = [...events]
        newEvents[index] = event
        setEvents(newEvents)
    }

    const handleEventDelete = ({ event }) => {
        const index = events.findIndex((e) => e.id === event.id);
        const newEvents = [...events];
        newEvents.splice(index, 1);
        setEvents(newEvents);
    };

    //Modal functions
    const [openModal, setOpenModal] = useState(false)
    const handleOpen = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const [meetPlat, setMeetPlat] = useState('')
    const handleMeetPlat = (event) => {
        setMeetPlat(event.target.value)
    }

    return (
        <div className='w-full h-full px-5 mt-10'>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                headerToolbar={{
                    start: 'today,dayGridDay,dayGridWeek,dayGridMonth', // will normally be on the left. if RTL, will be on the right
                    center: 'title',
                    end: 'prev,next' // will normally be on the right. if RTL, will be on the left
                }}
                events={events}
                weekends={true}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                // select={(start, end) => {
                //     const title = window.prompt('Event Title')
                //     if (title) {
                //         const newEvent = {
                //             title,
                //             start,
                //             end
                //         }
                //         try {
                //             console.log('New event:', newEvent)
                //             handleEventAdd(newEvent)
                //             // console.log('added successfully')
                //         } catch (error) {
                //             console.error('Failed to add new event:', error)
                //         }
                //     }
                // }}
                select={handleOpen}
                eventChange={handleEventChange}
                eventClick={handleEventDelete}
            />

            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 bg-white rounded-lg shadow-lg p-5 flex flex-col justify-center gap-3'>
                    <div className='flex flex-col gap-5'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Event:
                        </Typography>
                        <TextField id="outlined-basic" label="Title" variant="outlined" />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Meeting Platform</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={meetPlat}
                                label="Meeting Platform"
                                onChange={handleMeetPlat}
                            >
                                <MenuItem value={'Zoom wow'}>Zoom</MenuItem>
                                <MenuItem value={'Google Meet'}>Google Meet</MenuItem>
                                <MenuItem value={'Microsoft Teams'}>Microsoft Teams</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className='flex justify-around sm:flex-row flex-col gap-3'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker className='sm:w-1/2' defaultValue={dayjs(new Date())} />
                            <TimePicker className='sm:w-1/2' defaultValue={dayjs(new Date())} />
                        </LocalizationProvider>
                    </div>
                    
                </Box>
            </Modal>
        </div>
    )
}
