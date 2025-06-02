import { useState } from 'react'

type SignupState = 'idle' | 'loading' | 'success' | 'error'

interface UseEmailSignupReturn {
  submitEmail: (email: string, source?: string) => Promise<void>
  state: SignupState
  message: string
  reset: () => void
}

export function useEmailSignup(): UseEmailSignupReturn {
  const [state, setState] = useState<SignupState>('idle')
  const [message, setMessage] = useState('')

  const submitEmail = async (email: string, source = 'waitlist') => {
    setState('loading')
    setMessage('')

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source }),
      })

      const data = await response.json()

      if (response.ok) {
        setState('success')
        setMessage('Thanks! You\'re on the waitlist. We\'ll be in touch soon!')
      } else {
        setState('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setState('error')
      setMessage('Network error. Please check your connection and try again.')
    }
  }

  const reset = () => {
    setState('idle')
    setMessage('')
  }

  return {
    submitEmail,
    state,
    message,
    reset
  }
}