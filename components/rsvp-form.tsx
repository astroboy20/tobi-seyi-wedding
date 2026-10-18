'use client'

import { FormEvent, useState } from 'react'

const messages = {
  success: 'RSVP confirmed! We look forward to celebrating with you.',
  duplicate: 'This email has already been registered for the wedding RSVP.',
}

export function RsvpForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const name = fullName.trim()
    const normalizedEmail = email.trim().toLowerCase()
    if (!name) return setStatus({ type: 'error', message: 'Please enter your full name.' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) return setStatus({ type: 'error', message: 'Please enter a valid email address.' })

    setStatus(null)
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fullName: name, email }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error)
      setStatus({ type: 'success', message: result.message || messages.success })
      setFullName('')
      setEmail('')
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : "We couldn't submit your RSVP. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return <form className="rsvp-form" onSubmit={handleSubmit} noValidate>
    <div className="rsvp-field"><label htmlFor="rsvp-full-name">Full Name</label><input id="rsvp-full-name" name="fullName" type="text" autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} disabled={isSubmitting} /></div>
    <div className="rsvp-field"><label htmlFor="rsvp-email">Email Address</label><input id="rsvp-email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} disabled={isSubmitting} /></div>
    <button className="rsvp-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Confirming…' : 'Confirm Attendance'}</button>
    <p className={`rsvp-feedback ${status?.type || ''}`} role="status" aria-live="polite">{status?.message || ''}</p>
  </form>
}
