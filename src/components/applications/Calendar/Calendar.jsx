import React, {useEffect, useState} from 'react'
import dayjs from 'dayjs'
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    onSnapshot,
    writeBatch
} from 'firebase/firestore'
import {auth, db} from '../../../App'

//material ui
import {
    Modal,
    Button,
    Snackbar,
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
// import { TimePicker } from '@mui/x-date-pickers/TimePicker'

//fullcalendar
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'

//syncfusion
import { registerLicense } from '@syncfusion/ej2-base'
import {
    ScheduleComponent,
    ViewsDirective,
    ViewDirective,
    Day,
    Week,
    WorkWeek,
    Month,
    Agenda,
    Inject,
    Resize,
    DragAndDrop
} from '@syncfusion/ej2-react-schedule'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'


import '../../../App.css'
import { addContextMenuItems } from '@syncfusion/ej2/spreadsheet'

registerLicense('Mgo+DSMBaFt+QHJqVk1hXk5Hd0BLVGpAblJ3T2ZQdVt5ZDU7a15RRnVfR1xiSX9QfkFjWnxdcQ==;Mgo+DSMBPh8sVXJ1S0R+X1pFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jTH9SdkRgUXtec3JVRw==;ORg4AjUWIQA/Gnt2VFhiQlJPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXtSd0ViWndacHddRmE=;MjAwMzU5N0AzMjMxMmUzMjJlMzNqQmRoOERPUnRSWS9sMlpHUHg5Q1VQRkdwV2k0QUxjcmlQVzVQUDRyTVBJPQ==;MjAwMzU5OEAzMjMxMmUzMjJlMzNFYy9acUFxM2ZlVGZJbjIya1lOU1libnVYM3VScEZhUWZtcGhqZWlSb1FFPQ==;NRAiBiAaIQQuGjN/V0d+Xk9HfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5Wd0RjWHxWdHRQRmZd;MjAwMzYwMEAzMjMxMmUzMjJlMzNaekJ5dVV4NmZCcnFuVkZ4V0h6T1hhbVVVNUtRcnE0MTg5N1pKRDJXU0JnPQ==;MjAwMzYwMUAzMjMxMmUzMjJlMzNqQk1Udy8vdng5NnpOVXNacU9RbkpxWVM1NFl4VDdBaEFNVUt5Zzhicmx3PQ==;Mgo+DSMBMAY9C3t2VFhiQlJPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXtSd0ViWndacHJUT2E=;MjAwMzYwM0AzMjMxMmUzMjJlMzNlbDJTUFE0cFNCdExkYkNXdjVqL1lJWGJqY2NlOWE2ZSt0dFB3U1FZOVBJPQ==;MjAwMzYwNEAzMjMxMmUzMjJlMzNaM0NZd1p5V3JYSmoxQjYwbFRlWEJ2UVNvMTlUVWZjTk5CdEpnelRVUk5ZPQ==;MjAwMzYwNUAzMjMxMmUzMjJlMzNaekJ5dVV4NmZCcnFuVkZ4V0h6T1hhbVVVNUtRcnE0MTg5N1pKRDJXU0JnPQ==')

export default function Calendar() {
    
    //FULLCALENDAR FUNCTIONS
    const [eventsList, setEventsList] = useState([
        {
            title: '',
            start: '',
            end: ''
        }
    ])

    const [addEventsList, setAddEventsList] = useState([
        {
            title: '',
            start: '',
            end: '',
            meetingPlatform: ''
        }
    ])

    //syncfusion dummy data
    const scheduleData = [
        {
            Id: '1',
            Subject: 'nolasco',
            StartTime: new Date('2023-05-10T04:00:00.000Z'),
            EndTime: new Date('2023-05-10T05:00:00.000Z'),
            MeetingPlatform: 'Zoom',
            CategoryColor: '#DF912E'
        },
        {
            Id: '2',
            Subject: 'czanel',
            StartTime: new Date('2023-05-12T04:00:00.000Z'),
            EndTime: new Date('2023-05-12T05:00:00.000Z'),
            MeetingPlatform: 'Meet',
            CategoryColor: '#DF912E'
        }
    ]

    const eventSettings = { dataSource: scheduleData }


    const handleInputChange = (e) => {
        const { name, value} = e.target
        setAddEventsList(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    //GET EVENT
    const getEvent = async (userId) => {
        try {
            const eventsRef = collection(db, 'events')
            const q = query(eventsRef, where('CreatedBy', '==', userId))
            const querySnapshot = await getDocs(q)
            const events = []
            querySnapshot.forEach((doc) => {
                const eventData = doc.data()
                const event = {
                    Id: doc.id,
                    Subject: eventData.Subject,
                    StartTime: eventData.StartTime,
                    EndTime: eventData.EndTime,
                    MeetingPlatform: eventData.MeetingPlatform
                }
                events.push(event)
            })
            return events
        } catch (error) {
            console.error('Error Getting events: ', error)
            return []
        }
    }

    useEffect(() => {
        if (auth.currentUser) {
            getEvent(auth.currentUser.uid).then((events) => {
                setEventsList(events)
            })
        }
    }, [auth.currentUser])

    //ADD EVENT
    const addEvent = async (event) => {
        try {
            const batch = writeBatch(db)
            event.forEach(event => {
                const docRef = doc(collection(db, 'events'))
                batch.set(docRef, {
                    Id: event.Id,
                    Subject: event.Subject,
                    StartTime: event.StartTime,
                    EndTime: event.EndTime,
                    // MeetingPlatform: event.MeetingPlatform,
                    CreatedBy: auth.currentUser.uid
                })
            })
            await batch.commit()
            console.log('Events added successfully!')
            const newEvents = await getEvent(auth.currentUser.uid)
            setEventsList(newEvents)
        } catch (e) {
            console.error('Error adding events: ', e)
        }
    }

    //ACTION COMPLETE HANDLER
    const handleActionComplete = (args) => {
        if (args.requestType === 'eventCreated') {
            const newEvent = args.data[0]
            addEvent([newEvent])
            console.log([newEvent])
        }
    }

    //Modal functions
    const [openModal, setOpenModal] = useState(false)
    const handleOpen = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)

    const [meetPlat, setMeetPlat] = useState('')

    return (
        <div className='w-full h-full text-gray-800 p-5'>
            {/* <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                headerToolbar={{
                    start: 'today,dayGridMonth,dayGridWeek,dayGridDay', // will normally be on the left. if RTL, will be on the right
                    center: 'title',
                    end: 'prev,next' // will normally be on the right. if RTL, will be on the left
                }}
                events={eventsList}
                weekends={true}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={handleOpen}
                // eventChange={}
                // eventClick={}
            />
            
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
                        <TextField
                            id="outlined-basic"
                            label="Title"
                            variant="outlined"
                            name='title'
                            value={addEventsList.title}
                            onChange={handleInputChange}
                        />
                        <FormControl fullWidth>
                            <div className='flex flex-col w-full gap-5'>
                                <InputLabel id="demo-simple-select-label">Meeting Platform</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={addEventsList.meetingPlatform}
                                    label="Meeting Platform"
                                    onChange={handleInputChange}
                                    name='meetingPlatform'
                                >
                                    <MenuItem value={'Zoom'}>
                                        <div className='flex items-center gap-2'>
                                            <div className='grid place-items-center text-blue-500 text-2xl'>
                                                <ion-icon name="videocam"></ion-icon>
                                            </div>
                                            <p>Zoom</p>
                                        </div>
                                    </MenuItem>
                                    <MenuItem value={'Google Meet'}>
                                        <div className='flex items-center gap-2'>
                                            <div className='grid place-items-center text-green-600 text-2xl'>
                                                <ion-icon name="logo-google"></ion-icon>
                                            </div>
                                            <p>Google Meet</p>
                                        </div>
                                    </MenuItem>
                                    <MenuItem value={'Microsoft Teams'}>
                                        <div className='flex items-center gap-2'>
                                            <div className='grid place-items-center text-purple-600 text-2xl'>
                                                <ion-icon name="people"></ion-icon>
                                            </div>
                                            <p>Microsoft Teams</p>
                                        </div>
                                    </MenuItem>
                                </Select>
                                <div className='flex justify-around sm:flex-row flex-col gap-3'>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            className='sm:w-1/2'
                                            label='Start'
                                            value={addEventsList.start}
                                            onChange={value => handleInputChange(
                                                {
                                                    target: { name: 'start', value}
                                                }
                                            )}
                                        />
                                        <TimePicker
                                            className='sm:w-1/2'
                                            label='End'
                                            value={addEventsList.end}
                                            onChange={value => handleInputChange(
                                                {
                                                    target: { name: 'end', value}
                                                }
                                            )}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </FormControl>
                    </div>


                    <div className='self-end'>
                        <Button
                            className='text-black'
                            onClick={() => {
                                addEvent(addEventsList)
                                handleClose()
                            }}
                            variant="contained"
                            // disabled={!meetPlat}
                        >
                                Add
                        </Button>
                    </div>
                    
                </Box>
            </Modal>
            <Snackbar></Snackbar> */}
            <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/tailwind-dark.css" />
            <ScheduleComponent
                currentView='Month'
                eventSettings={eventSettings}
                actionComplete={handleActionComplete}
                selectedDate={new Date()}
            >
                <Inject
                    services={[
                        Day,
                        Week,
                        WorkWeek,
                        Month,
                        Agenda,
                        Resize,
                        DragAndDrop
                    ]}
                />
                <div className='self-end'>
                        <Button
                            className='text-black'
                            onClick={() => {
                                // addEvent(scheduleData)
                                console.log(scheduleData)
                            }}
                            variant="contained"
                        >
                            Add
                        </Button>
                </div>
            </ScheduleComponent>
        </div>
    )
}
