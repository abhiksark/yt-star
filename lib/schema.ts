import type { Creator } from "./types";
import { getCanonicalUrl } from "./utils";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BestYoutubeChannels",
    alternateName: "Tech Content Creators Directory",
    url: getCanonicalUrl(),
    description: "Find the best tech content creators and programming tutorials",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${getCanonicalUrl()}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    publisher: {
      "@type": "Organization",
      name: "BestYoutubeChannels",
      logo: {
        "@type": "ImageObject",
        url: getCanonicalUrl("logo.png"),
        width: "180",
        height: "180"
      }
    }
  };
}

export function generateCreatorSchema(creator: Creator) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": getCanonicalUrl(`creators/${creator.slug}`),
    name: creator.name,
    description: creator.description,
    image: creator.logoUrl,
    url: getCanonicalUrl(`creators/${creator.slug}`),
    jobTitle: "Content Creator",
    worksFor: {
      "@type": "Organization",
      name: "YouTube",
      url: "https://www.youtube.com"
    },
    knowsAbout: creator.categories,
    interactionStatistic: [
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/FollowAction",
        userInteractionCount: creator.subscriberCount
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/WatchAction",
        userInteractionCount: creator.views
      }
    ],
    nationality: creator.country,
    knowsLanguage: creator.language,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getCanonicalUrl(`creators/${creator.slug}`)
    }
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebPage",
        "@id": item.url,
        name: item.name,
        url: item.url
      }
    }))
  };
}

export function generateCategorySchema(name: string, description: string, creatorCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${name} Content Creators`,
    description: description,
    numberOfItems: creatorCount,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    url: getCanonicalUrl(`categories/${name.toLowerCase()}`),
    mainEntityOfPage: {
      "@type": "CollectionPage",
      "@id": getCanonicalUrl(`categories/${name.toLowerCase()}`)
    }
  };
}

export function generateCountrySchema(countryName: string, creatorCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "Country",
    name: countryName,
    description: `Tech content creators from ${countryName}`,
    mainEntityOfPage: {
      "@type": "CollectionPage",
      "@id": getCanonicalUrl(`countries/${countryName.toLowerCase()}`),
      name: `${countryName} Tech Content Creators`,
      description: `Find ${creatorCount} tech content creators from ${countryName}`,
      numberOfItems: creatorCount
    }
  };
}

export function generateArticleSchema(post: {
  title: string;
  excerpt: string;
  date: string;
  author: { name: string; image?: string };
  slug: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author.name,
      image: post.author.image
    },
    image: post.image || getCanonicalUrl("og/blog.png"),
    datePublished: post.date,
    dateModified: post.date,
    publisher: {
      "@type": "Organization",
      name: "BestYoutubeChannels",
      logo: {
        "@type": "ImageObject",
        url: getCanonicalUrl("logo.png"),
        width: "180",
        height: "180"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getCanonicalUrl(`blog/${post.slug}`)
    }
  };
}

export function generateSearchResultsSchema(query: string, totalResults: number) {
  return {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: `Search results for "${query}"`,
    description: `Found ${totalResults} results for "${query}"`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalResults,
      itemListOrder: "https://schema.org/ItemListOrderDescending"
    }
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}