import React from 'react'
import { auth } from '../../App'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export default function SignIn() {
    const provider = new GoogleAuthProvider()

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((userCredential) => {
            //For getting the user's basic info to display pfp and name
            const name = userCredential.user.displayName
            const profilePic = userCredential.user.photoURL

            console.log(userCredential)

            localStorage.setItem('name', name)
            localStorage.setItem('profilePic', profilePic)
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <div className='grid place-items-center gap-10'>
            <header className='text-3xl'>
                Welcome User!
            </header>
            <button
                className='flex items-center gap-2 bg-sspi-yellow text-gray-800 rounded-full px-4 py-3 hover:scale-105 transition-all'
                onClick={signInWithGoogle}
            >
                <div className='grid place-items-center'>
                    <ion-icon name='logo-google'></ion-icon>
                </div>
                Sign in with Google
            </button>
        </div>
    )
}
