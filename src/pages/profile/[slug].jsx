// pages/profile/[slug].jsx
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { channelsData } from '../../data/siteMeta';
import CreatorProfile from '../creator_page';

// Import components used in CreatorProfile

// Assuming CreatorProfile and other components are defined either in this file or imported




export async function getStaticPaths() {
  // Generate paths based on the slugs of creators in channelsData
  const paths = channelsData.map((channel) => ({
    params: { slug: channel.slug.toString()  }, // Adjust based on your data
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Find the creator data by slug
  const creator = channelsData.find((channel) => channel.slug === params.slug); // Adjust based on your data
  
  // If the creator doesn't exist, return an empty object (or handle as a 404)
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
  // If using fallback: true, you can add loading states here
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (

    <div className="bg-gray-900 min-h-screen text-white">
      <Head>
        <title>{creator.name} - YouTube Channel</title>
        <meta name="description" content={`Discover and engage with the content from ${creator.name} on YouTube.`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 pt-6">
        <CreatorProfile creator={creator} />
        {/* Render additional sections like videos and playlists */}
      </main>
    </div>
  );
};

export default CreatorPage;