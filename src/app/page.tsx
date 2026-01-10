'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { api } from '@/lib/api'
import { LoadingSkeleton } from '@/components/LoadingSkeleton'
import { ErrorMessage } from '@/components/ErrorMessage'
import { useViewHistory } from '@/contexts/ViewHistoryContext'

export default function HomePage() {
  const { data: navigation, error, isLoading } = useSWR('/navigation', api.get)
  const { trackView } = useViewHistory()

  useEffect(() => {
    trackView('/', { page: 'home' })
  }, [trackView])

  const handleScrapeNavigation = async () => {
    try {
      await api.post('/scraping/navigation', {})
      window.location.reload()
    } catch (err) {
      console.error('Failed to scrape navigation:', err)
    }
  }

  if (error) {
    return (
      <div className="space-y-6">
        <ErrorMessage message="Failed to load navigation" />
        <div className="text-center">
          <button
            onClick={handleScrapeNavigation}
            className="btn btn-primary"
          >
            Initialize Navigation Data
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton type="heading" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <LoadingSkeleton key={i} type="card" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Welcome to Product Explorer
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover and explore books from World of Books with real-time scraping
          and comprehensive product information.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Browse Categories</h2>
        {navigation && navigation.length === 0 && (
          <button
            onClick={handleScrapeNavigation}
            className="btn btn-primary"
          >
            Load Categories
          </button>
        )}
      </div>

      {navigation && navigation.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigation.map((item: any) => (
            <Link
              key={item.id}
              href={`/categories/${item.slug}`}
              className="card group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.lastScrapedAt
                      ? `Updated ${new Date(item.lastScrapedAt).toLocaleDateString()}`
                      : 'Not yet scraped'}
                  </p>
                </div>
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-primary-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No navigation items available yet.</p>
          <button
            onClick={handleScrapeNavigation}
            className="btn btn-primary mt-4"
          >
            Initialize Navigation Data
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="card">
          <div className="text-primary-600 mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Real-time Scraping</h3>
          <p className="text-gray-600">
            On-demand data fetching from World of Books with intelligent caching.
          </p>
        </div>
        <div className="card">
          <div className="text-primary-600 mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Comprehensive Data</h3>
          <p className="text-gray-600">
            Detailed product info, reviews, ratings, and recommendations.
          </p>
        </div>
        <div className="card">
          <div className="text-primary-600 mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Fast & Responsive</h3>
          <p className="text-gray-600">
            Built with modern tech stack for optimal performance and UX.
          </p>
        </div>
      </div>
    </div>
  )
}
