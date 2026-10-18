import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const emailNormalized = email.toLowerCase()

    if (fullName.length < 2 || fullName.length > 120) {
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 })
    }
    if (!emailPattern.test(emailNormalized) || emailNormalized.length > 254) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()
    const { error } = await supabase.from('wedding_rsvps').insert({
      full_name: fullName,
      email,
      email_normalized: emailNormalized,
    })

    if (error?.code === '23505') {
      return NextResponse.json({ error: 'This email has already been registered for the wedding RSVP.' }, { status: 409 })
    }
    if (error) {
      return NextResponse.json({ error: "We couldn't submit your RSVP. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ message: 'RSVP confirmed! We look forward to celebrating with you.' })
  } catch {
    return NextResponse.json({ error: "We couldn't submit your RSVP. Please try again." }, { status: 500 })
  }
}
