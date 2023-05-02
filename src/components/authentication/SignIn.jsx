import React from 'react'
import { auth } from '../../App'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export default function SignIn() {
    const provider = new GoogleAuthProvider()

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const name = result.user.displayName
            const email = result.user.email
            const profilePic = result.user.photoURL

            localStorage.setItem('name', name)
            localStorage.setItem('email', email)
            localStorage.setItem('profilePic', profilePic)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='grid place-items-center gap-10'>
            <header className='text-3xl'>
                Welcome user
            </header>
            <button
                className='flex items-center gap-2 border-2 rounded-full px-4 py-3 hover:scale-105 transition-all'
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
