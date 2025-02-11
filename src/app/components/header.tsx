"use  client"

import { signOut, useSession, UseSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'



function header() {

    const {data: session}=useSession();

    const handleSignout = async () => {
      try{
        await signOut()
      }  catch (error){

      }
    }
  return <div>
    <button onClick={handleSignout}>Signout</button>
    {session ? (
        <div>Welcome</div>
    ): (
        <div>
            <link href="/login">Login</link>
            <link href="/register">Register</link>
        </div>
    )}
    
  </div> 
 );
}

export default header;