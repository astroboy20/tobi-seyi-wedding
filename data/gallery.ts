export type GalleryImage = {
  src: string
  alt: string
  className: string
}

export const galleryImages: GalleryImage[] = [
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PL2%20-%202-dXub3zdogy0rJmLlAVpYYf8dbDCWK8.png', alt: 'Tobi and Seyi in a black and white wedding portrait', className: 'gallery-tall' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PL8.PNG-0Im6Z6KeUL8GbS2ArP2VsHlZqVQ8yZ.png', alt: 'Tobi and Seyi seated together in vibrant pink and navy', className: 'gallery-feature' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PL1-6.PNG-p8vfcgZsuxf9DDeKcG4ghQCekZ5UJM.png', alt: 'A black and white portrait of Tobi and Seyi embracing', className: 'gallery-tall' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PL1-5.PNG-RAzFgoC318hjaboU1sIraMfXBC9uHu.png', alt: 'Tobi and Seyi sharing a quiet moment by a window', className: 'gallery-wide' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PL1-1-TRbXM4GJB8MDPFQpo6keJymQBrmUS1.jpg', alt: 'Tobi and Seyi together outdoors in black and white', className: 'gallery-tall' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8873.JPG-3SoHUV9RTK6AoiOWDhGgYPQfVyE78q.jpeg', alt: 'Tobi and Seyi in warm light beside a window', className: 'gallery-feature' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PL1-4.PNG-h2ndV59xQ9dZiIge2Chyp35ohrTLkQ.png', alt: 'Tobi and Seyi leaning together in a sunlit room', className: 'gallery-wide' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PL1-3.PNG-tT2TiftjVOgGofYHS9vRqsLbPRt0ww.png', alt: 'A close portrait of Tobi and Seyi smiling together', className: 'gallery-tall' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PL%202-2.PNG-LXMCtXSrTlIY2CIs1ayIrx2iQqPx8A.png', alt: 'A proposal scene beside the water with pink drapery', className: 'gallery-feature' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5DF41649-484D-4BC8-AB47-91848F47E5F8.JPG-eUYYg62s0l1U83OYETcRTZEJ375eFi.jpeg', alt: 'Tobi showing her engagement ring outdoors', className: 'gallery-tall' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/B3A1361D-51B2-4EDD-BD8F-9F4151A34EAC-x4VdCG5KLFNAG5YUCf3q650QtzOMHf.jpg', alt: 'A black and white portrait of Tobi with her ring', className: 'gallery-tall' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8855.JPG-C3KTymA5C3ZXkT3DIK8L663KLOYS2B.jpeg', alt: 'A joyful black and white moment between Tobi and Seyi', className: 'gallery-wide' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8871.JPG-VbxiF1DISg8uqLcVyN9UctYwkmwV5H.jpeg', alt: 'Tobi and Seyi dancing together in a studio portrait', className: 'gallery-feature' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/B3BC0D9C-0208-44FD-81BF-AA4B0D9E2130-E9j6NIvDDguOIJ9FWtpk0gIWyA5KPH.png', alt: 'Tobi and Seyi dancing together in a bright portrait', className: 'gallery-wide' },
]

export const storyChapters = [
  { number: '01', label: 'THE BEGINNING, 2019', title: 'Every story has a first chapter.', text: 'Tobi and Seyi’s story began in 2019 when they met through mutual friends. For years, they remained distant friends, never imagining that their paths would one day lead them to forever.', image: galleryImages[2] },
  { number: '02', label: 'THE UNEXPECTED RECONNECTION', title: 'A simple hello.', text: 'Fast forward to February 2025, when Seyi decided to slide into Tobi’s DMs. What started as a simple catch-up turned into two days of nonstop conversations. Somewhere along the way, Seyi asked if they could explore the possibility of something more.', image: galleryImages[5] },
  { number: '03', label: 'THE DAILY CONVERSATION PROPOSAL', title: 'The best kind of compromise.', text: 'But Tobi had other plans. She wasn’t looking for a relationship and wanted to focus on her career. Instead, she suggested they could be friends who talked every day. Seyi’s response? He wasn’t quite sure he could commit to talking every single day. Tobi thought that was fair enough.', image: galleryImages[7] },
  { number: '04', label: 'THE UNEXPECTED LOVE STORY', title: 'Then, somehow, every day.', text: 'The funny thing? Not a single day has gone by without them talking since. Somewhere between the everyday conversations, laughter, and growing friendship, something beautiful blossomed. What began as a simple reconnection became a love neither of them saw coming.', image: galleryImages[1] },
  { number: '05', label: 'FROM FRIENDSHIP TO FOREVER', title: 'The conversation continues.', text: 'And now, one year and five months later, the two people who weren’t quite planning on falling in love are preparing to spend forever together. Turns out, some of the best love stories begin with the simplest conversations.', image: galleryImages[13] },
]

export const heroImage = galleryImages[5]

export const allStoryImages = [...galleryImages]

export const storyCopy = `Tobi and Seyi’s story began in 2019 when they met through mutual friends. For years, they remained distant friends, never imagining that their paths would one day lead them to forever.\n\nFast forward to February 2025, when Seyi decided to slide into Tobi’s DMs. What started as a simple catch-up turned into two days of nonstop conversations. Somewhere along the way, Seyi asked if they could explore the possibility of something more.\n\nBut Tobi had other plans. She wasn’t looking for a relationship and wanted to focus on her career. Instead, she suggested they could be friends who talked every day.\n\nSeyi’s response? He wasn’t quite sure he could commit to talking every single day.\n\nTobi thought that was fair enough.\n\nThe funny thing? Not a single day has gone by without them talking since.\n\nSomewhere between the everyday conversations, laughter, and growing friendship, something beautiful blossomed.\n\nWhat began as a simple reconnection became a love neither of them saw coming.\n\nAnd now, one year and five months later, the two people who weren’t quite planning on falling in love are preparing to spend forever together.\n\nTurns out, some of the best love stories begin with the simplest conversations.`

// Keep this field in the manifest so the gallery can be expanded to future client assets without changing presentation logic.
export const providedImageCount = galleryImages.length
