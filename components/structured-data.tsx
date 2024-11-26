export function generateCreatorStructuredData(creator: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": creator.name,
    "description": creator.description,
    "image": creator.logoUrl,
    "url": `https://bestyoutubechannels.com/creators/${creator.slug}`,
    "sameAs": [
      `https://youtube.com/c/${creator.slug}`,
    ],
    "jobTitle": "Content Creator",
    "worksFor": {
      "@type": "Organization",
      "name": "YouTube"
    },
    "knowsAbout": creator.tags
  };
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BestYoutubeChannels",
    "url": "https://bestyoutubechannels.com",
    "description": "Discover the best tech education content creators on YouTube",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://bestyoutubechannels.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BestYoutubeChannels",
    "url": "https://bestyoutubechannels.com",
    "logo": "https://bestyoutubechannels.com/logo.png",
    "sameAs": [
      "https://twitter.com/bestyoutubechannels",
      "https://github.com/bestyoutubechannels"
    ]
  };
}