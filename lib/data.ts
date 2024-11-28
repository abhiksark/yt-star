import type { Creator, Category } from "@/lib/types";

export const categories: Category[] = [
  { name: 'System Design', slug: 'system-design' },
  { name: 'Frontend', slug: 'frontend' },
  { name: 'Backend', slug: 'backend' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'ML', slug: 'machine-learning' },
  { name: 'DevOps', slug: 'devops' },
  { name: 'Data Science', slug: 'data-science' },
  { name: 'Cloud', slug: 'cloud' },
  { name: 'Security', slug: 'security' },
  { name: 'Mobile', slug: 'mobile' },
];

export const channelsData: Creator[] = [
  {
    id: 1,
    name: 'Gaurav Sen',
    slug: 'gaurav-sen',
    subscriberCount: '547K',
    description: 'Gaurav Sen is an expert System Design educator focusing on scalable architectures and distributed systems.',
    views: '5M',
    country: 'IN',
    language: 'EN',
    videoCount: '289',
    complexity: 3,
    category: ['System Design', 'Algorithms', 'Architecture'],
    videoList: [
      {
        _id: "5NF_Lu0X6eM",
        title: "System Design Interview Question: Design a Distributed Cache (Part 1)"
      },
      {
        _id: "BCO8JKA2_N8",
        title: "System Design Interview Question: Design a Distributed Cache (Part 2)"
      }
    ],
    playList: [
        {
            playlistId:"PLMCXHnjXnTnszR6YSo1tQK2BMr15cC9Zh",
            title: "CS Fundamentals",
            thumbnailUrl: "https://i.ytimg.com/vi/fZc3ijGM0aM/sddefault.jpg"
        },
        {
            playlistId: "PLMCXHnjXnTnv5Pd3O1bKGHNU4mkvribaB",
            title: "Distributed Systems Playlist",
            thumbnailUrl: "https://i.ytimg.com/vi/fZc3ijGM0aM/sddefault.jpg"
        }
      ],
    logoUrl: 'https://yt3.googleusercontent.com/rsKAERVEXNTq6lbdIHUlm3aVAw4R2D1fPkDz-7sPccu9qwic5EYfSe6VI7tNB5-_r0Ip5_P0=s176-c-k-c0x00ffffff-no-rj',
  },
  {
    id: 2,
    name: 'Arpit Bhayani',
    slug: 'arpit-bhayani',
    logoUrl: 'https://yt3.googleusercontent.com/q4pQdGZdT9Suk5Yu7cm0KI9pLMSaFhEeKQtyZCYjFeJRcbODjS4V5J9AQhN96TYOHXI-rgZ5TA=s176-c-k-c0x00ffffff-no-rj',
    subscriberCount: '81.7K',
    views: '5M',
    videoCount: '120',
    country: 'IN',
    language: 'EN',
    description: 'Arpit Bhayani is a software engineer and educator who creates content on system design, microservices, and distributed systems.',
    category: ['Distributed Systems', 'Microservices', 'System Design'],
    videoList: [
      {
        _id: "xrYr7th4DgI",
        title: "System Design: Design a distributed cache"
      },
      {
        _id: "zaRkONvyGr0",
        title: "System Design: Design a distributed key-value store"
      }
    ],
    playList: [
      {
        playlistId: "PLkQkbY7JBOPqFpZIV1jNhVHrRGAqE9X6",
        title: "System Design Fundamentals",
        thumbnailUrl: "https://i.ytimg.com/vi/xrYr7th4DgI/sddefault.jpg"
      }
    ],
    complexity: 3,
  },
  {
    id: 3,
    name: 'Theo - t3.gg',
    logoUrl: 'https://yt3.googleusercontent.com/4NapxEtLcHQ6wN2zA_DMmkOk47RFb_gy6sjSmUZGg_ARHjlIUjFsrNFddrcKMkTYpBNxCp3J=s176-c-k-c0x00ffffff-no-rj',
    slug: 'theo',
    subscriberCount: '217K',
    videoCount: '343',
    country: 'US',
    language: 'EN',
    views: '5M',
    description: 'Theo shares modern web development practices, TypeScript expertise, and software engineering insights.',
    category: ['TypeScript', 'React', 'Next.js', 'Full Stack'],
    videoList: [
      { _id: "qCX8rw4qOSA", title: "Why I use TypeScript over JavaScript" },
      { _id: "2pWv7GOvyUA", title: "Next.js 13 - The Basics" }
    ],
    playList: [
      {
        playlistId: "PLlRxNm9R5DJwP9xhcl4ebljNvV4zGpjn_",
        title: "Full Stack Development",
        thumbnailUrl: "https://i.ytimg.com/vi/qCX8rw4qOSA/sddefault.jpg"
      }
    ],
    complexity: 3,
  },
  {
    id: 4,
    name: 'Traversy Media',
    slug: 'traversymedia',
    logoUrl: 'https://yt3.googleusercontent.com/ytc/AIf8zZTUVa5AeFd3m5-4fdY2hEaKof3Byp8VruZ0f0FNEA=s176-c-k-c0x00ffffff-no-rj',
    subscriberCount: '2.1M',
    videoCount: '1200+',
    country: 'US',
    language: 'EN',
    views: '200M+',
    description: 'Brad Traversy creates comprehensive web development tutorials covering everything from basics to advanced concepts.',
    category: ['Web Development', 'JavaScript', 'Full Stack'],
    videoList: [
      { _id: "w7ejDZ8SWv8", title: "JavaScript Crash Course For Beginners" },
      { _id: "SLfhMt5OUPI", title: "React Crash Course" }
    ],
    playList: [
      {
        playlistId: "PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX",
        title: "Modern JavaScript From The Beginning",
        thumbnailUrl: "https://i.ytimg.com/vi/hdI2bqOjy3c/sddefault.jpg"
      }
    ],
    complexity: 2,
  }
];