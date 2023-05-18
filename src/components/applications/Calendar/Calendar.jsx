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
    
    //DATA HOLDER
    const [eventsList, setEventsList] = useState([])
    // console.log(eventsList)
    const [isDataLoaded, setIsDataLoaded] = useState([false])

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

    const eventSettings = { dataSource: eventsList }


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
        const fetchData = async() => {
            if (auth.currentUser) {
                const events = await getEvent(auth.currentUser.uid) 
                setEventsList(events)
                setIsDataLoaded(true)
            }
        }

        fetchData()
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
            {/* <Snackbar></Snackbar> */}
            <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/tailwind-dark.css" />
            {isDataLoaded ? (
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
            ) : (
                <div>
                    Loading...
                </div>
            )}
        </div>
    )
}
