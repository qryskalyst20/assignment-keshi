"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import ANAMUSLIM from "@/public/2a414c5ee1b59d689a334be315d7a8c2.png"
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [credential, setCredential] = useState({
    email: '',
    password: ''
  })

  const router = useRouter()

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credential)
    })

    const data = await res.json()

    if (data.success) {
      router.push('/dashboard')
      toast.success("Login Success")
    } else {
      toast.error("Login Failed")
    }
  }

  return (
    <main className='w-full flex flex-row bg-neutral min-h-screen bg-neutral-50'>
      <div className='flex-[2] flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center'>
          <Image src={ANAMUSLIM} alt='anamuslim' width={100} height={100} />
          <h1 className='text-zinc-900 text-5xl font-bold'>Welcome Back</h1>
        </div>
        <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>
          <input className='w-80 h-12 rounded-xl border-2 border-zinc-900 text-zinc-900 outline-none px-4 py-2 mt-4' type='email' placeholder='Email Address' onChange={(e) => setCredential({ ...credential, email: e.target.value })} />
          <input className='w-80 h-12 rounded-xl border-2 border-zinc-900 text-zinc-900 outline-none px-4 py-2 mt-4' type='password' placeholder='Password' onChange={(e) => setCredential({ ...credential, password: e.target.value })} />
          <button onClick={handleSubmit} type="submit" className='w-80 h-12 rounded-3xl border-2 border-zinc-900 outline-none px-4 py-2 mt-4 bg-zinc-900 text-neutral-50 font-bold'>Login</button>
        </form>

      </div>
      <div className='flex-1 bg-zinc-900 rounded-l-3xl' />
    </main>
  )
}

export default Page