// pages/creator_page.jsx
import Head from 'next/head';
import Image from 'next/image';


const Creator = {
    name: 'John Doe',
    username: 'johndoe',
    description: 'John Doe is a content creator focused on technology and software development, sharing insights and tutorials to help developers grow.',
    profilePicture: "https://yt3.googleusercontent.com/rsKAERVEXNTq6lbdIHUlm3aVAw4R2D1fPkDz-7sPccu9qwic5EYfSe6VI7tNB5-_r0Ip5_P0=s176-c-k-c0x00ffffff-no-rj",

    subscribers: '250K',
    country: 'US',
    language: "EN",
    views: '5M',
    engagementRate: 4, // Assuming this is a 5-star scale
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
                <section>
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
    // Function to render social media icons
    const renderSocialIcons = (platform, url) => {
        return (
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-xl hover:text-yellow-400 transition duration-200">
                <i className={`fab fa-${platform.toLowerCase()} hover:scale-110 transition-transform`}></i>
            </a>
        );
    };

    const countryFlagUrl = `https://flagcdn.com/w20/${creator.country.toLowerCase()}.png`;
    const profilePictureUrl = creator.profilePicture || '/path/to/default/image.png';

    return (
        <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out mx-auto max-w-4xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="space-y-4 flex flex-col items-center text-center md:text-left">
                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-gray-600">
                    <Image src={profilePictureUrl} alt={`${creator.name} Profile Picture`} layout="fill" objectFit="cover" />
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                    <div className="w-8 h-5">
                        <Image src={countryFlagUrl} alt={`${creator.country} Flag`} layout="responsive" width={24} height={15} />
                    </div>
                    <span className="bg-gray-700 text-xs px-2 py-1 rounded-full">{creator.language}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">{creator.name}</h2>
            </div>
            <div className="flex-1 space-y-4">
                <p className="text-sm md:text-base leading-relaxed">{creator.description}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {creator.tags.map(tag => (
                        <span key={tag} className="bg-gradient-to-r from-purple-500 to-purple-800 text-xs md:text-sm py-1 px-3 rounded-full shadow-md">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex justify-center md:justify-start items-center space-x-2 text-yellow-500 text-xl">
                    {'🌟'.repeat(Math.floor(creator.engagementRate))}
                </div>
                <div className="flex flex-col md:flex-row justify-center md:justify-start items-center space-y-2 md:space-y-0 md:space-x-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition ease-in-out duration-200 shadow-lg">Visit Channel</button>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition ease-in-out duration-200 shadow-lg">Subscribe</button>
                </div>
                <div className="flex justify-center md:justify-start items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13l-3-3m0 0l-3 3m3-3v12m-9-5c0 1.657 1.343 3 3 3s3-1.343 3-3V7a2 2 0 00-2-2H5a2 2 0 00-2 2v1c0 1.657 1.343 3 3 3z" />
                        </svg>
                        <span className="text-md font-medium">{creator.subscribers} Subscribers</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.55-4.55a1 1 0 011.42 0l2.12 2.12a1 1 0 010 1.41L18.43 14m-5.16-5.16L6.34 16H4v2.66l6.87-6.87m2.83-2.83L21 3m0 0a1 1 0 011-1h.01a1 1 0 011 1v.01a1 1 0 01-1 1H21z" />
                        </svg>
                        <span className="text-md font-medium">{creator.views} Views</span>
                    </div>
                </div>
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
