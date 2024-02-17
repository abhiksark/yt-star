import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';


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
                <CreatorStats subscribers={creator.subscribers} views={creator.views} />
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
);

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
        <span className="text-md font-medium text-gray-700"><i className="fas fa-users"></i> {subscribers} Subscribers</span>
        <span className="text-md font-medium text-gray-700"><i className="fas fa-eye"></i> {views} Views</span>
    </div>
);

const FeaturedVideos = ({ videos }) => (
    <section className="my-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Featured Videos</h2>
        {/* Video cards grid, simplified for brevity */}
    </section>
);

const CuratedPlaylists = ({ playlists }) => (
    <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Curated Playlists</h2>
        {/* Playlist cards grid, simplified for brevity */}
    </section>
);

export default CreatorPage;
