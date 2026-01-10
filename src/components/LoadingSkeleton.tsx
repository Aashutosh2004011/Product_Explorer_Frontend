interface LoadingSkeletonProps {
  type?: 'heading' | 'text' | 'card' | 'image' | 'product'
  className?: string
}

export function LoadingSkeleton({ type = 'card', className = '' }: LoadingSkeletonProps) {
  if (type === 'heading') {
    return <div className={`skeleton h-8 w-64 ${className}`} />
  }

  if (type === 'text') {
    return <div className={`skeleton h-4 w-full ${className}`} />
  }

  if (type === 'image') {
    return <div className={`skeleton h-48 w-full ${className}`} />
  }

  if (type === 'product') {
    return (
      <div className="card space-y-4">
        <div className="skeleton h-48 w-full" />
        <div className="skeleton h-6 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-8 w-24" />
      </div>
    )
  }

  return (
    <div className={`card space-y-3 ${className}`}>
      <div className="skeleton h-6 w-3/4" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-5/6" />
    </div>
  )
}
