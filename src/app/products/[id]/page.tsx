'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import Link from 'next/link'
import { api } from '@/lib/api'
import { LoadingSkeleton } from '@/components/LoadingSkeleton'
import { ErrorMessage } from '@/components/ErrorMessage'
import { useViewHistory } from '@/contexts/ViewHistoryContext'

export default function ProductDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { trackView } = useViewHistory()
  const [isScraping, setIsScraping] = useState(false)

  const { data: product, error, mutate } = useSWR(`/products/${id}`, api.get)

  useEffect(() => {
    if (product) {
      trackView(`/products/${id}`, { productId: id, productTitle: product.title })
    }
  }, [product, id, trackView])

  const handleScrapeDetail = async () => {
    setIsScraping(true)
    try {
      await api.post(`/scraping/product-detail/${id}`, {})
      mutate()
    } catch (err) {
      console.error('Failed to scrape product detail:', err)
    } finally {
      setIsScraping(false)
    }
  }

  if (error) {
    return <ErrorMessage message="Failed to load product" />
  }

  if (!product) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton type="heading" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LoadingSkeleton type="image" className="h-96" />
          <div className="space-y-4">
            <LoadingSkeleton type="heading" />
            <LoadingSkeleton type="text" />
            <LoadingSkeleton type="text" />
          </div>
        </div>
      </div>
    )
  }

  const { detail, reviews } = product

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {product.imageUrl ? (
            <div className="bg-white rounded-lg shadow-lg p-8 flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="max-w-full max-h-96 object-contain"
              />
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            {product.author && (
              <p className="text-xl text-gray-600 mt-2">by {product.author}</p>
            )}
          </div>

          {product.price && (
            <div className="text-3xl font-bold text-primary-600">
              {product.currency} {Number(product.price).toFixed(2)}
            </div>
          )}

          {detail && detail.ratingsAvg > 0 && (
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(Number(detail.ratingsAvg))
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">
                {Number(detail.ratingsAvg).toFixed(1)} ({detail.reviewsCount} reviews)
              </span>
            </div>
          )}

          {detail && detail.publisher && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Publisher:</span> {detail.publisher}
              </p>
              {detail.isbn && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">ISBN:</span> {detail.isbn}
                </p>
              )}
              {detail.publicationDate && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Publication Date:</span>{' '}
                  {new Date(detail.publicationDate).toLocaleDateString()}
                </p>
              )}
            </div>
          )}

          {!detail && (
            <button
              onClick={handleScrapeDetail}
              disabled={isScraping}
              className="btn btn-primary disabled:opacity-50"
            >
              {isScraping ? 'Loading Details...' : 'Load Full Details'}
            </button>
          )}

          <a
            href={product.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary inline-block"
          >
            View on World of Books
          </a>
        </div>
      </div>

      {detail && detail.description && (
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-gray-700 leading-relaxed">{detail.description}</p>
        </div>
      )}

      {reviews && reviews.length > 0 && (
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review: any) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{review.author || 'Anonymous'}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.text}</p>
                {review.reviewedAt && (
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(review.reviewedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {detail && detail.recommendations && detail.recommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {detail.recommendations.slice(0, 4).map((url: string, idx: number) => (
              <div key={idx} className="card text-center">
                <p className="text-sm text-gray-600">Recommended #{idx + 1}</p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline text-sm mt-2 inline-block"
                >
                  View Product
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
