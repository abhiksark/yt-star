import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';

// Import the channelsData
import { channelsData } from '../../data/siteMeta'; 

// Function to fetch data based on the tag's slug
const fetchTagData = async (slug) => {
  // Filter channels that include the tag in their tags array
  const relatedContent = channelsData.filter(channel =>
    channel.tags.includes(slug.replace('-', ' ')) // Assuming slug uses '-' for spaces
  );

  return {
    tagName: slug.replace('-', ' '), // Convert slug back to tag name
    relatedContent,
  };
};

const TagPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [tagData, setTagData] = useState(null);

  useEffect(() => {
    if (!slug) return; // Ensure slug is not undefined
    fetchTagData(slug).then(data => setTagData(data));
  }, [slug]);

  if (!tagData) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>{tagData.tagName} - Related Content</title>
        <meta name="description" content={`Explore content related to ${tagData.tagName}.`} />
      </Head>
      <h1 className="text-2xl font-bold">Tag: {tagData.tagName}</h1>
      {/* Render related content */}
      {tagData.relatedContent.length > 0 ? (
        tagData.relatedContent.map((channel) => (
          <div key={channel.id} className="mb-4">
            <h2 className="text-lg font-semibold">{channel.name}</h2>
            <p>{channel.description}</p>
            {/* Add more channel details here as needed */}
          </div>
        ))
      ) : (
        <p>No content found for this tag.</p>
      )}
    </div>
  );
};

export default TagPage;
