import type { Metadata } from 'next'
import WeddingPage from '@/components/wedding-page'

export const metadata: Metadata = { title: 'Wedding Giving | Tobi & Seyi', description: 'Wedding gift details for Tobi and Seyi.' }

export default function GivingPage() {
  return <WeddingPage page="giving" />
}
