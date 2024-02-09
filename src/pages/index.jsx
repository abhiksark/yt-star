// pages/index.jsx


import Head from 'next/head';
// import Navbar from '../components/Navbar'; // Uncomment if you have a Navbar component
import ChannelsGrid from '../components/ChannelsGrid';
import SearchBar from '../components/SearchBar'; // Make sure to create this component
import Categories from '../components/Categories'; // Make sure to create this component


const channelsData = [
  {
    id: 1,
    name: 'CodeWithHarry',
    category: 'Education',
    logoUrl: 'https://yt3.googleusercontent.com/q4pQdGZdT9Suk5Yu7cm0KI9pLMSaFhEeKQtyZCYjFeJRcbODjS4V5J9AQhN96TYOHXI-rgZ5TA=s176-c-k-c0x00ffffff-no-rj',
    subscriberCount: 16700000,
    // description: 'CodeWithHarry is a YouTube channel created by Harry Singh focusing on teaching various programming languages and coding concepts in a beginner-friendly and engaging way. The channel offers tutorials, projects, live sessions, and more, covering languages like Python, C, C++, Java, HTML, CSS, Javascript, and web development frameworks like React.',
    tags: ['web development', 'javascript', 'Gadgets', 'Tutorials'],
    rating: 4,
    reviewsCount: 120
  },
  {
    id: 2,
    name: 'Arpit Bhayani',
    category: 'System Design',
    logoUrl: 'https://yt3.googleusercontent.com/q4pQdGZdT9Suk5Yu7cm0KI9pLMSaFhEeKQtyZCYjFeJRcbODjS4V5J9AQhN96TYOHXI-rgZ5TA=s176-c-k-c0x00ffffff-no-rj',
    subscriberCount: '81.7k',
    videoCount: 120,
    description: 'Join Amy as she explores delicious recipes from around the world and shares cooking tips.',
    tags: ['Distributed Systems', 'Microservices', 'System Design', 'Architecture'],
    rating: 4.8,
    reviewsCount: 300,
  },
  {
    id: 3,
    name: 'TechGuru',
    category: 'Technology',
    logoUrl: 'https://yt3.googleusercontent.com/q4pQdGZdT9Suk5Yu7cm0KI9pLMSaFhEeKQtyZCYjFeJRcbODjS4V5J9AQhN96TYOHXI-rgZ5TA=s176-c-k-c0x00ffffff-no-rj',
    subscriberCount: 50000,
    description: 'TechGuru offers the latest tech news, reviews, and tutorials on technology and gadgets.',
    tags: ['Tech', 'Reviews', 'Gadgets', 'Tutorials'],
    rating: 4.5,
    reviewsCount: 120
  },
  {
    id: 4,
    name: 'CookingWithAmy',
    logoUrl: 'https://yt3.googleusercontent.com/q4pQdGZdT9Suk5Yu7cm0KI9pLMSaFhEeKQtyZCYjFeJRcbODjS4V5J9AQhN96TYOHXI-rgZ5TA=s176-c-k-c0x00ffffff-no-rj',
    category: 'Cooking',
    subscriberCount: 150000,
    description: 'Join Amy as she explores delicious recipes from around the world and shares cooking tips.',
    tags: ['Cooking', 'Recipes', 'Food', 'Cuisine'],
    rating: 4.8,
    reviewsCount: 300,
  },
  {
    id: 4,
    name: 'CookingWithAmy',
    logoUrl: 'https://yt3.googleusercontent.com/q4pQdGZdT9Suk5Yu7cm0KI9pLMSaFhEeKQtyZCYjFeJRcbODjS4V5J9AQhN96TYOHXI-rgZ5TA=s176-c-k-c0x00ffffff-no-rj',
    category: 'Cooking',
    subscriberCount: 150000,
    description: 'Join Amy as she explores delicious recipes from around the world and shares cooking tips.',
    tags: ['Cooking', 'Recipes', 'Food', 'Cuisine'],
    rating: 4.8,
    reviewsCount: 300,
  },
  {
    id: 4,
    name: 'CookingWithAmy',
    logoUrl: 'https://yt3.googleusercontent.com/q4pQdGZdT9Suk5Yu7cm0KI9pLMSaFhEeKQtyZCYjFeJRcbODjS4V5J9AQhN96TYOHXI-rgZ5TA=s176-c-k-c0x00ffffff-no-rj',
    category: 'Cooking',
    subscriberCount: 150000,
    description: 'Join Amy as she explores delicious recipes from around the world and shares cooking tips.',
    tags: ['Cooking', 'Recipes', 'Food', 'Cuisine'],
    rating: 4.8,
    reviewsCount: 300,
  }
];

export default function Home() {
  // ... existing code ...
  const handleSearch = (query) => {
    // Implement your search logic here
    console.log('Search for:', query);
    // You might set state here, make an API call, etc.
  };
  const handleSelectCategory = (categorySlug) => {
    // Implement your category selection logic here
    console.log('Selected category:', categorySlug);
    // You might set state here, fetch new data, etc.
  };
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Head>
        <title>Discover YouTube Creators</title>
        <meta name="description" content="Discover, connect, and engage with your favorite YouTube creators." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 pt-6">
        <SearchBar onSearch={handleSearch} />
        <Categories onSelectCategory={handleSelectCategory} />
        <ChannelsGrid channels={channelsData} />
      </main>

    </div>
  );
}