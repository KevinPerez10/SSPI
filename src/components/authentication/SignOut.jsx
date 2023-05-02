import React from 'react'
import { auth } from '../../App'

export default function 
() {
    return auth.currentUser && (
        <button
            className='grid place-items-center hover:scale-110 transition-all'
            onClick={() => auth.signOut()}
        >
            <div className='text-3xl grid place-items-center'>
                <ion-icon name="log-out-outline"></ion-icon>
            </div>
        </button>
    )
}
