export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">
          Get in touch with the Product Explorer team
        </p>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Project Information</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">GitHub Repository</h3>
            <a
              href="https://github.com/yourusername/product-explorer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              github.com/yourusername/product-explorer
            </a>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">API Documentation</h3>
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/api`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              View Swagger API Docs
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-primary-600 mb-3 flex justify-center">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Email</h3>
          <p className="text-gray-600">contact@productexplorer.com</p>
        </div>

        <div className="card text-center">
          <div className="text-primary-600 mb-3 flex justify-center">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Contribute</h3>
          <p className="text-gray-600">Submit issues or PRs on GitHub</p>
        </div>

        <div className="card text-center">
          <div className="text-primary-600 mb-3 flex justify-center">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Documentation</h3>
          <p className="text-gray-600">Check README for setup guide</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Technical Support</h2>
        <p className="text-gray-700 mb-4">
          For technical questions or issues, please check the following resources:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Review the README.md file in the repository</li>
          <li>Check the API documentation at /api endpoint</li>
          <li>Browse existing GitHub issues</li>
          <li>Submit a new issue with detailed information</li>
        </ul>
      </div>

      <div className="card bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 gap-4">
          <a href="/" className="text-primary-600 hover:underline">← Back to Home</a>
          <a href="/about" className="text-primary-600 hover:underline">About the Project</a>
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/api`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline"
          >
            API Documentation
          </a>
          <a
            href="https://github.com/yourusername/product-explorer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline"
          >
            GitHub Repository
          </a>
        </div>
      </div>
    </div>
  )
}
