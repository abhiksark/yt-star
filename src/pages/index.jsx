// pages/index.jsx


import Head from 'next/head';
// import Navbar from '../components/Navbar'; // Uncomment if you have a Navbar component
import ChannelsGrid from '../components/ChannelsGrid';
import SearchBar from '../components/SearchBar'; // Make sure to create this component
import Categories from '../components/Categories'; // Make sure to create this component
import { channelsData } from '../data/siteMeta';



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