import type { Metadata } from 'next'
import WeddingPage from '@/components/wedding-page'

export const metadata: Metadata = { title: 'Our Moments | Tobi & Seyi', description: 'A visual archive of Tobi and Seyi’s story.' }

export default function GalleryPage() {
  return <WeddingPage page="gallery" />
}
