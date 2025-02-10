"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function  Register() {
    const [email,setemail] = useState("")
    const[password,setpassword] = useState("")
    const[Confirmpassword,setConfirmpassword] = useState("")
    const [error, seterror] = useState("")

    const router  = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(password === Confirmpassword){
            seterror("Password is wrong ")
        }
        try{
          const res =await fetch("/api/auth/register",{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({email,password})
          })
          const data = res.json()
          if(!res.ok){
            seterror("Registration failed")
          }

          router.push("/login")

        }catch(error){
          seterror("An error occurred during registration")
        }
    }
  return (
    <div >
       <h1>Register</h1>
       <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={Confirmpassword}
                        onChange={(e) => setConfirmpassword(e.target.value)}
                        required
                        />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Register</button>
            </form>
       </div>
  )
}

export default  Register
