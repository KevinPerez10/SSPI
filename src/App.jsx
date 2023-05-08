import './App.css'

import SignIn from './components/authentication/SignIn'
import SignOut from './components/authentication/SignOut'
import Home from './components/pages/Home'
import Menu from './components/pages/Menu'

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirestore, collection, getDocs, addDoc, doc, writeBatch } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCaxBPJsop8oCD8HnJAkfOkGrB7kUR6QaA",
  authDomain: "sspi-2fab1.firebaseapp.com",
  projectId: "sspi-2fab1",
  storageBucket: "sspi-2fab1.appspot.com",
  messagingSenderId: "709708896393",
  appId: "1:709708896393:web:e2fbecdac0444b62b00e58",
  measurementId: "G-HH66QXVB0Q"
};

const app = initializeApp(firebaseConfig)

//Authentication
export const auth = getAuth(app)

//Firestore Database
export const db = getFirestore(app)

const eventsList = [
  {
    title: 'Event 1',
    start: '2023-05-05T10:00:00',
    end: '2023-05-05T12:00:00'
  }
]

const addEvent = async (events) => {
  try {
      const batch = writeBatch(db)
      events.forEach(event => {
        const docRef = doc(collection(db, 'events'))
        batch.set(docRef, {
          title: event.title,
          start: event.start,
          end: event.end,
          createdBy: auth.currentUser.uid
        })
      })
      await batch.commit()
      console.log('Events added successfully!')
  } catch (e) {
      console.error('Error adding events: ', e)
  }
}

//ADD EVENT
// addEvent(eventsList)
//   .then(() => {
//       console.log('Event added!')
//   })
//   .catch((error) => {
//       console.error('Error adding events: ', error)
//   })

//TEST Add data to db
// try {
//   const docRef = await addDoc(collection(db, 'users'), {
//     first: 'Alan',
//     middle: 'Mathison',
//     last: 'Turing',
//     born: 1912
//   })

//   console.log('Document written: ', docRef.id)
// } catch (e) {
//   console.error('Error: ', e)
// }

//TEST Get data from db
// const querySnapshot = await getDocs(collection(db, 'users'))
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`)
// })

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className='bg-gray-700 text-sspi-yellow h-screen w-full flex justify-center items-center'>
      <main className='h-full w-full flex flex-col items-center justify-center'>
        <section className='bg-gray-800 w-full'>
          {user ?
            <div className='text-sspi-yellow flex items-center justify-center mx-3 my-2 gap-2'>
              <div>
                <Menu/>
              </div>
              <div className='font-gilmer mr-auto'>
                SSPI
              </div>
              <p>
                Hello, {localStorage.getItem('name')}!
              </p>
              <div className=''>
                <img className='rounded-full w-10' src={localStorage.getItem('profilePic')} alt="" />
              </div>
              <div>
                <SignOut/>
              </div>
            </div>
          : null
          }
        </section>
        
        {user ? <Home/> : <SignIn/>}
      </main>
    </div>
  )
}

export default App
