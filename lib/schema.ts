import { Creator } from "@/lib/types";

export function generateCreatorSchema(creator: Creator) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": creator.name,
    "description": creator.description,
    "nationality": creator.country,
    "knowsLanguage": creator.language,
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