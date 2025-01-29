import { Creator } from "@/lib/types";

export function generateCreatorSchema(creator: Creator) {
  return {
    "@context": "https://schema.org",
    "@type": ["Person", "ProfessionalService"],
    "name": creator.name,
    "description": creator.description,
    "url": `https://www.bestyoutubechannels.com/creators/${creator.slug}`,
    "image": creator.logoUrl,
    "nationality": creator.country,
    "knowsLanguage": creator.language,
    "teaches": creator.categories,
    "sameAs": [
      `https://youtube.com/c/${creator.slug}`,
    ],
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/FollowAction",
        "userInteractionCount": creator.subscriberCount
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/WatchAction",
        "userInteractionCount": creator.views
      }
    ]
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BestYoutubeChannels",
    "description": "Discover top tech education content creators",
    "url": "https://www.bestyoutubechannels.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.bestyoutubechannels.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}