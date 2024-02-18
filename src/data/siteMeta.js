export const categories = [
  { name: 'System Design', slug: 'system design' },
  { name: 'FrontEnd', slug: 'frontend' },
  { name: 'Backend', slug: 'backend' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'ML', slug: 'Machine Learning' },
  { name: 'DevOps', slug: 'devops' },
  { name: 'Data Science', slug: 'data science' },
  { name: 'Cloud', slug: 'cloud' },
  { name: 'Security', slug: 'security' },
  // { name: 'Blockchain', slug: 'blockchain' },
  { name: 'Mobile', slug: 'mobile' },
  // { name: 'GameDev', slug: 'game development' },
  // { name: 'VR/AR', slug: 'vr/ar' },
  // { name: 'IoT', slug: 'iot' },
  // { name: 'Robotics', slug: 'robotics' },
]

export const channelsData1 = [
  {
    id: 1,
    name: 'Gaurav Sen',
    slug: 'gaurav-sen',
    category: 'Software Development',
    subscriberCount: '547K',
    description: 'Gaurav Sen is Indian System Design Youtuber',
    views: '5M',
    country: 'IN',
    language: 'EN',
    videoCount: '289',
    tags: ['Algorithms', 'System Design'],
    Complexity: 3,
    logoUrl:
      'https://yt3.googleusercontent.com/rsKAERVEXNTq6lbdIHUlm3aVAw4R2D1fPkDz-7sPccu9qwic5EYfSe6VI7tNB5-_r0Ip5_P0=s176-c-k-c0x00ffffff-no-rj',
  },
  {
    id: 2,
    name: 'Arpit Bhayani',
    slug: 'arpit',
    category: 'System Design',
    logoUrl:
      'https://yt3.googleusercontent.com/q4pQdGZdT9Suk5Yu7cm0KI9pLMSaFhEeKQtyZCYjFeJRcbODjS4V5J9AQhN96TYOHXI-rgZ5TA=s176-c-k-c0x00ffffff-no-rj',
    subscriberCount: '81.7k',
    views: '5M',
    videoCount: 120,
    country: 'IN',
    language: 'EN',
    description:
      'Arpit Bhayani is a software engineer and educator who creates content on system design, microservices, and distributed systems. His channel offers tutorials, interviews, and live sessions on these topics.',
    tags: [
      'Distributed Systems',
      'Microservices',
      'System Design',
      'Architecture',
    ],
    Complexity: 3,
  },
  {
    id: 3,
    name: 'CodeWithHarry',
    slug: 'harry',
    category: 'Programming & Development',
    logoUrl:
      'https://yt3.googleusercontent.com/ytc/AIf8zZTNiWLD2-Qw1eWFmRJkGBzfI-8oFNmYk5tBnpNurQ=s176-c-k-c0x00ffffff-no-rj',
    subscriberCount: '5.44M',
    videoCount: '2.2K',
    country: 'IN',
    language: 'EN',
    views: '5M',
    tags: [
      'Python',
      'Web Development',
      'JavaScript',
      'Java',
      'C++',
      'Data Structures',
      'Algorithms',
      'Machine Learning',
    ],
    Complexity: 2,
  },
  {
    id: 4,
    name: 'Theo - t3.gg',
    logoUrl:
      'https://yt3.googleusercontent.com/4NapxEtLcHQ6wN2zA_DMmkOk47RFb_gy6sjSmUZGg_ARHjlIUjFsrNFddrcKMkTYpBNxCp3J=s176-c-k-c0x00ffffff-no-rj',
    category: 'Coding',
    slug: 'Theo',
    subscriberCount: '217K',
    videoCount: '343',
    country: 'IN',
    language: 'EN',
    views: '5M',
    description:
      'Join Amy as she explores delicious recipes from around the world and shares cooking tips.',
    tags: ['Tech', 'Gaming', 'Software Development', 'Engineering Practices'],
    Complexity: 3,
  },
  {
    id: 5,
    name: 'Fireship',
    logoUrl:
      'https://yt3.googleusercontent.com/q4pQdGZdT9Suk5Yu7cm0KI9pLMSaFhEeKQtyZCYjFeJRcbODjS4V5J9AQhN96TYOHXI-rgZ5TA=s176-c-k-c0x00ffffff-no-rj',
    category: 'Tech',
    slug: 'Fireship',
    country: 'IN',
    language: 'EN',
    views: '5M',
    subscriberCount: '2.78M',
    videoCount: '603',
    Complexity: 3,
    tags: ['Coding', 'Programming Tutorials', 'Web Development', 'Tech News'],
    rating: 4.8,
    Country: 'US',
  },
  {
    id: 6,
    name: 'Corey Schafer',
    logoUrl:
      'https://yt3.googleusercontent.com/q4pQdGZdT9Suk5Yu7cm0KI9pLMSaFhEeKQtyZCYjFeJRcbODjS4V5J9AQhN96TYOHXI-rgZ5TA=s176-c-k-c0x00ffffff-no-rj',
    category: 'Education',
    slug: 'Corey',
    country: 'IN',
    language: 'EN',
    views: '5M',

    subscriberCount: '1.27M',
    videoCount: '232',
    description:
      'Join Amy as she explores delicious recipes from around the world and shares cooking tips.',
    tags: ['Programming', 'Python', 'Software Development', 'Education'],
    rating: 2,
    Country: 'US',
  },
]

// const fs = require('fs');
import jsonData from './siteData.json';

// Load the JSON data from the file
// export const channelsData = JSON.parse(fs.readFileSync('siteData.json', 'utf8'));
export const channelsData = jsonData

// Now you can use channelsData as an array of objects containing your JSON data
// console.log(channelsData);


// load more data using sitedata.json
// Path: src/data/siteData.js

