"use client"

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from '@/providers/SessionProvider'

export default function Home() {

  const router = useRouter()
  const { session } = useSession()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    } else {
      router.push('/auth/login')
    }
  }, [router, session])
}
