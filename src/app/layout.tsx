import './globals.css'
import { Playfair_Display, Poppins } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Sah Prashad Bhandar - Authentic Temple Essentials',
  description: 'Get authentic Prashad & Temple Essentials from the main gate of Golu Devta Temple, Ghorakhal, Uttarakhand.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-spiritual text-text-primary">
        {children}
      </body>
    </html>
  )
} 