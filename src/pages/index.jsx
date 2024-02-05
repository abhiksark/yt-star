// pages/index.jsx

import Head from 'next/head';
import Navbar from '../components/Navbar'; // Assuming you have a Navbar for navigation
import ChannelsGrid from '../components/ChannelsGrid'; // Renamed from ServersGrid to ChannelsGrid

export default function Home() {
  // Sample data array, updated for YouTube channels
  const channelsData = [
    {
      id: 1,
      name: 'TechGuru',
      category: 'Technology',
      subscriberCount: 50000,
      description: 'TechGuru offers the latest tech news, reviews, and tutorials on technology and gadgets.',
      tags: ['Tech', 'Reviews', 'Gadgets', 'Tutorials'],
      rating: 4.5,
      reviewsCount: 120
    },
    {
      id: 2,
      name: 'CookingWithAmy',
      category: 'Cooking',
      subscriberCount: 150000,
      description: 'Join Amy as she explores delicious recipes from around the world and shares cooking tips.',
      tags: ['Cooking', 'Recipes', 'Food', 'Cuisine'],
      rating: 4.8,
      reviewsCount: 300
    }
    // Add more channel objects as needed
  ];

  return (
    <div>
      <Head>
        <title>YouTube Channels List</title>
        <meta name="description" content="Explore popular YouTube channels across various categories." />
      </Head>
      <Navbar />
      <main className="p-4">
        <ChannelsGrid channels={channelsData} />
      </main>
    </div>
  );
}
