// src/pages/tags/[slug].jsx

import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';

// Assuming you have a method to fetch data based on the tag's slug
// This is a placeholder function, replace it with your actual data fetching logic
const fetchTagData = async (slug) => {
  // Fetch data related to the tag using the slug
  // This could be a call to your backend or a local data structure
  return {
    tagName: slug,
    relatedContent: [], // Replace with actual data fetched based on the slug
  };
};

const TagPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [tagData, setTagData] = useState(null);

  useEffect(() => {
    if (!slug) return; // Ensure slug is not undefined
    fetchTagData(slug).then(setTagData);
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
        tagData.relatedContent.map((content) => (
          <div key={content.id}>{content.title}</div>
        ))
      ) : (
        <p>No content found for this tag.</p>
      )}
    </div>
  );
};

export default TagPage;
