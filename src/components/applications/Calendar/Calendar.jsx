import React, {useEffect, useState} from 'react'
import dayjs from 'dayjs'
import {
    collection,
    query,
    where,
    doc,
    onSnapshot,
    writeBatch,
    deleteDoc,
    updateDoc,
    Firestore,
    getDocs
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

//syncfusion
import { registerLicense, extend, createElement } from '@syncfusion/ej2-base'
import {
    ScheduleComponent,
    // ViewsDirective,
    // ViewDirective,
    Day,
    Week,
    WorkWeek,
    Month,
    Agenda,
    Inject,
    Resize,
    DragAndDrop
} from '@syncfusion/ej2-react-schedule'
import { DropDownList } from '@syncfusion/ej2-react-dropdowns'
import { DateTimePicker } from '@syncfusion/ej2/calendars'


import '../../../App.css'
import '@syncfusion/ej2/tailwind-dark.css'
import { addContextMenuItems } from '@syncfusion/ej2/spreadsheet'
import { update } from '@syncfusion/ej2/inplace-editor'
import { change } from '@syncfusion/ej2/grids'

registerLicense('Mgo+DSMBaFt+QHJqVk1hXk5Hd0BLVGpAblJ3T2ZQdVt5ZDU7a15RRnVfR1xiSX9QfkFjWnxdcQ==;Mgo+DSMBPh8sVXJ1S0R+X1pFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jTH9SdkRgUXtec3JVRw==;ORg4AjUWIQA/Gnt2VFhiQlJPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXtSd0ViWndacHddRmE=;MjAwMzU5N0AzMjMxMmUzMjJlMzNqQmRoOERPUnRSWS9sMlpHUHg5Q1VQRkdwV2k0QUxjcmlQVzVQUDRyTVBJPQ==;MjAwMzU5OEAzMjMxMmUzMjJlMzNFYy9acUFxM2ZlVGZJbjIya1lOU1libnVYM3VScEZhUWZtcGhqZWlSb1FFPQ==;NRAiBiAaIQQuGjN/V0d+Xk9HfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5Wd0RjWHxWdHRQRmZd;MjAwMzYwMEAzMjMxMmUzMjJlMzNaekJ5dVV4NmZCcnFuVkZ4V0h6T1hhbVVVNUtRcnE0MTg5N1pKRDJXU0JnPQ==;MjAwMzYwMUAzMjMxMmUzMjJlMzNqQk1Udy8vdng5NnpOVXNacU9RbkpxWVM1NFl4VDdBaEFNVUt5Zzhicmx3PQ==;Mgo+DSMBMAY9C3t2VFhiQlJPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXtSd0ViWndacHJUT2E=;MjAwMzYwM0AzMjMxMmUzMjJlMzNlbDJTUFE0cFNCdExkYkNXdjVqL1lJWGJqY2NlOWE2ZSt0dFB3U1FZOVBJPQ==;MjAwMzYwNEAzMjMxMmUzMjJlMzNaM0NZd1p5V3JYSmoxQjYwbFRlWEJ2UVNvMTlUVWZjTk5CdEpnelRVUk5ZPQ==;MjAwMzYwNUAzMjMxMmUzMjJlMzNaekJ5dVV4NmZCcnFuVkZ4V0h6T1hhbVVVNUtRcnE0MTg5N1pKRDJXU0JnPQ==')

export default function Calendar() {

    //syncfusion dummy data
    const scheduleData = [
        // {
        //     Id: '1',
        //     Subject: 'nolasco',
        //     StartTime: new Date('2023-05-10T04:00:00.000Z'),
        //     EndTime: new Date('2023-05-10T05:00:00.000Z'),
        //     MeetingPlatform: 'Zoom',
        //     CategoryColor: '#DF912E'
        // },
        // {
        //     Id: '2',
        //     Subject: 'czanel',
        //     StartTime: new Date('2023-05-12T04:00:00.000Z'),
        //     EndTime: new Date('2023-05-12T05:00:00.000Z'),
        //     MeetingPlatform: 'Meet',
        //     CategoryColor: '#DF912E'
        // }
        {
            Id: '',
            Subject: 'Crylle',
            StartTime: new Date('2023-05-17T04:00:00.000Z'),
            EndTime: new Date('2023-05-19T04:00:00.000Z'),
            MeetingPlatform: 'Teams',
            CategoryColor: '#ffff'
        }
    ]

    //DATA HOLDER
    const [eventsList, setEventsList] = useState([])
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    //GET EVENT
    const getEvent = async (userId) => {
        try {
            const eventsRef = collection(db, 'events')
            const q = query(eventsRef, where('CreatedBy', '==', userId))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const eventsData = querySnapshot.docs.map((doc) => {
                    const docData = doc.data()
                    const event = {
                        Id: doc.id,
                        ...docData,
                        StartTime: docData.StartTime.toDate(),
                        EndTime: docData.EndTime.toDate()
                    }
                    return event
                })
                setEventsList([...eventsData])
            })
            setIsDataLoaded(true)
            return unsubscribe

        } catch (error) {
            console.error('Error Getting events: ', error)
            setEventsList([])
            setIsDataLoaded(true)
        }
    }
    
    useEffect(() => {
        if (auth.currentUser) {
            getEvent(auth.currentUser.uid)
        }
    }, [auth.currentUser])
    
    
    //ADD EVENT
    const addEvent = async (event) => {
        try {
            const eventsToAdd = Array.isArray(event) ? event : [event]
            const batch = writeBatch(db)
            const newEvents = []
            eventsToAdd.forEach((eventItem) => {
                const docRef = doc(collection(db, 'events'))
                const eventData = {
                    ...eventItem,
                    CreatedBy: auth.currentUser.uid
                }
                batch.set(docRef, eventData)
                newEvents.push(eventData)
            })
            await batch.commit()
            console.log('Events added successfully!')
        } catch (e) {
            console.error('Error adding events: ', e)
        }
    }

    //DELETE EVENT
    const deleteEvent = async (eventId) => {
        try {
            console.log('Deleting event: ', eventId)
            const docRef = doc(db,'events', eventId)
            console.log('Event from db: ', docRef)
            await deleteDoc(docRef)
            console.log('Event deleted successfully')
        } catch (error) {
            console.error('Error deleting event: ', error)
        }
    }

    //UPDATE EVENT
    const updateEvent = async (updatedEvent) => {
        try {
            const eventsCollectionRef = collection(db, 'events')
            const q = query(
                eventsCollectionRef,
                where('Id', '==', updatedEvent.Id)
            )
            const querySnapshot = await getDocs(q)

            querySnapshot.forEach(async (snapshot) => {
                const docId = snapshot.id
                const docRef = doc(db, 'events', docId)
                await updateDoc(docRef, updatedEvent)
                console.log('Event updated successfully!')
            })
        } catch (error) {
            console.error('Error updating event: ', error)
        }
    }

    //ACTION COMPLETE HANDLER
    const handleActionComplete = async (args) => {
        if (args.requestType === 'eventCreated' && args.data) {
            const createdEvent = args.data[0]
            addEvent(createdEvent)
        }
        
        else if (args.requestType === 'eventRemoved' && args.data) {
            const removedEvent = args.data[0]

            try{
                const docRef = collection(db, 'events')
                const q = query(docRef,
                    where('Subject', '==', removedEvent.Subject)
                )
                const querySnapshot = await getDocs(q)

                querySnapshot.forEach(async (doc) => {
                    const docId = doc.id
                    await deleteEvent(docId)
                })

            } catch (error) {
                console.log('Error deleting event: ', error)
            }
        }
        
        else if (args.requestType === 'eventChanged' && args.data) {
            const changedEvent = args.data[0]
            console.log(changedEvent)
            updateEvent(changedEvent)
        }
    }

    
    //Meeting Platform Logic
    const meetingPlatforms = ['Zoom', 'Google Meet', 'Microsoft Teams']
    
    const EditorTemplate = (props) => {
        const { rowData, field, type, element, value, setValue } = props
        
        if (field === 'EventType') {
            return element
        }

        // if (field ===)

        return (
            <div>
                <label htmlFor={field}>{field}</label>
                <input
                    id={field}
                    type={type}
                    value={value || ''}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        )
    }

    //EVENT SETTINGS
    const eventSettings = {
        dataSource: eventsList
    }

    return (
        <div className='w-full h-full text-gray-800 p-5'>
            {/* <Snackbar></Snackbar> */}
            {isDataLoaded ? (
                <ScheduleComponent
                        currentView='Month'
                        eventSettings={eventSettings}
                        // editorTemplate={EditorTemplate}
                        actionComplete={handleActionComplete}
                        selectedDate={new Date()}
                    >
                        {/* <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/tailwind.css" /> */}
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
                        {/* <div className='self-end'>
                                <Button
                                    className='text-black'
                                    onClick={() => {
                                        // console.log(eventsList)
                                        // console.log(scheduleData)
                                    }}
                                    variant="contained"
                                >
                                    Add
                                </Button>
                        </div> */}
                    </ScheduleComponent>
            ) : (
                <div className='text-white'>
                    Loading...
                </div>
            )
        }
        </div>
    )
}
