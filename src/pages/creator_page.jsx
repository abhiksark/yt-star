// src/pages/creator_page.jsx

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import formatNumber from '../lib/utils'

const CreatorPage = ({ creator }) => {
    if (!creator) {
        return <div className="text-center py-10 text-gray-600">Creator not found</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen text-gray-800">
            <Head>
                <title>{creator.name} - Educational Channel</title>
                <meta name="description" content={`Explore educational content from ${creator.name}.`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container mx-auto px-4 pt-6">
                {/* <SearchAndFilter /> */}
                <CreatorProfile creator={creator} />
                <FeaturedVideos videos={creator.videos} />
                <CuratedPlaylists playlists={creator.playlists} />
            </main>
        </div>
    );
};

const SearchAndFilter = () => (
    <div className="flex flex-col sm:flex-row justify-between items-center py-4 bg-white rounded-lg mx-2 mb-6 shadow border border-gray-200">
        <input type="text" placeholder="Search for topics, creators..." className="input text-gray-700 w-full sm:w-auto p-2 rounded-lg m-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
        {/* Additional filters can be implemented here */}
    </div>
);

const CreatorProfile = ({ creator }) => {
    const countryFlagUrl = `https://flagcdn.com/w40/${creator.country.toLowerCase()}.png`;
    const profilePictureUrl = creator.logoUrl || '/path/to/default/image.png';

    return (
        // Add a max-w-4xl for max-width and mx-auto to center it
        <article className="text-gray-800 p-6 rounded-xl shadow-lg mx-auto mb-6 flex flex-col md:flex-row items-center space-y-6 md:space-x-8 bg-white border border-gray-200 max-w-4xl">
            <ProfileHeader creator={creator} countryFlagUrl={countryFlagUrl} profilePictureUrl={profilePictureUrl} />
            <div className="flex-1 space-y-4">
                <h2 className="text-3xl font-bold">{creator.name}</h2>
                <p className="text-sm leading-relaxed text-gray-600">{creator.description}</p>
                <Tags tags={creator.tags} />
                <div className="flex justify-center md:justify-start items-center space-x-2">
                    {'🌟'.repeat(Math.floor(creator.engagementRate)) || 'N/A'}
                </div>
                <CreatorStats subscribers={creator.subscriberCount} views={creator.views} />
            </div>
        </article>
    );
};


const ProfileHeader = ({ creator, countryFlagUrl, profilePictureUrl }) => (
    <div className="flex flex-col items-center text-center">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-300 shadow-sm">
            <Image src={profilePictureUrl} alt={`${creator.name} Profile Picture`} layout="fill" objectFit="cover" />
        </div>
        <div className="flex items-center justify-center space-x-2 mt-3">
            <Image src={countryFlagUrl} alt={`${creator.country} Flag`} width={24} height={15} />
            <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">{creator.language}</span>
        </div>
    </div>
)

const Tags = ({ tags }) => (
    <div className="flex flex-wrap justify-center gap-2">
        {tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} passHref>
                <a className="bg-blue-100 text-blue-800 text-xs py-1 px-3 rounded-full shadow-inner hover:bg-blue-200 transition duration-150 ease-in-out">
                    {tag}
                </a>
            </Link>
        ))}
    </div>
);

const CreatorStats = ({ subscribers, views }) => (
    <div className="flex justify-center md:justify-start items-center space-x-4">
        <span className="text-md font-medium text-gray-700"><i className="fas fa-users"></i> {formatNumber(subscribers)} Subscribers</span>
        <span className="text-md font-medium text-gray-700"><i className="fas fa-eye"></i> {formatNumber(views)} Views</span>
    </div>
);

const FeaturedVideos = ({ videos }) => {
    const hasVideos = videos && videos.length > 0;
    return (
        <section className="my-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Featured Videos</h2>
            {hasVideos ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video) => (
                        <div key={video.id} className="group rounded-lg shadow-lg overflow-hidden relative">
                            <iframe
                                className="w-full h-48" // Adjust height as needed
                                src={`https://www.youtube.com/embed/${video.id}?autoplay=0`} // Ensure autoplay is off for better UX
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <a
                                href={`https://www.youtube.com/watch?v=${video.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-0 group-hover:bg-opacity-25"
                                aria-label="Open video in a new tab"
                            >
                                <span className="text-white text-opacity-0 group-hover:text-opacity-100 transition-opacity duration-300">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </span>
                            </a>
                            {/* Optional: Display video thumbnail or additional details here */}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No featured videos are available at the moment.</p>
            )}
        </section>

    );
};


const CuratedPlaylists = ({ playlists }) => {
    // YouTube base URL for playlists
    const youtubePlaylistBaseUrl = "https://www.youtube.com/playlist?list=";
    const hasPlaylists = playlists && playlists.length > 0;

    return (
        <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Curated Playlists</h2>
            {hasPlaylists ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playlists.map((playlist) => (
                        <a key={playlist.id} 
                           href={`${youtubePlaylistBaseUrl}${playlist.id}`} 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="block rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out group">
                            <div className="relative w-full h-48">
                                <Image
                                    src={playlist.thumbnail}
                                    alt={`${playlist.name} thumbnail`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-opacity duration-300 ease-in-out"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white text-xl">Watch Playlist</span>
                                </div>
                            </div>
                            {/* Playlist name displayed below the thumbnail */}
                            <div className="p-4 bg-white">
                                <h3 className="text-md text-gray-900 font-semibold text-center">{playlist.name}</h3>
                            </div>
                        </a>
                    ))}
                </div>
            ) : (
                <p>No playlists found.</p>
            )}
        </section>
    );
};


export default CreatorPage;
