import './App.css'

import SignIn from './components/authentication/SignIn'
import SignOut from './components/authentication/SignOut'
import Home from './components/pages/Home'
import Menu from './components/pages/Menu'

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirestore } from 'firebase/firestore'

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
