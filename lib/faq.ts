import { generateFAQSchema } from "./schema";

export const platformFAQs = [
  {
    question: "What is BestYoutubeChannels?",
    answer: "BestYoutubeChannels is a curated platform that helps developers discover high-quality educational content creators across various tech domains including programming, system design, web development, and more. We carefully select and categorize content creators based on their expertise, teaching quality, and community impact."
  },
  {
    question: "How do you select content creators?",
    answer: "We evaluate content creators based on multiple criteria including teaching quality, technical accuracy, content consistency, community engagement, and real-world experience. Each creator is reviewed for their expertise in specific tech domains and their ability to explain complex concepts effectively."
  },
  {
    question: "Are these YouTube channels free to access?",
    answer: "Yes, all featured content creators provide free educational content on YouTube. While some creators may offer additional paid courses or resources, their YouTube content is freely accessible to everyone."
  },
  {
    question: "How often is the content updated?",
    answer: "Our platform is updated regularly with new content creators and the latest statistics. We review and update creator information monthly to ensure accuracy and relevance of the educational content recommendations."
  },
  {
    question: "Can I suggest a content creator?",
    answer: "Yes! We welcome suggestions for new content creators. You can use our contact form to submit recommendations. Please include the creator's channel link and a brief description of why you think they should be featured."
  },
  {
    question: "How do you categorize content creators?",
    answer: "Content creators are categorized based on their primary teaching focus and expertise areas. We use a comprehensive tagging system that includes programming languages, frameworks, computer science concepts, and specialized topics like system design or DevOps."
  },
  {
    question: "What makes a good tech education channel?",
    answer: "We look for channels that demonstrate technical expertise, clear explanation skills, consistent content quality, practical examples, and strong community engagement. Good tech education channels typically provide up-to-date information, real-world applications, and comprehensive coverage of their topics."
  },
  {
    question: "How can I find content suitable for my skill level?",
    answer: "Each creator profile includes a complexity rating indicating their content's general difficulty level. You can filter creators by topics and use these ratings to find content that matches your experience level, from beginner to advanced."
  }
];

export function generatePlatformFAQSchema() {
  return generateFAQSchema(platformFAQs);
}