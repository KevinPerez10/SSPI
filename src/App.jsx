import './App.css'

import SignIn from './components/authentication/SignIn'
import SignOut from './components/authentication/SignOut'
import Home from './components/pages/Home'
import Menu from './components/pages/Menu'

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

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

export const auth = getAuth(app)

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className='bg-stone-400 h-screen w-full flex justify-center items-center'>
      <main className='h-full w-full flex flex-col items-center justify-center'>
        <section className='bg-stone-500 w-full'>
          {user ?
            <div className='text-white flex items-center justify-center mx-3 my-2 gap-2'>
              <div className='mr-auto'>
                <Menu/>
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
