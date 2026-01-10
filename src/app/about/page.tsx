export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Product Explorer</h1>
        <p className="text-xl text-gray-600">
          A production-grade product exploration platform powered by live web scraping
        </p>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Product Explorer is a full-stack application that demonstrates modern web development
          practices and real-time web scraping capabilities. The platform allows users to navigate
          from high-level categories to individual product details, all powered by on-demand
          scraping from World of Books.
        </p>
        <p className="text-gray-700 leading-relaxed">
          This project showcases production-ready architecture, ethical web scraping practices,
          and a seamless user experience with intelligent caching and responsive design.
        </p>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-primary-600 mb-2">Frontend</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Next.js 14 with App Router</li>
              <li>React 18 with TypeScript</li>
              <li>Tailwind CSS for styling</li>
              <li>SWR for data fetching and caching</li>
              <li>Responsive and accessible design</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary-600 mb-2">Backend</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>NestJS with TypeScript</li>
              <li>PostgreSQL database</li>
              <li>TypeORM for database management</li>
              <li>Crawlee + Playwright for scraping</li>
              <li>BullMQ for job queuing</li>
              <li>Redis for caching</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Key Features</h2>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="text-primary-600 mr-3 mt-1">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">On-Demand Scraping</h3>
              <p className="text-gray-600">Real-time data fetching with intelligent caching to minimize server load</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-primary-600 mr-3 mt-1">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Comprehensive Product Data</h3>
              <p className="text-gray-600">Detailed information including reviews, ratings, and recommendations</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-primary-600 mr-3 mt-1">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Responsive Design</h3>
              <p className="text-gray-600">Optimized for desktop and mobile with smooth transitions</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-primary-600 mr-3 mt-1">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">View History Tracking</h3>
              <p className="text-gray-600">Client and server-side browsing history for seamless navigation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-primary-50 border border-primary-200">
        <h2 className="text-2xl font-bold mb-4">Ethical Scraping</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          This project demonstrates responsible web scraping practices:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Respecting robots.txt and terms of service</li>
          <li>Implementing proper rate limiting and delays</li>
          <li>Using exponential backoff for retries</li>
          <li>Caching results to minimize server requests</li>
          <li>Graceful error handling and resource cleanup</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Architecture Highlights</h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Clean Architecture:</strong> Separation of concerns with modules, services, and DTOs</li>
          <li><strong>Type Safety:</strong> Full TypeScript implementation across frontend and backend</li>
          <li><strong>API Documentation:</strong> Swagger/OpenAPI specification</li>
          <li><strong>Database Design:</strong> Normalized schema with proper indexing and relationships</li>
          <li><strong>Error Handling:</strong> Comprehensive error handling and logging</li>
          <li><strong>Performance:</strong> Caching, pagination, and optimized queries</li>
        </ul>
      </div>
    </div>
  )
}
