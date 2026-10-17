import type { Metadata } from 'next'
import WeddingPage from '@/components/wedding-page'

export const metadata: Metadata = { title: 'Wedding Venue | Tobi & Seyi', description: 'Find Whitestone Event Centre, the wedding venue for Tobi and Seyi.' }

export default function VenuePage() {
  return <WeddingPage page="venue" />
}
