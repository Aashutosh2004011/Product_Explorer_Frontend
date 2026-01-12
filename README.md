# AbleSpace Frontend

Modern, responsive Next.js frontend for the AbleSpace Product Data Explorer platform. Provides an intuitive interface for browsing products from World of Books with real-time data fetching.

## 🔗 Links

- **Live Application**: [https://product-explorer-frontend-iota.vercel.app](https://product-explorer-frontend-iota.vercel.app)
- **GitHub Repository**: [https://github.com/Aashutosh2004011/Product_Explorer_Frontend](https://github.com/Aashutosh2004011/Product_Explorer_Frontend)
- **Backend Repository**: [https://github.com/Aashutosh2004011/Product_Explorer_Backend](https://github.com/Aashutosh2004011/Product_Explorer_Backend)
- **Backend API**: [https://product-explorer-backend-qlnt.onrender.com](https://product-explorer-backend-qlnt.onrender.com)

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [Data Fetching](#data-fetching)
- [Styling](#styling)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Docker Support](#docker-support)

## Features

✅ **Server-Side Rendering** - Next.js 14 with App Router
✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
✅ **Real-time Data** - SWR for efficient data fetching and caching
✅ **Loading States** - Skeleton loaders for better UX
✅ **Error Handling** - User-friendly error messages with retry
✅ **Accessibility** - WCAG AA compliant, semantic HTML
✅ **View History** - Client-side session tracking
✅ **On-Demand Scraping** - Trigger backend scraping from UI
✅ **Optimized Images** - Next.js Image component
✅ **TypeScript** - Full type safety

## Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | Next.js (App Router) | 14.0+ |
| **UI Library** | React | 18.2+ |
| **Language** | TypeScript | 5.3+ |
| **Styling** | Tailwind CSS | 3.4+ |
| **Data Fetching** | SWR | 2.2+ |
| **HTTP Client** | Axios | 1.6+ |
| **State Management** | React Context | - |
| **Session Management** | UUID | 9.0+ |

## Project Structure

```
frontend/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── page.tsx                  # Home / Landing page
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles
│   │   │
│   │   ├── categories/
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Category page (dynamic route)
│   │   │
│   │   ├── products/
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Product detail page (dynamic route)
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx              # About page
│   │   │
│   │   └── contact/
│   │       └── page.tsx              # Contact page
│   │
│   ├── components/                   # Reusable components
│   │   ├── LoadingSkeleton.tsx       # Skeleton loader component
│   │   ├── ErrorMessage.tsx          # Error display component
│   │   └── Navigation.tsx            # Header navigation
│   │
│   ├── contexts/                     # React contexts
│   │   └── ViewHistoryContext.tsx    # Session tracking context
│   │
│   └── lib/                          # Utilities
│       └── api.ts                    # Axios HTTP client
│
├── public/                           # Static assets
│   └── favicon.ico
│
├── Dockerfile                        # Docker image definition
├── .env.example                      # Environment variables template
├── .env.local                        # Local environment variables (gitignored)
├── next.config.js                    # Next.js configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── postcss.config.js                 # PostCSS configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json
```

## Getting Started

### Prerequisites

- **Node.js** 20+ and npm
- **Backend API** running on http://localhost:3001

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### Configuration

1. **Create environment file:**

```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local
nano .env.local
```

2. **Set environment variables:**

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Start Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:3000**

## Environment Variables

Create a `.env.local` file in the frontend directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001

# Optional: Analytics, monitoring, etc.
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Important:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Pages & Routes

### 1. Home Page (`/`)

**File:** `src/app/page.tsx`

**Features:**
- Displays all navigation items (Books, Fiction, Non-Fiction, etc.)
- "Load Categories" button to trigger navigation scraping
- Feature cards highlighting platform capabilities
- Responsive grid layout (1 col mobile, 2 cols tablet, 3 cols desktop)

**Data Fetching:**
```typescript
const { data, error, isLoading } = useSWR('/navigation', fetcher);
```

**UI Elements:**
- Navigation cards with links
- Loading skeletons
- Error messages with retry
- Feature highlights

---

### 2. Category Page (`/categories/[slug]`)

**File:** `src/app/categories/[slug]/page.tsx`

**Features:**
- Dynamic routing based on category slug
- Displays category title and product count
- Shows subcategories (hierarchical navigation)
- Product grid with images, titles, authors, prices
- "Refresh Products" button to trigger scraping
- Pagination support (via backend API)

**Data Fetching:**
```typescript
const { data: category } = useSWR(`/categories/slug/${slug}`, fetcher);
const { data: products } = useSWR(
  `/products?categoryId=${category.id}&limit=20&page=1`,
  fetcher
);
```

**UI Elements:**
- Category header with product count
- Subcategory navigation links
- Product cards grid (responsive)
- Loading states per section
- Empty states

---

### 3. Product Detail Page (`/products/[id]`)

**File:** `src/app/products/[id]/page.tsx`

**Features:**
- Displays full product information
- Product image, title, author, price
- Star rating display (1-5 stars)
- Publisher, ISBN, publication date
- Full description
- Customer reviews section
- Recommended products
- "Load Full Details" button for on-demand scraping
- Link to original World of Books page

**Data Fetching:**
```typescript
const { data: product } = useSWR(`/products/${id}`, fetcher);
const { data: detail } = useSWR(`/products/${id}/detail`, fetcher);
const { data: reviews } = useSWR(`/products/${id}/reviews`, fetcher);
```

**UI Elements:**
- Hero section with image
- Info cards (price, rating, metadata)
- Description section
- Reviews list with ratings
- Recommendations carousel
- Loading skeletons per section

---

### 4. About Page (`/about`)

**File:** `src/app/about/page.tsx`

Static page with information about the platform.

---

### 5. Contact Page (`/contact`)

**File:** `src/app/contact/page.tsx`

Static page with contact information.

---

## Components

### LoadingSkeleton

**File:** `src/components/LoadingSkeleton.tsx`

Reusable skeleton loader component for better loading UX.

**Props:**
```typescript
interface LoadingSkeletonProps {
  type?: 'heading' | 'text' | 'card' | 'image' | 'product';
  count?: number;
}
```

**Usage:**
```tsx
<LoadingSkeleton type="product" count={3} />
<LoadingSkeleton type="heading" />
```

**Variants:**
- `heading` - Title skeleton
- `text` - Text line skeleton
- `card` - Card container skeleton
- `image` - Image placeholder skeleton
- `product` - Full product card skeleton

---

### ErrorMessage

**File:** `src/components/ErrorMessage.tsx`

User-friendly error display component.

**Props:**
```typescript
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}
```

**Usage:**
```tsx
<ErrorMessage
  message="Failed to load products"
  onRetry={() => mutate()}
/>
```

**Features:**
- Error icon
- Custom error message
- Optional retry button
- Accessible (ARIA labels)

---

### Navigation

**File:** `src/components/Navigation.tsx`

Main navigation header component.

**Features:**
- Logo/brand link
- Navigation links (Home, About, Contact)
- Responsive mobile menu
- Sticky header

---

## Data Fetching

### SWR Configuration

The application uses **SWR** (Stale-While-Revalidate) for efficient data fetching.

**Benefits:**
- ✅ Automatic caching
- ✅ Revalidation on focus
- ✅ Deduplication of requests
- ✅ Optimistic UI updates
- ✅ Real-time updates

**Global Configuration:**

```typescript
// src/lib/api.ts
export const fetcher = (url: string) =>
  api.get(url).then(res => res.data);
```

**Usage in Components:**

```tsx
import useSWR from 'swr';
import { fetcher } from '@/lib/api';

function ProductList() {
  const { data, error, isLoading, mutate } = useSWR(
    '/products?limit=20&page=1',
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  if (isLoading) return <LoadingSkeleton type="product" count={4} />;
  if (error) return <ErrorMessage message="Failed to load" onRetry={mutate} />;

  return <div>{/* Render products */}</div>;
}
```

### HTTP Client (Axios)

**File:** `src/lib/api.ts`

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = (url: string) => api.get(url);
export const post = (url: string, data: any) => api.post(url, data);
// ...
```

---

## Contexts

### ViewHistoryContext

**File:** `src/contexts/ViewHistoryContext.tsx`

Tracks user browsing history and sends it to the backend.

**Features:**
- Session ID generation (UUID)
- localStorage persistence
- Automatic history tracking
- Backend synchronization

**Usage:**

```tsx
import { useViewHistory } from '@/contexts/ViewHistoryContext';

function ProductPage() {
  const { trackView } = useViewHistory();

  useEffect(() => {
    trackView({
      page: `/products/${productId}`,
      pathJson: {
        navigation: 'Fiction',
        category: 'Crime & Thriller',
        product: productTitle,
      },
    });
  }, [productId]);
}
```

**Provider Setup:**

```tsx
// src/app/layout.tsx
import { ViewHistoryProvider } from '@/contexts/ViewHistoryContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ViewHistoryProvider>
          {children}
        </ViewHistoryProvider>
      </body>
    </html>
  );
}
```

---

## Styling

### Tailwind CSS

The application uses **Tailwind CSS** for utility-first styling.

**Configuration:** `tailwind.config.js`

```javascript
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
      },
    },
  },
  plugins: [],
};
```

### Responsive Breakpoints

```css
/* Mobile First */
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

**Usage:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 col mobile, 2 cols tablet, 3 cols desktop */}
</div>
```

### Global Styles

**File:** `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom components */
.card {
  @apply bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition;
}

.btn {
  @apply px-4 py-2 rounded-md font-medium transition;
}

.skeleton {
  @apply animate-pulse bg-gray-200 rounded;
}
```

---

## Accessibility

### WCAG AA Compliance

✅ **Semantic HTML** - Proper heading hierarchy, landmarks
✅ **Keyboard Navigation** - All interactive elements accessible
✅ **Alt Text** - All images have descriptive alt attributes
✅ **Color Contrast** - Minimum 4.5:1 ratio for text
✅ **Focus Indicators** - Visible focus states
✅ **ARIA Labels** - Screen reader support

**Example:**
```tsx
<button
  aria-label="Load more products"
  className="focus:ring-2 focus:ring-blue-500"
>
  Load More
</button>

<img
  src={product.imageUrl}
  alt={`Cover of ${product.title} by ${product.author}`}
/>
```

---

## Running the Application

### Development Mode

```bash
npm run dev
```

**Features:**
- Hot-reload on file changes
- Fast Refresh (preserves React state)
- Detailed error messages

Access at: **http://localhost:3000**

---

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

**Optimizations:**
- Minified JavaScript/CSS
- Optimized images
- Static page generation
- Code splitting

---

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Type check with TypeScript |

---

## Building for Production

### Optimization Checklist

✅ **Image Optimization**
```tsx
import Image from 'next/image';

<Image
  src={product.imageUrl}
  alt={product.title}
  width={300}
  height={400}
  loading="lazy"
/>
```

✅ **Code Splitting** - Automatic with Next.js App Router

✅ **Prefetching** - Automatic for `<Link>` components

✅ **Compression** - Enable gzip/brotli on server

✅ **Caching Headers** - Configure in `next.config.js`

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ];
  },
};
```

---

## Docker Support

### Build Docker Image

```bash
# From frontend directory
docker build -t ablespace-frontend .
```

### Run Container

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://backend:3001 \
  ablespace-frontend
```

### Docker Compose

```bash
# From project root
docker-compose up -d

# Frontend will be available at http://localhost:3000
```

**Dockerfile:**
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

---

## Performance

### Lighthouse Scores (Target)

- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 90+
- **SEO:** 95+

### Optimization Techniques

1. **Image Optimization**
   - Next.js Image component
   - Lazy loading
   - WebP format

2. **Code Splitting**
   - Route-based splitting
   - Dynamic imports for large components

3. **Caching Strategy**
   - SWR client-side cache
   - CDN caching for static assets
   - Browser cache headers

4. **Bundle Size**
   - Tree shaking
   - Minification
   - Compression

---

## Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile browsers** (iOS Safari, Chrome Mobile)

---

## Troubleshooting

### API Connection Issues

```
Error: Network Error
```

**Solution:**
1. Check `NEXT_PUBLIC_API_URL` in `.env.local`
2. Ensure backend is running on correct port
3. Check CORS configuration on backend

### Build Errors

```
Error: Module not found
```

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### Hydration Errors

```
Error: Hydration failed
```

**Solution:**
- Ensure client/server rendered content matches
- Avoid using browser-only APIs in SSR
- Use `useEffect` for client-only code

---

## Environment-Specific Configuration

### Development

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Production

```env
NEXT_PUBLIC_API_URL=https://api.yourapp.com
```

### Staging

```env
NEXT_PUBLIC_API_URL=https://staging-api.yourapp.com
```

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Configuration:** `vercel.json`
```json
{
  "env": {
    "NEXT_PUBLIC_API_URL": "@api-url"
  }
}
```

### Other Platforms

- **Netlify** - Auto-deploy from Git
- **AWS Amplify** - Full-stack deployment
- **Docker** - Containerized deployment
- **Static Export** - `npm run build && npm run export`

---

## Contributing

1. Follow the existing code structure
2. Use TypeScript types for all components
3. Follow Tailwind CSS conventions
4. Ensure accessibility standards
5. Run linter before committing: `npm run lint`
6. Test on mobile and desktop

---

## License

MIT License - See LICENSE file for details

---

## Support

For issues or questions:
- Check the main README in project root
- Review component documentation
- Test API endpoints using Swagger docs at backend `/api`

---

**Built with Next.js 14, React 18, and Tailwind CSS**
