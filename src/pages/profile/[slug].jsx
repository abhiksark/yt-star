// pages/profile/[slug].jsx
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { channelsData } from '../../data/siteMeta';
import CreatorProfile from '../creator_page';

// Import CreatorProfile and other necessary components
// Ensure CreatorProfile is correctly imported to be used within this page

export async function getStaticPaths() {
  // Generate paths based on the slugs of creators in channelsData
  const paths = channelsData.map(channel => ({
    params: { slug: channel.slug.toString() }, // Adjust based on your data structure
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Find the creator data by slug
  const creator = channelsData.find(channel => channel.slug === params.slug); // Adjust based on your data
  
  if (!creator) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      creator,
    },
  };
}

const CreatorPage = ({ creator }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <Head>
        <title>{creator.name} - YouTube Channel</title>
        <meta name="description" content={`Discover and engage with the content from ${creator.name} on YouTube.`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 pt-6">
        {/* Assuming CreatorProfile component is properly imported and used here */}
        <CreatorProfile creator={creator} />
        {/* Additional sections for videos and playlists would also follow the aesthetic */}
      </main>
    </div>
  );
};

export default CreatorPage;
