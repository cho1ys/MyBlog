import { Inter } from 'next/font/google'
import './globals.css'
import ScrollToTop from './components/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
        className={inter.className}
        suppressHydrationWarning={true}
      >
        {children}
        <ScrollToTop/>
      </body>
    </html>
  )
}