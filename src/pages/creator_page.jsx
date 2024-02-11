// pages/creator_page.jsx
import Head from 'next/head';
import Image from 'next/image';


const Creator = {
    name: 'John Doe',
    username: 'johndoe',
    description: 'John Doe is a content creator focused on technology and software development, sharing insights and tutorials to help developers grow.',
    profilePicture: '/path/to/john_doe_profile.jpg', // Placeholder path
    subscribers: '250K',
    views: '5M',
    engagementRate: 4, // Assuming this is a 5-star scale
    category: 'Technology',
    tags: ['Software Development', 'Tutorials', 'Tech Reviews', 'Programming'],
    social: {
        facebook: 'https://facebook.com/johndoe',
        twitter: 'https://twitter.com/johndoe',
        instagram: 'https://instagram.com/johndoe',
        youtube: 'https://youtube.com/johndoe',
    },
    longDescription: 'With a passion for technology and teaching, John Doe has been creating content for over five years, covering topics from beginner programming to advanced software engineering techniques. Join the journey to explore the latest in tech and software development.',
};


const CreatorPage = () => {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Head>
                <title>{Creator.name} - YouTube Channel</title>
                <meta name="description" content={`Discover and engage with the content from ${Creator.name} on YouTube.`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container mx-auto px-4 pt-6">
                <section className="text-center mb-6">
                    <CreatorProfile creator={Creator} />
                    
                </section>

                <section className="my-4">
                    <h2 className="text-2xl font-bold mb-3">Popular Videos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Map over popular videos here */}
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                    </div>
                </section>

                <section className="my-4">
                    <h2 className="text-2xl font-bold mb-3">Popular Playlists</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Map over popular playlists here */}
                        <PlaylistCard />
                        <PlaylistCard />
                        <PlaylistCard />
                    </div>
                </section>

                {/* Additional sections like Featured Comments, Upcoming Live Streams, etc. can be added here */}

            </main>
        </div>
    );
};

const CreatorProfile = ({ creator }) => {
    return (
        <div className="bg-gray-800 text-white p-5 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start md:space-x-8">
            {/* Left Column for Image, Name, Category, Tags, and Social Links */}
            <div className="flex flex-col items-center mb-4 md:mb-0 md:w-1/3">
                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-gray-700 mb-4">
                    <Image
                        src={creator.profilePicture || '/path/to/default/image.png'}
                        alt={`${creator.name} Profile Picture`}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{creator.name}</h2>
                <div className="mb-2">
                    <span className="inline-block bg-gradient-to-r from-red-600 to-red-800 text-xs md:text-sm text-white py-1 px-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer">
                        {creator.category}
                    </span>
                </div>
                <div className="flex justify-center gap-2 flex-wrap mb-3">
                    {creator.tags.map(tag => (
                        <span key={tag} className="inline-block bg-gradient-to-r from-red-300 to-red-500 text-red-900 text-xs md:text-sm font-semibold px-2.5 py-0.5 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex space-x-4 mt-2">
                    {Object.entries(creator.social).map(([platform, url]) => (
                        <a key={platform} href={url} className="text-red-600 hover:text-red-700" aria-label={platform}>
                            {/* Icon placeholder; replace with actual icons */}
                            {platform.toUpperCase()}
                        </a>
                    ))}
                </div>
            </div>

            {/* Right Column for Description and Stats */}
            <div className="md:w-2/3">
                <p className="text-sm md:text-md mb-4">{creator.description}</p>
                <div className="mb-4">
                    <p className="text-xl font-bold">{creator.subscribers} Subscribers</p>
                    <p className="text-xl font-bold">{creator.views} Views</p>
                    <div className="flex justify-center items-center text-yellow-400 text-lg mt-2">
                        {'🌟'.repeat(Math.floor(creator.engagementRate))}
                    </div>
                </div>
                <p className="text-center text-sm md:text-left md:text-md">{creator.longDescription}</p>
            </div>
        </div>
    );
};






// Reusable video card component
const VideoCard = () => (
    <div className="bg-gray-800 p-4 rounded-lg">
        <div className="mb-2">
            {/* Thumbnail image */}
            <div className="bg-gray-700 h-48 mb-2"></div>
            <h3 className="text-lg font-semibold">Video Title</h3>
            <p className="text-gray-400">X views • Y days ago</p>
        </div>
    </div>
);

// Reusable playlist card component
const PlaylistCard = () => (
    <div className="bg-gray-800 p-4 rounded-lg">
        <div className="mb-2">
            {/* Thumbnail image */}
            <div className="bg-gray-700 h-48 mb-2"></div>
            <h3 className="text-lg font-semibold">Playlist Title</h3>
            <p className="text-gray-400">X videos</p>
        </div>
    </div>
);

export default CreatorPage;
