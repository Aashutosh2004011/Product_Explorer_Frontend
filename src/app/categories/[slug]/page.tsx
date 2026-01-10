'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import Link from 'next/link'
import { api } from '@/lib/api'
import { LoadingSkeleton } from '@/components/LoadingSkeleton'
import { ErrorMessage } from '@/components/ErrorMessage'
import { useViewHistory } from '@/contexts/ViewHistoryContext'

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const { trackView } = useViewHistory()
  const [isScraping, setIsScraping] = useState(false)

  const { data: category, error, mutate } = useSWR(
    `/categories/slug/${slug}`,
    api.get
  )
  console.log("slug",category);
  
  useEffect(() => {
    if (category) {
      trackView(`/categories/${slug}`, { categoryId: category.id, categoryTitle: category.title })
    }
  }, [category, slug, trackView])

  const handleScrapeProducts = async () => {
    if (!category) return

    setIsScraping(true)
    try {
      await api.post(`/scraping/products/${category.id}`, {})
      mutate()
    } catch (err) {
      console.error('Failed to scrape products:', err)
    } finally {
      setIsScraping(false)
    }
  }

  if (error) {
    return <ErrorMessage message="Failed to load category" />
  }

  if (!category) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton type="heading" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <LoadingSkeleton key={i} type="product" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{category.title}</h1>
        <p className="text-gray-600 mt-2">
          {category.productCount > 0
            ? `${category.productCount} products available`
            : 'Explore products in this category'}
        </p>
      </div>

      {category.children && category.children.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Subcategories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.children.map((child: any) => (
              <Link
                key={child.id}
                href={`/categories/${child.slug}`}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900">{child.title}</h3>
                {child.productCount > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {child.productCount} products
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products</h2>
        <button
          onClick={handleScrapeProducts}
          disabled={isScraping}
          className="btn btn-primary disabled:opacity-50"
        >
          {isScraping ? 'Scraping...' : 'Refresh Products'}
        </button>
      </div>

      {category.products && category.products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.products.map((product: any) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="card group cursor-pointer"
            >
              {product.imageUrl && (
                <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden h-48 flex items-center justify-center">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
              <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 line-clamp-2">
                {product.title}
              </h3>
              {product.author && (
                <p className="text-sm text-gray-600 mt-1">{product.author}</p>
              )}
              {product.price && (
                <p className="text-lg font-bold text-primary-600 mt-2">
                  {product.currency} {Number(product.price).toFixed(2)}
                </p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 mb-4">No products available yet.</p>
          <button
            onClick={handleScrapeProducts}
            disabled={isScraping}
            className="btn btn-primary disabled:opacity-50"
          >
            {isScraping ? 'Scraping...' : 'Load Products'}
          </button>
        </div>
      )}
    </div>
  )
}
