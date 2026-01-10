import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { ViewHistoryProvider } from '@/contexts/ViewHistoryContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Product Explorer - World of Books',
  description: 'Explore and discover books from World of Books',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ViewHistoryProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navigation />
            <main className="container mx-auto px-4 py-8 flex-grow">
              {children}
            </main>
            <footer className="bg-gray-900 text-white py-8 mt-auto">
              <div className="container mx-auto px-4 text-center">
                <p>&copy; 2024 Product Explorer. Data from World of Books.</p>
                <p className="mt-2 text-sm text-gray-400">
                  Built with Next.js, NestJS, and Crawlee
                </p>
              </div>
            </footer>
          </div>
        </ViewHistoryProvider>
      </body>
    </html>
  )
}
