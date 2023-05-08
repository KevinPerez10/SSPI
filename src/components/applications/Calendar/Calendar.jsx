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
    
    //FULLCALENDAR FUNCTIONS
    // const eventsList = {
    //     title: 'Event 1',
    //     start: '2023-05-05T10:00:00',
    //     end: '2023-05-05T12:00:00'
    // }

    // const eventsList = 
    //     {
    //         title: 'Event 1',
    //         start: '2023-05-05T10:00:00',
    //         end: '2023-05-05T12:00:00'
    //     }

    // const addEvent = async (event) => {
    //     try {
    //         await addDoc(collection(db, 'events'), {
    //             title: event.title,
    //             start: event.start,
    //             end: event.end,
    //             createdBy: auth.currentUser.uid
    //         })
    //         console.log('Event added successfully!')
    //     } catch (e) {
    //         console.error('Error adding document: ', e)
    //     }
    // }

    // addEvent(eventsList)
    //     .then(() => {
    //         console.log('Event added!')
    //     })
    //     .catch((error) => {
    //         console.error('Error adding event: ', error)
    //     })

    //Modal functions
    const [openModal, setOpenModal] = useState(false)
    const handleOpen = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)

    const [meetPlat, setMeetPlat] = useState('')
    const handleMeetPlat = (event) => {
        setMeetPlat(event.target.value)
    }

    return (
        <div className='w-full h-full text-gray-800 p-5'>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                headerToolbar={{
                    start: 'today,dayGridMonth,dayGridWeek,dayGridDay', // will normally be on the left. if RTL, will be on the right
                    center: 'title',
                    end: 'prev,next' // will normally be on the right. if RTL, will be on the left
                }}
                // events={eventsList}
                weekends={true}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={handleOpen}
                // eventChange={}
                // eventClick={}
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
