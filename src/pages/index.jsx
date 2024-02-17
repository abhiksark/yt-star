import Head from 'next/head';
import Link from 'next/link';
// Assuming Navbar, SearchBar, and Categories components follow the established design harmony
// import Navbar from '../components/Navbar';
import ChannelsGrid from '../components/ChannelsGrid';
import SearchBar from '../components/SearchBar'; // Ensure this component matches our design principles
import Categories from '../components/Categories'; // Ensure this component matches our design principles
import { channelsData } from '../data/siteMeta';

export default function Home() {
  const handleSearch = (query) => {
    // Placeholder for search logic
    console.log('Search for:', query);
  };

  const handleSelectCategory = (categorySlug) => {
    // Placeholder for category selection logic
    console.log('Selected category:', categorySlug);
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <Head>
        <title>Discover YouTube Creators</title>
        <meta name="description" content="Discover, connect, and engage with your favorite YouTube creators." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-6">
        {/* Navbar can be uncommented and included here if exists */}
        {/* <SearchBar onSearch={handleSearch} /> */}
        <Categories onSelectCategory={handleSelectCategory} />
        <ChannelsGrid channels={channelsData} />
      </main>
    </div>
  );
}
