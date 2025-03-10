# Tech Content Creators Platform

A comprehensive web platform that curates and showcases the best tech and programming content creators, helping developers find high-quality educational resources across various technology domains.

## 🚀 Overview

Tech Content Creators is a Next.js-based platform designed to connect developers with quality educational content creators. The platform provides a searchable, filterable directory of tech YouTubers and educators, organized by categories, countries, and expertise levels.

### Purpose & Vision

This platform aims to solve the challenge of finding reliable, high-quality tech educational content in an increasingly crowded online space. By curating and categorizing content creators based on expertise, teaching quality, and user ratings, we help developers at all levels discover the best learning resources for their specific needs.

Our vision is to become the definitive discovery platform for tech education, saving developers time and helping quality educators reach their ideal audience.

![Tech Content Creators Platform](public/og-image.jpg)

## ✨ Features

- **Creator Discovery**: Browse and search for tech content creators across various domains
- **Category Filtering**: Find creators specialized in specific tech categories like Frontend, Backend, System Design, etc.
- **Geographic Filtering**: Discover creators from specific countries and regions
- **Trending & Featured Sections**: Quickly access the most popular and highest-rated content creators
- **Creator Profiles**: Detailed profiles with channel statistics, content samples, and ratings
- **SEO Optimization**: Built with best SEO practices for maximum discoverability
- **Responsive Design**: Fully responsive interface that works on all devices
- **Dark/Light Mode**: Theme toggle for user preference
- **Authentication**: User authentication for personalized experiences
- **Blog Section**: Tech-related articles and creator spotlights
- **Internationalization**: Support for multiple languages with Next.js i18n
- **Accessibility**: WCAG 2.1 AA compliant components and navigation
- **Performance Metrics**: Monitoring of Core Web Vitals for optimal user experience

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Database**: [Supabase](https://supabase.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://github.com/colinhacks/zod)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Testing**: Jest, React Testing Library, and Playwright for E2E testing
- **Analytics**: Google Analytics and Supabase Analytics
- **Performance Monitoring**: Vercel Analytics and Lighthouse CI

## 📂 Project Structure

```
/
├── app/                  # Next.js App Router structure
│   ├── about/            # About page
│   ├── api/              # API routes
│   ├── blog/             # Blog section
│   ├── categories/       # Category pages
│   ├── countries/        # Country-specific pages  
│   ├── creators/         # Creator profile pages
│   ├── profile/          # User profile pages
│   ├── signin/           # Authentication pages
│   ├── signup/           # User registration
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   ├── globals.css       # Global styles
│   └── ...               # Other app routes
├── components/           # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── blog/             # Blog-related components
│   ├── ui/               # UI component library
│   ├── profile/          # User profile components
│   └── ...               # Other components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and data models
│   ├── supabase/         # Supabase client and functions
│   ├── types/            # TypeScript type definitions
│   └── ...               # Other utilities
├── public/               # Static assets
├── tests/                # Test files
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
└── ...                   # Config files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- Supabase account (for database)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tech-content-creators.git
   cd tech-content-creators
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your_google_analytics_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Development Workflow

1. **Branch Strategy**:
   - `main`: Production-ready code
   - `develop`: Integration branch for feature development
   - `feature/feature-name`: Individual feature branches

2. **Code Quality Tools**:
   - ESLint for code linting
   - Prettier for code formatting
   - TypeScript for static type checking
   - Husky for Git hooks (pre-commit, pre-push)

3. **Commit Convention**:
   We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:
   ```
   feat: add new creator filtering functionality
   fix: resolve search pagination issue
   docs: update README with deployment instructions
   ```

## 🗄️ Database Schema

The platform uses Supabase as its database with the following main tables:

- **profiles**: Stores content creator information
  - id (PK)
  - name
  - slug
  - logoUrl
  - description
  - subscriberCount
  - videoCount
  - views
  - country
  - language
  - categories (array)
  - complexity
  - rating
  - channelId
  - bannerUrl

- **categories**: Tech categories and their descriptions
  - id (PK)
  - name
  - slug
  - description

- **countries**: Country information for filtering
  - code (PK)
  - name
  - slug

- **ratings**: User ratings for creators
  - id (PK)
  - creatorId (FK)
  - userId (FK)
  - rating
  - comment
  - createdAt

- **users**: User account information
  - id (PK)
  - email
  - name
  - avatarUrl
  - createdAt

- **blog_posts**: Blog content
  - id (PK)
  - title
  - slug
  - content
  - excerpt
  - authorId (FK)
  - publishedAt
  - featuredImageUrl
  - tags (array)

## 🌐 SEO Features

The platform implements several SEO optimizations:

- **Server-side Rendering**: Improved search engine crawling with Next.js SSR
- **Dynamic Metadata**: Next.js Metadata API for customized page titles and descriptions
- **Structured Data**: JSON-LD implementation for rich search results
  ```jsx
  // Example JSON-LD for a creator profile
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Creator Name",
      "description": "Creator Description",
      "image": "creator-image-url.jpg",
      "url": "https://example.com/creators/creator-slug"
    }
  </script>
  ```
- **Open Graph & Twitter Cards**: Enhanced social media sharing
- **Semantic HTML**: Proper use of HTML5 elements for improved accessibility and SEO
- **Image Optimization**: Next.js Image component for optimized loading and Core Web Vitals
- **Canonical URLs**: Prevent duplicate content issues
- **XML Sitemap**: Automatic generation based on dynamic routes
- **Robots.txt**: Proper configuration for search engine crawling
- **Mobile Optimization**: Mobile-friendly design for better search rankings
- **Page Speed**: Optimized loading performance for improved rankings

## 🧩 Key Components

- **Creator Grid**: Displays creator cards with key information
  - Responsive grid layout
  - Lazy loading of images
  - Animated hover effects

- **Search Component**: Allows users to search for creators
  - Debounced input for performance
  - Auto-suggestions based on popular searches
  - Filtering by multiple criteria

- **Category Filters**: Filter creators by technology categories
  - Multi-select capability
  - Count indicators showing number of creators per category
  - Mobile-optimized dropdown on smaller screens

- **Country Filters**: Filter creators by geographic location
  - Interactive map visualization (desktop)
  - Alphabetical list with flags
  - Region grouping

- **Featured Creators**: Highlights top-rated content creators
  - Algorithm considers ratings, subscriber growth, and content freshness
  - Rotation of featured creators for variety

- **Trending Creators**: Shows currently popular creators
  - Based on view growth, rating trends, and recent subscriber increases
  - Weekly refresh of trending status

- **Creator Profile**: Detailed creator information page
  - Channel statistics with visual charts
  - Content samples and embedded videos
  - Review and rating system
  - Similar creator recommendations

## 🔄 Data Flow

1. **Data Storage**: Information is stored in Supabase tables
   - Creator profiles
   - User data (including preferences)
   - Ratings and reviews
   - Blog content

2. **Server-side Data Fetching**:
   - Server components fetch data using Supabase client
   - Data is pre-rendered for optimal SEO and performance
   - Incremental Static Regeneration (ISR) for frequently updated pages

3. **UI Rendering**:
   - Server components provide data to client components
   - UI components render with proper SEO optimization
   - Minimal client-side JavaScript for improved performance

4. **User Interactions**:
   - Search, filters, and pagination trigger new data fetches
   - Client-side state management for UI interactions
   - Server actions for data mutations

5. **Authentication Flow**:
   - Authentication state managed through Supabase Auth
   - Protected routes redirect unauthenticated users
   - Role-based access control for administrative features

## ⚡ Performance Optimizations

The platform implements numerous performance optimizations:

- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Using Next.js Image component with proper sizing and formats
- **Font Optimization**: Local font hosting with proper subset loading
- **Lazy Loading**: Components and images loaded only when needed
- **Caching Strategies**: 
  - SWR for client-side data fetching
  - Next.js cache for server-rendered content
  - Service worker for offline capabilities
- **Bundle Size Optimization**: 
  - Tree-shaking unused code
  - Dynamic imports for large components
- **Rendering Strategies**:
  - Server components for static content
  - Client components only where interactivity is needed
- **Core Web Vitals Optimization**:
  - Minimized CLS with proper image and layout handling
  - Improved FID with optimized event handlers
  - Enhanced LCP with prioritized loading of critical content

## ♿ Accessibility Features

The platform is built with accessibility as a priority:

- **Semantic HTML**: Proper use of landmarks, headings, and ARIA attributes
- **Keyboard Navigation**: Full keyboard support with visible focus states
- **Screen Reader Support**: ARIA labels and proper element roles
- **Color Contrast**: WCAG AA-compliant color contrast ratios
- **Reduced Motion**: Respects user preference for reduced motion
- **Form Accessibility**: Proper labels, error messages, and focus management
- **Skip Links**: Allow keyboard users to bypass navigation
- **Responsive Design**: Accessible on all device sizes
- **Focus Management**: Proper focus trapping in modals and dialogs

## 🧪 Testing Strategy

The project uses a comprehensive testing approach:

- **Unit Testing**: 
  - Jest and React Testing Library
  - Component isolation testing
  - Utility function testing

- **Integration Testing**:
  - Testing component interactions
  - API integration tests
  - Form submission flows

- **End-to-End Testing**:
  - Playwright for cross-browser testing
  - User journey testing
  - Accessibility testing automation

- **Performance Testing**:
  - Lighthouse CI for performance regression detection
  - Bundle size monitoring
  - Core Web Vitals tracking

- **Test Coverage**:
  - Aim for 80%+ test coverage
  - Critical paths have 100% coverage

## 🚀 Deployment

The application is deployed on Vercel with the following setup:

### Production Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=production_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=production_supabase_anon_key
   NEXT_PUBLIC_GA_MEASUREMENT_ID=production_ga_id
   ```
3. Deploy with the following settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Preview Deployments

Preview deployments are automatically created for all pull requests with:
- Isolated Supabase preview environment
- Automatically generated unique URL
- Automated Lighthouse testing

### Deployment Pipeline

1. Code is pushed to a feature branch
2. CI runs tests and linting
3. PR is created and automatically gets a preview deployment
4. After review and approval, PR is merged to main
5. Production build is automatically triggered
6. Post-deployment tests verify the live site

## 📊 Analytics

The platform uses multiple analytics tools:

- **Google Analytics**: For user behavior tracking
  - Page views and sessions
  - User demographics
  - Event tracking for key interactions

- **Vercel Analytics**: For performance monitoring
  - Real user monitoring
  - Core Web Vitals tracking
  - Geographic performance data

- **Custom Events**: Track specific user behaviors
  - Search queries
  - Filter usage
  - Creator profile views
  - External link clicks

## 🔮 Future Roadmap

Planned features and improvements:

- **Creator Verification**: Verified badge for authentic creator accounts
- **Advanced Analytics Dashboard**: For creators to track their profile performance
- **Community Features**: Forums and discussion areas for each tech category
- **Content Recommendations**: ML-based personalized creator recommendations
- **Learning Paths**: Curated sequences of creators for specific learning journeys
- **Mobile Application**: Native mobile apps for iOS and Android
- **Creator Monetization**: Premium content options and creator subscription support
- **Enhanced Search**: Natural language search capabilities for finding specific topics
- **Expanded Categories**: More granular categorization of tech content
- **Interactive Tutorials**: Embedded interactive coding exercises

## 🔒 Security Considerations

The platform implements several security best practices:

- **Authentication**: Secure authentication via Supabase Auth
- **Data Validation**: Server-side validation using Zod
- **Input Sanitization**: Prevention of XSS attacks
- **CSRF Protection**: Built-in protection with Next.js
- **Rate Limiting**: API route protection against abuse
- **Content Security Policy**: Restricting resource loading
- **Regular Updates**: Keeping dependencies updated
- **Error Handling**: Secure error messages without exposing sensitive info
- **Secure Headers**: Implementation of security headers
- **Audit Logging**: Tracking of security-relevant events

## 🌍 Browser Compatibility

The platform is tested and optimized for:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- iOS Safari (latest 2 versions)
- Android Chrome (latest 2 versions)

## 📝 License

[MIT License](LICENSE)

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style Guidelines

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use ESLint and Prettier with pre-commit hooks
- Write meaningful commit messages following Conventional Commits
- Include tests for new features
- Update documentation for any changes

## 📞 Contact

If you have questions or feedback, please reach out at [your-email@example.com](mailto:your-email@example.com).

## 🙏 Acknowledgements

- [Supabase](https://supabase.com/) for the excellent database and authentication service
- [Vercel](https://vercel.com/) for hosting and deployment infrastructure
- [Next.js Team](https://nextjs.org/) for the amazing framework
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- All the content creators featured on our platform 